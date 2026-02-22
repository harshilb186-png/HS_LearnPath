# HS LearnPath+

HS LearnPath+ is a premium, AI-powered career curriculum mapping and social learning platform. It uses **Next.js 15** for high performance and deep integration with Firebase and Genkit.

## 📥 How to Push This Project to GitHub

To sync this workspace with your repository at `https://github.com/harshilb186-png/HS_LearnPath`, follow these steps in the terminal:

### Step 1: Initialize & Connect
```bash
# Initialize git (if you haven't already)
git init

# Connect to your GitHub repository
# Note: If it says "remote origin already exists", skip this or use 'set-url'
git remote add origin https://github.com/harshilb186-png/HS_LearnPath || git remote set-url origin https://github.com/harshilb186-png/HS_LearnPath

# Add all the files
git add .

# Save the changes locally
git commit -m "Migrated to Next.js 15 Cyber-Glass UI and integrated Firebase/GenAI"

# Push to your GitHub and set the upstream branch
git push -u origin main --force
```

### Step 2: Download to your Computer (Clone)
Once Step 1 is done, go to your local computer's terminal and run:

```bash
git clone https://github.com/harshilb186-png/HS_LearnPath
cd HS_LearnPath
npm install
npm run dev
```

## 📁 Migration Folder Structure
If you are coming from a Vite project, here is where your files now live:

| Your Vite Structure | HS LearnPath+ (Next.js) | Description |
| :--- | :--- | :--- |
| `src/pages/` | `src/app/` | Next.js App Router uses the `app` folder for routes. |
| `src/App.tsx` | `src/app/layout.tsx` | Global layout, navbar, and providers. |
| `src/styles.css` | `src/app/globals.css` | The Cyber-Glass Tailwind theme. |
| `index.tsx` | `src/app/page.tsx` | Entry point for the Home dashboard. |

## 🚀 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, Lucide Icons, Cyber-Glass Morphism
- **Backend**: Firebase (Auth, Firestore)
- **AI**: Genkit (Gemini 2.5 Flash)
