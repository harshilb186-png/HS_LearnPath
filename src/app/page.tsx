
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
  PlayCircle,
  Video,
  Sparkles,
  Clock
} from "lucide-react";
import Link from "next/link";
import { useCollection, useMemoFirebase, useFirestore } from "@/firebase";
import { collection, query, limit } from "firebase/firestore";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const db = useFirestore();
  const lpQuery = useMemoFirebase(() => query(collection(db, "learningPaths"), limit(3)), [db]);
  const { data: recentPaths } = useCollection(lpQuery);

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-car');

  return (
    <div className="min-h-screen flex flex-col bg-background hero-glow">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12 space-y-16 max-w-7xl">
        <section className="relative group">
          <div className="absolute -inset-1 bg-primary rounded-[3rem] blur-3xl opacity-5 group-hover:opacity-10 transition duration-1000"></div>
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-1 glass-card rounded-[3rem] overflow-hidden">
            <div className="lg:col-span-8 relative min-h-[500px] flex flex-col justify-center p-12 overflow-hidden">
              <div className="absolute inset-0 z-0">
                {heroImage && (
                  <img 
                    src={heroImage.imageUrl} 
                    alt={heroImage.description} 
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                    data-ai-hint={heroImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
              </div>
              
              <div className="relative z-10">
                <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 backdrop-blur-md px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]">
                  <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse" /> AI-Powered Growth
                </Badge>
                <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
                  Navigate Your <br /><span className="text-primary italic">Career Legacy.</span>
                </h1>
                <p className="max-w-md text-lg text-muted-foreground mb-10 leading-relaxed font-medium">
                  A high-fidelity learning environment designed for precision-mapping your professional future through curated wisdom.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="cyber-button bg-primary hover:bg-primary/90 rounded-full px-10 h-14 font-bold">
                    <Link href="/curriculum">Explore Catalog</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="cyber-button border-white/10 hover:bg-white/5 rounded-full px-10 h-14 font-bold text-white">
                    <Link href="/assessment">Start Scan</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-8 flex flex-col justify-center space-y-8 bg-black/20 backdrop-blur-sm border-l border-white/5">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5" /> Mastery Index
                    </p>
                    <span className="text-sm font-bold text-accent">35%</span>
                  </div>
                  <Progress value={35} className="h-1.5 bg-white/5" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 glass-card rounded-2xl flex flex-col items-center text-center">
                    <p className="text-3xl font-headline font-bold text-white mb-1">45</p>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Skills</p>
                  </div>
                  <div className="p-6 glass-card rounded-2xl flex flex-col items-center text-center border-accent/20 bg-accent/5">
                    <p className="text-3xl font-headline font-bold text-accent mb-1">12</p>
                    <p className="text-[9px] text-accent/70 uppercase tracking-[0.2em] font-bold">Awards</p>
                  </div>
                </div>

                <Card className="glass-card border-primary/20 rounded-2xl hover:bg-primary/5 transition-colors cursor-pointer group">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 fill-primary" /> Daily Streak
                      </p>
                      <p className="text-2xl font-headline font-bold text-white">5 Days</p>
                    </div>
                    <div className="icon-plate purple group-hover:scale-110 transition-transform">
                      <Zap className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-8">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-3xl font-headline font-bold text-white flex items-center gap-4">
                <PlayCircle className="w-8 h-8 text-primary" /> Active Journeys
              </h2>
              <Button variant="link" asChild className="text-primary hover:text-primary/80 font-bold uppercase text-[10px] tracking-widest">
                <Link href="/curriculum">Full Catalog <ArrowRight className="w-3 h-3 ml-2" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recentPaths && recentPaths.length > 0 ? (
                recentPaths.map((path) => (
                  <Card key={path.id} className="group glass-card hover:bg-white/[0.04] transition-all duration-500 rounded-[2rem]">
                    <CardHeader className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[9px] uppercase tracking-tighter">Verified</Badge>
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-accent" /> Self-Paced
                        </span>
                      </div>
                      <CardTitle className="text-2xl font-headline font-bold text-white group-hover:text-primary transition-colors mb-4 line-clamp-1">
                        {path.name}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {path.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                      <Button asChild className="w-full cyber-button h-11 rounded-xl bg-white/5 text-white hover:bg-primary border border-white/5">
                        <Link href={`/curriculum/${path.id}`} className="flex items-center gap-2">
                          Resume <ArrowRight size={16} />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 p-20 text-center glass-card rounded-[2rem] border-dashed border-white/10 opacity-50">
                   <p className="text-muted-foreground font-medium italic">Explore the curriculum to start your first journey.</p>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-4 space-y-8">
            <div className="space-y-6">
              <Link href="/meet" className="group p-8 glass-card rounded-[2rem] hover:bg-primary/5 transition-all block overflow-hidden relative">
                <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12 group-hover:scale-110 transition-transform">
                  <Video size={120} className="text-primary" />
                </div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                   <div className="icon-plate purple p-2 h-10 w-10">
                     <Video size={18} />
                   </div>
                   <h3 className="font-headline font-bold text-xl text-white">Live Lounge</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6 relative z-10 font-medium">Connect with peers in real-time collaborative workshops.</p>
                <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em] relative z-10">
                  Join Room <ArrowRight size={12} />
                </div>
              </Link>

              <Card className="glass-card rounded-[2rem] border-primary/20 shadow-2xl overflow-hidden">
                <CardHeader className="p-8 border-b border-white/5">
                  <CardTitle className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white">
                    <BrainCircuit className="w-4 h-4 text-accent" /> AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="p-4 rounded-xl bg-secondary/40 border border-white/5">
                    <p className="text-xs leading-relaxed text-muted-foreground font-medium italic">
                      "I've analyzed your recent labs and prioritized <span className="text-primary font-bold">System Design</span> for your path."
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60 px-1">Upcoming</p>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors">
                      <span className="text-xs font-bold text-white">Docker Deep Dive</span>
                      <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[8px] uppercase">Today</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
