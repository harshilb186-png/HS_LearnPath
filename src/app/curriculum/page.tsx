"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  PlayCircle, 
  BookOpen, 
  ChevronRight, 
  Lock, 
  Trophy, 
  Sparkles, 
  Clock, 
  Plus, 
  Loader2 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCollection, useDoc, useUser, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";

export default function CurriculumPage() {
  const { user } = useUser();
  const db = useFirestore();

  // Fetch real Learning Paths from Firestore
  const lpQuery = useMemoFirebase(() => {
    return query(collection(db, "learningPaths"), orderBy("name", "asc"));
  }, [db]);
  const { data: learningPaths, isLoading: isPathsLoading } = useCollection(lpQuery);

  // Fetch user profile to check role
  const profileRef = useMemoFirebase(() => {
    return user ? doc(db, "users", user.uid) : null;
  }, [db, user]);
  const { data: profile } = useDoc(profileRef);

  const isStaff = profile?.role === 'Admin' || profile?.role === 'Teacher';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12 space-y-12 max-w-6xl">
        <header className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1 px-4">
                <Trophy className="w-3 h-3 mr-2" /> HS LearnPath+ Catalog
              </Badge>
              <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Expert-Led Curriculum</h1>
              <p className="text-xl text-muted-foreground">
                Master industry-standard skills with our structured learning journeys.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              {isStaff && (
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 font-bold">
                  <Link href="/curriculum/new">
                    <Plus className="mr-2 h-5 w-5" /> Create New Course
                  </Link>
                </Button>
              )}
              
              <Card className="glass-card border-primary/10 p-6 min-w-[280px]">
                <div className="flex items-center gap-6">
                  <div className="relative h-20 w-20">
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                      <path
                        className="text-white/5 stroke-current"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-primary stroke-current"
                        strokeWidth="3"
                        strokeDasharray="35, 100"
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">35%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Your Progress</p>
                    <p className="text-lg font-bold">Global Completion</p>
                    <p className="text-xs text-muted-foreground">Keep pushing boundaries!</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {isPathsLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="text-muted-foreground">Loading curriculum...</p>
            </div>
          ) : learningPaths && learningPaths.length > 0 ? (
            learningPaths.map((path, index) => (
              <Card 
                key={path.id} 
                className="group border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className="md:w-20 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/5 bg-primary/10">
                    <div className="text-3xl font-headline font-black text-primary">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div className="flex-1 p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/20 p-1.5 rounded-full"><PlayCircle className="h-5 w-5 text-primary" /></div>
                          <CardTitle className="text-2xl">{path.name}</CardTitle>
                        </div>
                        <CardDescription className="text-lg leading-relaxed max-w-3xl">
                          {path.description}
                        </CardDescription>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Badge variant="outline" className="px-3 py-1">
                          Available
                        </Badge>
                        <span className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Self-Paced
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex gap-4">
                        <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] uppercase font-bold tracking-widest">
                          <Sparkles className="w-3 h-3 mr-1 text-primary" /> AI Assisted
                        </Badge>
                        <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] uppercase font-bold tracking-widest">
                          <BookOpen className="w-3 h-3 mr-1 text-secondary" /> Project Based
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4">
                        <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary transition-colors">
                           <Link href={`/curriculum/${path.id}`}>
                             Preview Syllabus
                           </Link>
                        </Button>
                        <Button asChild size="lg" className="px-8 shadow-xl bg-primary hover:bg-primary/90 shadow-primary/20">
                          <Link href={`/curriculum/${path.id}`} className="flex items-center gap-2 font-bold">
                            Continue Learning
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
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-bold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">Start your journey by creating the first course in the catalog.</p>
              {isStaff && (
                <Button asChild variant="outline">
                  <Link href="/curriculum/new">Add First Course</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}