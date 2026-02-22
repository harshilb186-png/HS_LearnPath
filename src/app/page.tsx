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
  BrainCircuit,
  Rocket,
  Clock,
  PlayCircle,
  Video,
  UserCheck,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useUser, useCollection, useMemoFirebase, useFirestore } from "@/firebase";
import { collection, query, limit } from "firebase/firestore";

export default function Home() {
  const { user } = useUser();
  const db = useFirestore();

  const lpQuery = useMemoFirebase(() => query(collection(db, "learningPaths"), limit(3)), [db]);
  const { data: recentPaths } = useCollection(lpQuery);

  return (
    <div className="min-h-screen flex flex-col bg-background hero-glow">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12 space-y-16 max-w-7xl">
        <section className="relative group">
          <div className="absolute -inset-1 bg-primary rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-1 glass-card rounded-[3rem] p-1">
            <div className="lg:col-span-8 relative h-[500px] rounded-[2.8rem] overflow-hidden">
              <img 
                src="https://picsum.photos/seed/learn-1/1200/600" 
                alt="Hero" 
                className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
                data-ai-hint="learning education"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent lg:bg-gradient-to-r lg:from-background lg:to-transparent flex flex-col justify-center p-12">
                <Badge className="w-fit mb-6 bg-primary/20 text-primary border-primary/30 backdrop-blur-md px-4 py-1">
                  <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse" /> HS LearnPath+ Professional
                </Badge>
                <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-white">
                  The Best Place To <br /><span className="text-primary italic">Build Your Future.</span>
                </h1>
                <p className="max-w-lg text-lg text-muted-foreground mb-10 leading-relaxed">
                  A premium social development environment for the next generation of engineers and designers. Explore, assess, and collaborate.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="cyber-button bg-primary hover:bg-primary/90 rounded-full px-10 h-14 font-bold text-lg">
                    <Link href="/curriculum">Get Started</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="cyber-button bg-white/5 border-white/10 hover:bg-white/10 rounded-full px-10 h-14 font-bold text-lg text-white">
                    <Link href="/assessment">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col p-8 justify-center space-y-10">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Global Progress
                    </p>
                    <span className="text-sm font-bold text-accent">35%</span>
                  </div>
                  <Progress value={35} className="h-2 bg-white/5" />
                  <p className="text-xs text-muted-foreground italic opacity-70">"You're in the top 10% of active learners this week!"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 glass-card rounded-2xl border-white/5 flex flex-col items-center text-center">
                    <p className="text-3xl font-headline font-bold text-white mb-1">45</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Skills Tracked</p>
                  </div>
                  <div className="p-5 glass-card rounded-2xl border-accent/20 flex flex-col items-center text-center bg-accent/5">
                    <p className="text-3xl font-headline font-bold text-accent mb-1">12</p>
                    <p className="text-[10px] text-accent/70 uppercase tracking-widest font-bold">Mastered</p>
                  </div>
                </div>

                <Card className="glass-card border-primary/20 rounded-2xl group/streak cursor-pointer hover:bg-primary/5 transition-colors">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xs flex items-center gap-2 font-bold uppercase tracking-widest text-primary">
                        <Zap className="w-4 h-4 fill-primary" /> Daily Streak
                      </CardTitle>
                      <p className="text-2xl font-headline font-bold text-white">5 Days</p>
                    </div>
                    <div className="icon-plate purple group-hover/streak:scale-110 transition-transform">
                      <Zap className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-10">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-3xl font-headline font-bold text-white flex items-center gap-4">
                <PlayCircle className="w-8 h-8 text-primary" /> Learning Journeys
              </h2>
              <Button variant="link" asChild className="text-primary hover:text-primary/80 font-bold uppercase text-xs tracking-[0.2em]">
                <Link href="/curriculum" className="flex items-center gap-2">View Catalog <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recentPaths && recentPaths.length > 0 ? (
                recentPaths.map((path) => (
                  <Card key={path.id} className="group glass-card hover:bg-white/[0.06] transition-all duration-500 rounded-[2.5rem] border-white/5">
                    <CardHeader className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <Badge variant="outline" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">Active Path</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-2 font-bold uppercase tracking-widest">
                          <Clock className="w-3.5 h-3.5 text-accent" /> Self-Paced
                        </span>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors font-headline font-bold text-white mb-4">
                        {path.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3">
                        {path.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                      <Button asChild className="w-full cyber-button rounded-2xl font-bold h-12 bg-white/5 text-white hover:bg-primary transition-all">
                        <Link href={`/curriculum/${path.id}`} className="flex items-center gap-2">
                          Resume Learning <ArrowRight size={18} />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 p-16 text-center glass-card rounded-[3rem] border-dashed border-white/10">
                   <p className="text-muted-foreground text-lg">Start exploring our curriculum to see your journeys here.</p>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-4 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <Link href="/meet" className="group p-8 glass-card rounded-[2.5rem] hover:bg-primary/5 transition-all block relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                  <Video size={160} className="text-primary" />
                </div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                   <div className="icon-plate purple">
                     <Video className="h-6 w-6" />
                   </div>
                   <h3 className="font-headline font-bold text-2xl text-white">Live Lounge</h3>
                </div>
                <p className="text-muted-foreground mb-8 relative z-10 leading-relaxed">Join real-time peer discussions and workshops.</p>
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.3em] relative z-10">
                  Join Room <ArrowRight size={14} />
                </div>
              </Link>

              <Link href="/assessment" className="group p-8 glass-card rounded-[2.5rem] hover:bg-accent/5 transition-all block relative overflow-hidden border-accent/10">
                 <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity -rotate-12">
                  <UserCheck size={160} className="text-accent" />
                </div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                   <div className="icon-plate blue">
                     <UserCheck className="h-6 w-6" />
                   </div>
                   <h3 className="font-headline font-bold text-2xl text-white">Skill Scan</h3>
                </div>
                <p className="text-muted-foreground mb-8 relative z-10 leading-relaxed">Map your current stack to your dream career path.</p>
                <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.3em] relative z-10">
                  Analyze Now <ArrowRight size={14} />
                </div>
              </Link>
            </div>

            <Card className="glass-card rounded-[2.5rem] border-primary/20 shadow-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary to-accent w-full" />
              <CardHeader className="p-8">
                <CardTitle className="flex items-center gap-3 text-lg font-headline text-white">
                  <BrainCircuit className="w-5 h-5 text-accent" /> AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-8">
                <div className="p-5 rounded-2xl bg-secondary/40 border border-white/5 relative overflow-hidden group">
                  <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                    "Based on your recent labs, I've prioritized <span className="text-primary font-bold">Cloud Security</span> in your custom roadmap."
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60 px-1">Milestones</h4>
                  {[
                    { title: "Complete Docker Lab", date: "Today", color: "purple" },
                    { title: "Portfolio Review", date: "Thu", color: "blue" },
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors">
                      <span className="text-sm font-medium text-white">{goal.title}</span>
                      <Badge variant="outline" className={goal.color === 'purple' ? "border-primary/20 bg-primary/5 text-primary text-[9px] uppercase" : "border-accent/20 bg-accent/5 text-accent text-[9px] uppercase"}>
                        {goal.date}
                      </Badge>
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