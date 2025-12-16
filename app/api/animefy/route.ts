import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
    console.log("1. Starting Animefy request...");

    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: "Server Error: GEMINI_API_KEY is missing" }, { status: 500 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: "No image found" }, { status: 400 });
        }

        // 1. Prepare Image
        const arrayBuffer = await file.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');

        // 2. Initialize Gemini (Vision Only)
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // IMPORTANT: Use the 2025 model name
        // If 2.5 fails, fallback to 'gemini-2.0-flash-exp'
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // 3. Vision Analysis
        console.log("2. Asking Gemini to analyze image...");
        const result = await model.generateContent([
            "Analyze this image. Describe the subject, gender, clothes, pose, and background in one detailed paragraph. Output ONLY the text description.",
            {
                inlineData: {
                    data: base64Image,
                    mimeType: file.type || "image/jpeg",
                },
            },
        ]);

        const description = result.response.text();
        console.log("3. Gemini Analysis :", description);

        // 4. Generate Art URL (Pollinations)
        // We add 'anime style' keywords to the Gemini description
        const finalPrompt = encodeURIComponent(description + " anime style, studio ghibli, vibrant, 8k, highly detailed");
        const seed = Math.floor(Math.random() * 1000);
        const pollinationsUrl = `https://image.pollinations.ai/prompt/${finalPrompt}?width=1024&height=1024&model=flux&seed=${seed}`;

        console.log("4. Generated URL:", pollinationsUrl);

        return NextResponse.json({
            originalDescription: description,
            resultUrl: pollinationsUrl
        });

    } catch (error: any) {
        console.error("Error details:", error);
        return NextResponse.json({ error: error.message || "Failed to process" }, { status: 500 });
    }
}