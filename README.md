# HS LearnPath+

HS LearnPath+ is a premium, AI-powered career curriculum mapping and social learning platform built with **Next.js 15**, **Firebase**, and **Genkit**.

## 🚀 Fix: "Can't Push Refs" Error
If you see the "Can't push refs to remote" error in Firebase Studio, it means your local code is out of sync with GitHub. Run these exact commands in your terminal:

```bash
# 1. Pull and rebase to integrate remote changes
git pull origin main --rebase

# 2. Force push your integrated changes
git push origin main --force
```

## 💻 Local Development
Once pushed, you can run it locally:
1. `git clone https://github.com/harshilb186-png/HS_LearnPath`
2. `npm install`
3. `npm run dev`

## 📁 Project Features
- **AI Skill Mapping**: Compare your skills against industry benchmarks.
- **Dynamic Curriculum**: Structured learning journeys powered by AI summaries.
- **Cyber-Glass UI**: A high-fidelity, responsive interface with Dark/Light mode.
- **Live Lounge**: Collaborative video workshops for peer learning.
