# HS LearnPath+

HS LearnPath+ is a premium, AI-powered career curriculum mapping and social learning platform. It uses **Next.js 15** for high performance and deep integration with Firebase and Genkit.

## 📁 Folder Structure Mapping
If you are coming from a Vite project (like the one in your screenshot), here is where my files belong:

| Your Vite Structure | HS LearnPath+ (Next.js) | Description |
| :--- | :--- | :--- |
| `src/pages/` | `src/app/` | Next.js App Router uses the `app` folder for routes. |
| `src/App.tsx` | `src/app/layout.tsx` | Global layout, navbar, and providers. |
| `src/styles.css` | `src/app/globals.css` | The "Cyber-Glass" Tailwind theme variables. |
| `index.tsx` | `src/app/page.tsx` | The entry point for your Home dashboard. |
| `vite.config.ts` | `next.config.ts` | The configuration file for the Next.js framework. |

## 🚀 How to Sync with GitHub
Since you already have an existing repository at `https://github.com/harshilb186-png/HS_LearnPath`, follow these steps in your terminal to overwrite your local Vite code with this new Next.js version:

### 1. Initialize and Connect
```bash
git init
git remote add origin https://github.com/harshilb186-png/HS_LearnPath
```
*Note: If it says "remote origin already exists", use:*
`git remote set-url origin https://github.com/harshilb186-png/HS_LearnPath`

### 2. Pull existing code (to avoid conflicts)
```bash
git pull origin main --rebase
```

### 3. Add and Commit this new structure
```bash
git add .
git commit -m "Migrated to Next.js 15 Cyber-Glass UI and integrated Firebase/GenAI"
```

### 4. Push to GitHub
```bash
git push -u origin main
```

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, Lucide Icons, Cyber-Glass Morphism
- **Backend**: Firebase (Auth, Firestore)
- **AI**: Genkit (Gemini 2.5 Flash)
