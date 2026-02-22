# HS LearnPath+

HS LearnPath+ is a premium, AI-powered career curriculum mapping and social learning platform. It features a "Cyber-Glass" aesthetic and deep integration with Firebase for real-time collaboration.

## Features

- **Dashboard**: High-impact metrics, activity streaks, and AI strategy feed.
- **Curriculum**: Real-time course catalog with role-based access control for Students, Teachers, and Admins.
- **Assessment**: AI-driven skill gap analysis and career mapping.
- **Meet**: Integrated live video lounge ("Career Lounge") for real-time workshops and peer discussion.

## How to sync with your Git Repo

To push the current state of **HS LearnPath+** to your repository, follow these steps in your terminal:

### 1. Initialize Git (If not already done)
If this is the first time you are pushing this specific folder:
```bash
git init
```

### 2. Connect to your Remote Repo
Replace `<your-repo-url>` with your actual URL (e.g., `https://github.com/username/repo-name.git`).
```bash
git remote add origin <your-repo-url>
```
*If it says "remote origin already exists", you can skip this or use `git remote set-url origin <your-repo-url>`.*

### 3. Commit your changes
```bash
git add .
git commit -m "Integrated HS LearnPath+ Cyber-Glass UI and Firebase features"
```

### 4. Push to the main branch
```bash
git push -u origin main
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, Lucide Icons, and "Cyber-Glass" Glassmorphism
- **Backend**: Firebase (Auth, Firestore)
- **AI**: Genkit (Gemini 2.5 Flash)
- **UI Components**: Radix UI & ShadCN
