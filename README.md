# HS LearnPath+

HS LearnPath+ is a premium, AI-powered career curriculum mapping and social learning platform built with **Next.js 15**, **Firebase**, and **Genkit**.

## 🚀 Quick Push to GitHub

Run these commands in your terminal to sync this workspace with your repository at `https://github.com/harshilb186-png/HS_LearnPath`:

```bash
# 1. Initialize and link
git init
git remote add origin https://github.com/harshilb186-png/HS_LearnPath || git remote set-url origin https://github.com/harshilb186-png/HS_LearnPath

# 2. Stage and Save
git add .
git commit -m "Migration to Next.js 15 Cyber-Glass UI"

# 3. Push (Sets upstream automatically)
git push -u origin main --force
```

## 💻 Local Development
Once pushed, you can run it locally:
1. `git clone https://github.com/harshilb186-png/HS_LearnPath`
2. `npm install`
3. `npm run dev`

## 📁 Migration Note
- **Vite `src/pages`** -> Moved to **Next.js `src/app`**
- **Vite `src/App.tsx`** -> Moved to **Next.js `src/app/layout.tsx`**
- **Vite `index.html`** -> Handled by **Next.js `layout.tsx`** and `page.tsx`
