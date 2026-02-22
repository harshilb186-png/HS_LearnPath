"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  PlayCircle, 
  BookOpen, 
  ChevronRight, 
  Trophy, 
  Sparkles, 
  Clock, 
  Plus, 
  Loader2 
} from "lucide-react";
import Link from "next/link";
import { useCollection, useDoc, useUser, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";

export default function CurriculumPage() {
  const { user } = useUser();
  const db = useFirestore();

  const lpQuery = useMemoFirebase(() => {
    return query(collection(db, "learningPaths"), orderBy("name", "asc"));
  }, [db]);
  const { data: learningPaths, isLoading: isPathsLoading } = useCollection(lpQuery);

  const profileRef = useMemoFirebase(() => {
    return user ? doc(db, "users", user.uid) : null;
  }, [db, user]);
  const { data: profile } = useDoc(profileRef);

  const isStaff = profile?.role === 'Admin' || profile?.role === 'Teacher';

  return (
    <div className="min-h-screen flex flex-col bg-background hero-glow">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16 space-y-16 max-w-6xl">
        <header className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 py-1.5 px-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px]">
                <Trophy className="w-3.5 h-3.5 mr-2" /> Course Catalog
              </Badge>
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">Expert-Led <br />Curriculum</h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Master industry-standard skills with our high-fidelity structured learning journeys.
              </p>
            </div>
            
            <div className="flex flex-col gap-6 shrink-0">
              {isStaff && (
                <Button asChild size="lg" className="cyber-button bg-primary hover:bg-primary/90 h-14 px-8 rounded-2xl font-bold text-lg">
                  <Link href="/curriculum/new">
                    <Plus className="mr-3 h-5 w-5" /> Create Journey
                  </Link>
                </Button>
              )}
              
              <Card className="glass-card p-8 rounded-[2rem] border-white/5 min-w-[320px]">
                <div className="flex items-center gap-8">
                  <div className="relative h-24 w-24">
                    <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 36 36">
                      <circle
                        className="text-white/[0.03] stroke-current"
                        strokeWidth="3"
                        fill="none"
                        cx="18"
                        cy="18"
                        r="15.9155"
                      />
                      <circle
                        className="text-primary stroke-current"
                        strokeWidth="3"
                        strokeDasharray="35, 100"
                        strokeLinecap="round"
                        fill="none"
                        cx="18"
                        cy="18"
                        r="15.9155"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-headline font-bold text-white">35%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Milestones</p>
                    <p className="text-xl font-headline font-bold text-white leading-tight">Mastery <br />Overview</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {isPathsLoading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
              <Loader2 className="h-16 w-16 text-primary animate-spin opacity-50" />
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Decrypting Catalog...</p>
            </div>
          ) : learningPaths && learningPaths.length > 0 ? (
            learningPaths.map((path, index) => (
              <Card 
                key={path.id} 
                className="group glass-card hover:bg-white/[0.05] transition-all duration-700 rounded-[2.5rem] border-white/[0.05] overflow-hidden"
              >
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className="md:w-32 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/5 bg-secondary/80 transition-colors group-hover:bg-primary/20">
                    <div className="text-4xl font-headline font-black text-primary/30 group-hover:text-primary transition-all duration-500">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div className="flex-1 p-10 space-y-8">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                      <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-4">
                          <div className="icon-plate purple group-hover:scale-110 transition-transform">
                            <PlayCircle className="h-6 w-6" />
                          </div>
                          <CardTitle className="text-3xl font-headline font-bold text-white group-hover:text-primary transition-colors">{path.name}</CardTitle>
                        </div>
                        <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                          {path.description}
                        </CardDescription>
                      </div>
                      
                      <div className="flex flex-col items-end gap-3 shrink-0">
                        <Badge variant="outline" className="px-5 py-1.5 rounded-full border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white">
                          Verified Path
                        </Badge>
                        <span className="text-sm font-bold text-muted-foreground flex items-center gap-3">
                          <Clock className="w-4 h-4 text-accent" /> Self-Paced Access
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-10 border-t border-white/5">
                      <div className="flex gap-4">
                        <Badge variant="outline" className="bg-secondary/40 border-white/5 text-[10px] uppercase font-bold tracking-[0.25em] py-2 px-5 rounded-full text-muted-foreground">
                          <Sparkles className="w-3.5 h-3.5 mr-2 text-primary" /> AI Assisted
                        </Badge>
                        <Badge variant="outline" className="bg-secondary/40 border-white/5 text-[10px] uppercase font-bold tracking-[0.25em] py-2 px-5 rounded-full text-muted-foreground">
                          <BookOpen className="w-3.5 h-3.5 mr-2 text-accent" /> Project Focused
                        </Badge>
                      </div>

                      <div className="flex items-center gap-6">
                        <Button variant="ghost" asChild className="text-muted-foreground hover:text-white transition-colors h-12 px-6 font-bold uppercase text-[10px] tracking-widest">
                           <Link href={`/curriculum/${path.id}`}>
                             Preview
                           </Link>
                        </Button>
                        <Button asChild size="lg" className="cyber-button h-12 px-10 rounded-full bg-primary hover:bg-primary/90 font-bold">
                          <Link href={`/curriculum/${path.id}`} className="flex items-center gap-3">
                            Start Journey
                            <ChevronRight size={20} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-32 glass-card rounded-[3rem] border-dashed border-white/10">
              <div className="icon-plate blue mx-auto mb-8 h-20 w-20">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-3xl font-headline font-bold text-white mb-4">The Repository is Empty</h3>
              <p className="text-muted-foreground mb-12 max-w-md mx-auto">Start your legacy by deploying the first course into the global catalog.</p>
              {isStaff && (
                <Button asChild variant="outline" className="cyber-button rounded-full h-14 px-12 border-white/10 hover:bg-white/5 font-bold text-lg text-primary">
                  <Link href="/curriculum/new">Deploy First Course</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
