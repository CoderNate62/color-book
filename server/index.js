import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
// In production, set FRONTEND_URL to restrict origins
const productionOrigin = process.env.FRONTEND_URL;

// Check if origin is allowed (localhost for dev, or production URL)
const isAllowedOrigin = (origin) => {
    if (!origin) return true; // Allow no-origin requests (curl, etc.)
    if (origin.startsWith('file://')) return true; // Local file access
    if (origin.match(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/)) return true; // Any localhost port
    if (productionOrigin && origin === productionOrigin) return true;
    return false;
};

// Simple in-memory rate limiter
const rateLimiter = {
    requests: new Map(),
    windowMs: 60000, // 1 minute window
    maxRequests: 10, // Max 10 requests per minute per IP

    isAllowed(ip) {
        const now = Date.now();
        const windowStart = now - this.windowMs;

        // Get or create request history for this IP
        if (!this.requests.has(ip)) {
            this.requests.set(ip, []);
        }

        const history = this.requests.get(ip);

        // Filter out old requests
        const recentRequests = history.filter(time => time > windowStart);
        this.requests.set(ip, recentRequests);

        if (recentRequests.length >= this.maxRequests) {
            return false;
        }

        recentRequests.push(now);
        return true;
    }
};

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS blocked origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        hasOpenAiKey: !!process.env.OPENAI_API_KEY,
        hasGeminiKey: !!process.env.GEMINI_API_KEY
    });
});

// Generate image endpoint - using DALL-E
app.post('/api/generate', async (req, res) => {
    // Rate limiting
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
    if (!rateLimiter.isAllowed(clientIp)) {
        return res.status(429).json({ error: 'Too many requests. Please wait a minute before trying again.' });
    }

    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    if (typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt must be a string' });
    }

    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt.length === 0) {
        return res.status(400).json({ error: 'Prompt cannot be empty' });
    }

    if (trimmedPrompt.length > 500) {
        return res.status(400).json({ error: 'Prompt must be 500 characters or less' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'OPENAI_API_KEY not configured. Add it to server/.env' });
    }

    try {
        console.log(`Generating coloring book image for: "${trimmedPrompt}"`);

        // Call DALL-E 3 API with timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 60000); // 60 second timeout

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            signal: controller.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: `A simple black and white coloring book page illustration of: ${trimmedPrompt}.
                Style: Clean line art with thick black outlines on pure white background.
                Simple shapes suitable for young children to color.
                No shading, no gray tones, no colors - just black lines on white.
                Cute and child-friendly design.`,
                n: 1,
                size: '1024x1024',
                quality: 'standard',
                response_format: 'b64_json'
            })
        });

        clearTimeout(timeout);
        const data = await response.json();

        if (data.error) {
            console.error('DALL-E error:', data.error);
            throw new Error(data.error.message);
        }

        if (!data.data?.[0]?.b64_json) {
            throw new Error('No image data in response');
        }

        console.log('Successfully generated image!');

        // Return as data URI
        const imageDataUri = `data:image/png;base64,${data.data[0].b64_json}`;
        res.json({ success: true, image: imageDataUri });

    } catch (error) {
        console.error('Generation failed:', error);
        res.status(500).json({ error: error.message || 'Failed to generate image' });
    }
});

app.listen(PORT, () => {
    console.log(`🎨 Color Book Server running on http://localhost:${PORT}`);
    console.log(`   OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'Configured ✓' : 'Not set ✗'}`);
});
