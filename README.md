# DoodleDream - Interactive Coloring Book

A web-based interactive coloring book application where children can generate AI-powered coloring pages or choose from preset themes, then draw and color using various tools.

## Features

- **AI Image Generation**: Create custom coloring pages using OpenAI's DALL-E 3 API
- **Preset Themes**: Quick-pick coloring pages (dinosaur, unicorn, robot, butterfly, car, flower) with three difficulty levels
- **Drawing Tools**:
  - Brush tool with adjustable size
  - Paint bucket for flood fill
  - Eraser
- **Color Palette**: 12 preset colors to choose from
- **Undo Support**: Revert your last 10 actions
- **Save Artwork**: Download your masterpiece as a PNG file
- **Touch Support**: Works on tablets and touch devices
- **High-DPI Support**: Crisp rendering on Retina and high-resolution displays

## Difficulty Levels

- **Little Kid (4-5)**: Simple shapes with large areas to color
- **Big Kid (6-7)**: Moderate detail
- **Expert (8+)**: Intricate designs with more details

## Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite

**Backend:**
- Node.js with Express
- OpenAI DALL-E 3 API

## Project Structure

```
color-book/
├── src/
│   ├── components/
│   │   ├── Canvas.tsx      # Drawing canvas with tools
│   │   ├── Controls.tsx    # Tool and color selection
│   │   ├── Generator.tsx   # Image generation UI
│   │   └── Settings.tsx    # API key configuration
│   ├── services/
│   │   └── imageGen.ts     # Image generation logic
│   ├── utils/
│   │   └── floodFill.ts    # Bucket fill algorithm
│   ├── App.tsx
│   └── index.css
├── server/
│   ├── index.js            # Express API server
│   ├── .env                # API keys (not committed)
│   └── package.json
├── public/
│   └── assets/             # Pre-generated coloring pages
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An OpenAI API key (for custom image generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd color-book
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Configure your API key**

   Create a `.env` file in the `server/` directory:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   ```

### Running the Application

1. **Start the backend server** (required for custom image generation)
   ```bash
   cd server
   npm start
   ```
   The server runs on `http://localhost:3001`

2. **Start the frontend** (in a new terminal)
   ```bash
   npm run dev
   ```
   The app runs on `http://localhost:5173` (or next available port)

3. **Open in browser**

   Navigate to the URL shown in your terminal (usually `http://localhost:5173`)

## Usage

1. **Choose a coloring page**:
   - Click a quick-pick icon (dinosaur, unicorn, etc.) for instant preset images
   - Or type a custom topic and click "Create!" to generate with AI

2. **Select difficulty**: Use the dropdown to choose complexity level

3. **Color your image**:
   - Select a color from the palette
   - Use the brush tool to draw
   - Use the bucket tool to fill areas
   - Use the eraser to fix mistakes

4. **Save your work**: Click the "Save" button to download as PNG

## Configuration

### Environment Variables

Create `server/.env` with:

```env
# Required: OpenAI API key for DALL-E image generation
OPENAI_API_KEY=sk-...

# Optional: Your production frontend URL for CORS
FRONTEND_URL=https://your-domain.com
```

### API Rate Limiting

The server includes built-in rate limiting (10 requests per minute per IP) to prevent API abuse.

## Building for Production

```bash
# Build the frontend
npm run build

# Output will be in the dist/ folder
```

## License

MIT
