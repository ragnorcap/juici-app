# Juici - Creative Juices in Seconds

> "Get the juices warmed up creatively. Kobe Bryant didn't just walk into Staples Center at game time, you shouldn't just show up to innovate. Get juiced."

A vibrant, juice-themed idea generator that helps developers and creatives overcome analysis paralysis by providing project inspiration.

![Juici Screenshot](https://user-images.githubusercontent.com/your-username/juici/screenshot.png)

## Features

- 🎯 Generates random project ideas from a curated list of 50 prompts
- 📝 Create professional-grade Product Requirements Documents (PRDs) with AI
- 🎨 Fresh, modern UI with a juice theme (lime green, yellow, and purple accents)
- 💧 Animated hero section with liquid/fluid animations
- 📋 Copy-to-clipboard functionality for easy use
- 💾 Save favorite ideas to your profile (requires login)
- 📱 Fully responsive design for all devices

## Why Juici?

Creative work requires warm-up. Just as athletes don't perform at their best without warming up, your creative mind needs to get into the flow state. Juici helps you jumpstart your creativity by providing inspiring project ideas that get your mental juices flowing.

## Tech Stack

- **Frontend**: React with TypeScript, Styled Components, Framer Motion for animations
- **Backend**: Node.js with Express
- **Data**: JSON files containing 50 creative project prompts
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL for storing user favorites
- **AI Integration**: OpenAI API for generating detailed PRDs

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Supabase account (optional, for auth and favorites)
- OpenAI API key (optional, for PRD generation)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/juici.git
   cd juici
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment files:
   ```bash
   # Copy sample env files
   cp .env.example .env
   cp backend/.env.example backend/.env
   
   # Edit with your API keys if needed
   ```

4. Run the application:
   ```bash
   # Run both frontend and backend
   npm run dev
   
   # Or run them separately
   npm run dev:frontend
   npm run dev:backend
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5555

### Deploy with Vercel

This project is configured for deployment with Vercel. Simply connect your GitHub repository to Vercel and deploy.

## Project Structure

```
juici/
├── backend/              # Express API server
│   ├── src/              # Source code
│   │   ├── index.ts      # Main server file
│   │   └── lib/          # Library utilities
│   ├── .env              # Environment variables (git-ignored)
│   └── package.json      # Backend dependencies
├── frontend/             # React application
│   ├── public/           # Static assets
│   ├── src/              # Source code
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── styles/       # Global styles
│   │   └── lib/          # Library utilities
│   └── package.json      # Frontend dependencies
├── data/                 # Data files
│   └── prompts.json      # Project idea prompts
├── .env                  # Root environment variables
└── package.json          # Root package scripts
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check endpoint |
| `/api/random-prompt` | GET | Get a random project idea |
| `/api/filtered-prompts` | POST | Get project ideas filtered by categories |
| `/api/generate-prd` | POST | Generate a PRD based on a prompt |
| `/api/favorites/:userId` | GET | Get a user's favorite prompts |
| `/api/favorites` | POST | Save a favorite prompt |
| `/api/favorites/:id` | DELETE | Remove a favorite prompt |

## License

MIT License

## Credits

- Idea prompts curated by our creative team
- UI design inspired by modern juice brands and creative platforms
- Logo and branding designed in-house

## Connect with Us

- Website: [juici.space](https://juici.space)
- Twitter: [@juici_app](https://twitter.com/juici_app)
- Email: hello@juici.space 