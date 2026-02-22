# HS LearnPath+

HS LearnPath+ is a premium, AI-powered career curriculum mapping and social learning platform. It uses **Next.js 15** for high performance and deep integration with Firebase and Genkit.

## 📥 How to Download This Project Locally

Since the code is currently in this cloud workspace, the best way to "download" it is to sync it with your GitHub and then clone it to your computer.

### Step 1: Push from this Workspace to GitHub
Run these commands in the terminal **here in this workspace**:

```bash
# Initialize git (if not already done)
git init

# Connect to your GitHub repository
git remote add origin https://github.com/harshilb186-png/HS_LearnPath

# Add all the new files
git add .

# Save the changes locally
git commit -m "Migrated to Next.js 15 Cyber-Glass UI and integrated Firebase/GenAI"

# Push to your GitHub
git push -u origin main --force
```
*Note: If it says "remote origin already exists", use:* `git remote set-url origin https://github.com/harshilb186-png/HS_LearnPath`

### Step 2: Download to your Computer (Clone)
Once Step 1 is done, go to your local computer's terminal (Command Prompt, PowerShell, or Terminal) and run:

```bash
git clone https://github.com/harshilb186-png/HS_LearnPath
cd HS_LearnPath
npm install
npm run dev
```

## 📁 Folder Structure Mapping
If you are coming from a Vite project, here is where your files now live:

| Your Vite Structure | HS LearnPath+ (Next.js) | Description |
| :--- | :--- | :--- |
| `src/pages/` | `src/app/` | Next.js App Router uses the `app` folder for routes. |
| `src/App.tsx` | `src/app/layout.tsx` | Global layout, navbar, and providers. |
| `src/styles.css` | `src/app/globals.css` | The "Cyber-Glass" Tailwind theme variables. |
| `index.tsx` | `src/app/page.tsx` | The entry point for your Home dashboard. |
| `vite.config.ts` | `next.config.ts` | The configuration file for the Next.js framework. |

## 🚀 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, Lucide Icons, Cyber-Glass Morphism
- **Backend**: Firebase (Auth, Firestore)
- **AI**: Genkit (Gemini 2.5 Flash)
