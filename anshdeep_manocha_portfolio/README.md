# Anshdeep Manocha — Personal Portfolio

Official personal portfolio website for **Anshdeep Manocha**, second-year B.Tech Computer Science and Engineering student at JECRC University, Jaipur, and aspiring software developer.

## Features

- **Personal Information**: Accurate, student-friendly introduction, education at JECRC University, Jaipur, and verified professional channels.
- **Verified Skills**: 8 verified competencies supported by coursework and code repositories: Python, Programming Fundamentals, Problem Solving, HTML, CSS, JavaScript, Git & GitHub, and Basic UI Development.
- **6 Featured Projects**:
  1. **Python Programs**: Fibonacci sequence generation and iterative algorithmic logic.
  2. **Python Basic Struct**: Dictionary data structures, key-value mappings, and f-string formatting.
  3. **Correcting Grade**: Grade processing, class statistics, and unit-tested student utilities.
  4. **Quiz Application**: Interactive web quiz with real-time scoring, DOM manipulation, and responsive UI.
  5. **Reading List**: React, TypeScript, and Tailwind CSS book tracker with reading-status filters and summaries.
  6. **Python Programs — Factorial**: Loop-based factorial computation logic.
- **Real-Time Project Search & Filtering**: Instant search by title/technology, category filters (Python, Web, Problem Solving), and friendly empty state.
- **Contact Options**: Direct clickable links to GitHub (`@showracer6-cloud`), Email (`singhmanochaanshdeep@gmail.com`), and LinkedIn.
- **JARVIS AI Assistant**: Built-in intelligent portfolio chatbot answering questions about Anshdeep's education, skills, projects, and contact avenues without inventing unverified credentials.
- **Light & Dark Theme**: High-contrast, accessibility-checked theme toggle with automatic `localStorage` persistence.
- **Responsive Design**: Clean layout across desktop, tablet, and mobile devices.

---

## How to Run Locally

### Option 1: Live Server (Recommended for VS Code)
1. Open the project folder in VS Code.
2. If you don't already have it, install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"** (or click **Go Live** in the VS Code status bar).
4. The site will open at `http://127.0.0.1:5500/`.

### Option 2: Python Built-in HTTP Server
Run the following in your terminal inside the project directory:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000/` in any web browser.

### Option 3: Direct Browser Launch
Simply double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

---

## Deploying to Vercel

The portfolio is structured for zero-configuration static deployment on [Vercel](https://vercel.com):

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Anshdeep Manocha portfolio with 6 projects and JARVIS assistant"
   git branch -M main
   git remote add origin https://github.com/showracer6-cloud/<your-repo-name>.git
   git push -u origin main
   ```
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **"Add New..."** -> **"Project"**.
   - Select your portfolio repository.
   - Leave the **Framework Preset** as **"Other"** (static site).
   - Click **Deploy**.

---

## JARVIS Chatbot Architecture & API Configuration

JARVIS operates out of the box with an internal, client-side knowledge engine that requires **no external API keys** and will never expose secrets or incur usage charges.

### Optional Server-side API Connection:
If you wish to connect JARVIS to an external LLM (e.g., Google Gemini API via Vercel Serverless Functions):
1. Create a serverless function at `/api/chat.js`.
2. Access your API key securely on the server using `process.env.GEMINI_API_KEY`.
3. Set `GEMINI_API_KEY` in your Vercel Project Settings under **Environment Variables**.
4. The frontend in `script.js` automatically attempts to call `/api/chat`, and gracefully falls back to the internal knowledge engine if no serverless endpoint is deployed or if a network failure occurs.
