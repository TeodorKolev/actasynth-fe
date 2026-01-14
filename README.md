# AgentOps Studio - Frontend

AI-powered value proposition generator using multiple LLM providers (OpenAI, Anthropic, Google).

## Features

✅ **Authentication** - Supabase-based login with protected routes
✅ **Multi-Step Workflow** - Customer feedback → AI configuration → Processing → Results
✅ **Multi-Provider Support** - OpenAI, Anthropic, and Google (Gemini)
✅ **Real-time Processing** - Live workflow execution with progress tracking
✅ **Value Proposition Display** - Beautiful results view with all VP components
✅ **Self-Check Quality** - AI verification of accuracy and hallucination risk
✅ **Dashboard** - Overview with quick actions and get started guide
✅ **Responsive Design** - Mobile-friendly interface using shadcn/ui

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **UI:** shadcn/ui + TailwindCSS
- **Authentication:** Supabase
- **State Management:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

## Prerequisites

1. **Node.js 18+** - [Download](https://nodejs.org/)
2. **Supabase Project** - [Create one](https://supabase.com)
3. **Backend API** - Running at `http://localhost:8000`

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Then edit `.env.local` with your credentials:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**How to get Supabase credentials:**
1. Go to https://supabase.com
2. Create a new project (or use existing)
3. Go to Settings → API
4. Copy the "Project URL" and "anon public" key

### 3. Set Up Supabase Authentication

In your Supabase project dashboard:

1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Add an email and password
4. The user will be able to log in immediately (no email confirmation needed in development)

### 4. Start the Backend API

Make sure your backend API is running at `http://localhost:8000`:

```bash
# In your backend directory
python main.py
```

The backend should expose these endpoints:
- `POST /api/v1/workflow/execute` - Execute single workflow
- `POST /api/v1/workflow/execute-parallel` - Compare providers
- `GET /api/v1/health` - Health check

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### 1. Login

- Navigate to http://localhost:3000
- You'll be redirected to the login page
- Enter your Supabase user credentials
- You'll be redirected to the dashboard

### 2. Create a Workflow

1. Click **"New Workflow"** on the dashboard
2. **Step 1: Input** - Paste customer feedback (min 10 characters)
3. **Step 2: Configure** - Choose provider (OpenAI/Anthropic/Google) and temperature
4. **Step 3: Processing** - Watch real-time execution
5. **Step 4: Results** - View, edit, and export your value proposition

### 3. View Results

The results page shows:
- **Value Prop Tab** - All sections of the generated value proposition
- **Raw Data Tab** - Extracted insights and normalized input
- **Self-Check Tab** - Quality verification and claim support
- **Metrics Tab** - Execution details (cost, latency, model used)

## Project Structure

```
actasynth-fe/
├── app/                          # Next.js App Router
│   ├── (auth)/login/             # Login page
│   ├── (dashboard)/              # Protected routes
│   │   ├── dashboard/            # Dashboard home
│   │   └── workflow/new/         # Workflow creation
│   ├── layout.tsx                # Root layout
│   └── providers.tsx             # Client providers
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Header, navigation
│   ├── forms/                    # Login form
│   └── workflow/                 # Workflow wizard & steps
├── lib/
│   ├── supabase.ts               # Supabase client
│   ├── api.ts                    # API request wrapper
│   ├── queries/                  # TanStack Query hooks
│   └── utils.ts                  # Helper functions
├── types/                        # TypeScript definitions
├── hooks/                        # Custom React hooks
├── providers/                    # React context providers
└── middleware.ts                 # Route protection
```

## API Integration

The frontend expects these backend endpoints:

### Execute Workflow
```
POST /api/v1/workflow/execute?provider=google&temperature=0.7
Body: { "content": "customer feedback...", "source": "manual" }
Response: WorkflowResult
```

### Compare Providers
```
POST /api/v1/workflow/execute-parallel?providers=openai&providers=anthropic
Body: { "content": "customer feedback..." }
Response: { [provider: string]: WorkflowResult }
```

## Development

### Build for Production

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

## Troubleshooting

### "Missing Supabase environment variables"

Make sure `.env.local` exists with valid Supabase credentials.

### "Invalid login credentials"

1. Check that you created a user in Supabase Authentication
2. Verify the email/password are correct
3. Make sure your Supabase URL and anon key are correct

### "API request failed"

1. Check that the backend is running at `http://localhost:8000`
2. Test the backend: `curl http://localhost:8000/api/v1/health`
3. Check the browser console for detailed error messages

### "Network error"

1. Verify `NEXT_PUBLIC_API_URL` in `.env.local` is correct
2. Make sure CORS is enabled in your backend
3. Check that the backend accepts requests from `http://localhost:3000`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | `eyJhbGciOi...` |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**Important:** Update `NEXT_PUBLIC_API_URL` to your production backend URL.

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Any platform supporting Node.js

## MVP Status

✅ **Completed:**
- Authentication (Supabase login)
- Protected routes with middleware
- Dashboard with quick actions
- Complete workflow creation wizard (4 steps)
- API integration with TanStack Query
- Real-time workflow processing
- Comprehensive results display
- Responsive mobile design

🚧 **Future Enhancements:**
- Workflow history page
- Provider comparison view
- Analytics dashboard
- Export to PDF/DOCX
- Settings page
- Search and filtering
- Real-time notifications

## License

Proprietary - AgentOps Studio

## Support

For issues or questions, please contact the development team.