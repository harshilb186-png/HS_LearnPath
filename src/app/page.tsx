"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  TrendingUp, 
  Zap,
  LayoutDashboard,
  BrainCircuit,
  Rocket,
  Clock,
  PlayCircle,
  Video,
  UserCheck
} from "lucide-react";
import Link from "next/link";
import { MOCK_CURRICULUM } from "@/lib/curriculum-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useUser, useCollection, useMemoFirebase, useFirestore } from "@/firebase";
import { collection, query, limit } from "firebase/firestore";

export default function Home() {
  const { user } = useUser();
  const db = useFirestore();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-learning');

  // Fetch recent paths
  const lpQuery = useMemoFirebase(() => query(collection(db, "learningPaths"), limit(3)), [db]);
  const { data: recentPaths } = useCollection(lpQuery);

  return (
    <div className="min-h-screen flex flex-col bg-background hero-gradient">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-12 max-w-7xl">
        {/* Welcome Section */}
        <section className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 glass-card rounded-3xl p-1 overflow-hidden">
            <div className="lg:col-span-2 relative h-[450px] rounded-2xl overflow-hidden m-1">
              <img 
                src={heroImage?.imageUrl} 
                alt="Hero" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-ai-hint="learning education"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent flex flex-col justify-center p-12 text-white">
                <Badge className="w-fit mb-4 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                  <Rocket className="w-3 h-3 mr-1" /> HS LearnPath+ Version 2.0
                </Badge>
                <h1 className="font-headline text-5xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
                  Your Future, <br /><span className="text-primary italic">AI-Accelerated</span>
                </h1>
                <p className="max-w-md text-lg opacity-80 mb-8 leading-relaxed font-medium">
                  Experience a high-fidelity learning journey. From curriculum mapping to live peer discussions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 rounded-full px-8 font-bold">
                    <Link href="/curriculum">Explore Catalog</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white/5 border-white/20 hover:bg-white/10 rounded-full px-8 font-bold">
                    <Link href="/assessment">Skill Assessment</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-6 justify-center bg-white/[0.01]">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" /> Progress Overview
                    </p>
                    <span className="text-sm font-bold text-primary">35%</span>
                  </div>
                  <Progress value={35} className="h-2.5" />
                  <p className="text-xs text-muted-foreground italic">You're in the top 10% of active learners this week!</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                  <div className="space-y-1 p-4 bg-white/5 rounded-2xl">
                    <p className="text-3xl font-black font-headline tracking-tighter">45</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Core Skills</p>
                  </div>
                  <div className="space-y-1 p-4 bg-primary/10 rounded-2xl">
                    <p className="text-3xl font-black font-headline tracking-tighter text-primary">12</p>
                    <p className="text-[10px] text-primary uppercase tracking-wider font-bold">Mastered</p>
                  </div>
                </div>

                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 border-2 rounded-2xl overflow-hidden group/streak cursor-pointer">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-sm flex items-center gap-2 font-bold uppercase tracking-widest">
                        <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Daily Streak
                      </CardTitle>
                      <p className="text-xl font-black">5 Days</p>
                    </div>
                    <div className="bg-yellow-500/10 p-3 rounded-full group-hover/streak:scale-110 transition-transform">
                      <Zap className="h-6 w-6 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <PlayCircle className="w-6 h-6 text-primary" /> Recent Learning Journeys
              </h2>
              <Button variant="ghost" asChild className="text-primary hover:text-primary/80 font-bold uppercase text-xs tracking-widest">
                <Link href="/curriculum" className="flex items-center gap-2">View Full Catalog <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recentPaths && recentPaths.length > 0 ? (
                recentPaths.map((path) => (
                  <Card key={path.id} className="group glass-card border-white/5 hover:border-primary/40 transition-all duration-300 overflow-hidden cursor-pointer rounded-3xl">
                    <CardHeader className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="outline" className="px-3 py-1 font-bold">New Path</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 font-bold">
                          <Clock className="w-3 h-3" /> Self-Paced
                        </span>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors font-headline font-bold">
                        {path.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mt-3 text-sm leading-relaxed">
                        {path.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <Button asChild className="w-full rounded-2xl font-bold py-6 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                        <Link href={`/curriculum/${path.id}`} className="flex items-center gap-2">
                          Start Journey <ArrowRight size={16} />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 p-12 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                   <p className="text-muted-foreground">Welcome to LearnPath+! Start exploring our curriculum to see your journeys here.</p>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-4 space-y-8">
            {/* Quick Access Tiles */}
            <div className="grid grid-cols-1 gap-4">
              <Link href="/meet" className="group p-6 glass-card rounded-3xl border-primary/20 hover:border-primary/40 transition-all block relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Video size={120} />
                </div>
                <div className="flex items-center gap-4 mb-4">
                   <div className="bg-primary/20 p-3 rounded-2xl">
                     <Video className="text-primary h-6 w-6" />
                   </div>
                   <h3 className="font-bold text-xl">Live Lounge</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Join 12 peers discussing Cloud Architecture right now.</p>
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  Join Session <ArrowRight size={14} />
                </div>
              </Link>

              <Link href="/assessment" className="group p-6 glass-card rounded-3xl border-secondary/20 hover:border-secondary/40 transition-all block relative overflow-hidden">
                 <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <UserCheck size={120} />
                </div>
                <div className="flex items-center gap-4 mb-4">
                   <div className="bg-secondary/20 p-3 rounded-2xl">
                     <UserCheck className="text-secondary h-6 w-6" />
                   </div>
                   <h3 className="font-bold text-xl">Skill Gap Analysis</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Let AI map your current skills to your dream career trajectory.</p>
                <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest">
                  Start Scan <ArrowRight size={14} />
                </div>
              </Link>
            </div>

            <Card className="glass-card border-primary/20 shadow-2xl rounded-3xl overflow-hidden">
              <div className="h-1.5 bg-primary" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BrainCircuit className="w-5 h-5 text-primary" /> AI Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-3 relative overflow-hidden group">
                  <p className="text-sm leading-relaxed relative z-10 font-medium">
                    "Based on your interest in <span className="text-primary font-bold">Microservices</span>, I've prioritized <span className="text-primary font-bold">Kubernetes Orchestration</span> in your roadmap."
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground px-1">Weekly Milestones</h4>
                  {[
                    { title: "Complete Docker Lab", date: "Wed" },
                    { title: "Team Peer Review", date: "Thu" },
                    { title: "Skill Assessment", date: "Sat" }
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-xs font-medium">{goal.title}</span>
                      <Badge variant="outline" className="text-[9px] uppercase font-bold bg-primary/5">{goal.date}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
