# HS LearnPath+

HS LearnPath+ is a premium, AI-powered career curriculum mapping and social learning platform. It features a "Cyber-Glass" aesthetic and deep integration with Firebase for real-time collaboration.

## Features

- **Dashboard**: High-impact metrics, activity streaks, and AI strategy feed.
- **Curriculum**: Real-time course catalog with role-based access control for Students, Teachers, and Admins.
- **Assessment**: AI-driven skill gap analysis and career mapping.
- **Meet**: Integrated live video lounge ("Career Lounge") for real-time workshops and peer discussion.

## 🚀 Deployment & Git Sync

To push the current state of **HS LearnPath+** to your repository, follow these steps in your IDE terminal:

### 1. Initialize Git
If this is the first time you are pushing this specific folder:
```bash
git init
```

### 2. Connect to your Remote Repo
This command connects your local project to your GitHub repository.
```bash
git remote add origin https://github.com/harshilb186-png/HS_LearnPath
```
*Note: If it says "remote origin already exists", use:*
`git remote set-url origin https://github.com/harshilb186-png/HS_LearnPath`

### 3. Add and Commit your changes
```bash
git add .
git commit -m "Integrated HS LearnPath+ Cyber-Glass UI and Firebase features"
```

### 4. Push to the main branch
```bash
git branch -M main
git push -u origin main
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, Lucide Icons, and "Cyber-Glass" Glassmorphism
- **Backend**: Firebase (Auth, Firestore)
- **AI**: Genkit (Gemini 2.5 Flash)
- **UI Components**: Radix UI & ShadCN
