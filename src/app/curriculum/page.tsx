"use client";

import { Navbar } from "@/components/layout/Navbar";
import { MOCK_CURRICULUM } from "@/lib/curriculum-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, PlayCircle, BookOpen, ChevronRight, Lock, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CurriculumPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12 space-y-12 max-w-6xl">
        <header className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1 px-4">
                <Trophy className="w-3 h-3 mr-2" /> Verified Learning Path
              </Badge>
              <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">{MOCK_CURRICULUM.title}</h1>
              <p className="text-xl text-muted-foreground">
                Strategic roadmap for <span className="text-primary font-semibold">{MOCK_CURRICULUM.careerPath}</span>
              </p>
            </div>
            
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
                      strokeDasharray={`${MOCK_CURRICULUM.totalProgress}, 100`}
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{MOCK_CURRICULUM.totalProgress}%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Course Status</p>
                  <p className="text-lg font-bold">
                    {MOCK_CURRICULUM.modules.filter(m => m.status === 'completed').length} / {MOCK_CURRICULUM.modules.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Modules Completed</p>
                </div>
              </div>
            </Card>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {MOCK_CURRICULUM.modules.map((module, index) => {
            const isCompleted = module.status === 'completed';
            const isInProgress = module.status === 'in-progress';
            const isLocked = module.status === 'remaining';
            
            return (
              <Card 
                key={module.id} 
                className={cn(
                  "group border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden",
                  isInProgress && "border-primary/40 bg-primary/[0.03] ring-1 ring-primary/20",
                  isLocked && "opacity-60"
                )}
              >
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className={cn(
                    "md:w-20 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/5",
                    isCompleted ? "bg-secondary/10" : isInProgress ? "bg-primary/10" : "bg-muted/30"
                  )}>
                    <div className={cn(
                      "text-3xl font-headline font-black",
                      isCompleted ? "text-secondary" : isInProgress ? "text-primary" : "text-muted-foreground/30"
                    )}>
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div className="flex-1 p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <div className="bg-secondary/20 p-1.5 rounded-full"><CheckCircle2 className="h-5 w-5 text-secondary" /></div>
                          ) : isInProgress ? (
                            <div className="bg-primary/20 p-1.5 rounded-full"><PlayCircle className="h-5 w-5 text-primary animate-pulse" /></div>
                          ) : (
                            <div className="bg-muted/50 p-1.5 rounded-full"><Lock className="h-5 w-5 text-muted-foreground" /></div>
                          )}
                          <CardTitle className="text-2xl">{module.title}</CardTitle>
                        </div>
                        <CardDescription className="text-lg leading-relaxed max-w-3xl">
                          {module.description}
                        </CardDescription>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Badge variant={isCompleted ? "secondary" : isInProgress ? "default" : "outline"} className="px-3 py-1">
                          {module.status.replace('-', ' ')}
                        </Badge>
                        <span className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                          <Clock className="w-4 h-4" /> {module.duration}
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
                           <Link href={`/curriculum/${module.id}`}>
                             Preview Syllabus
                           </Link>
                        </Button>
                        <Button asChild size="lg" className={cn(
                          "px-8 shadow-xl transition-all duration-300",
                          isCompleted ? "bg-secondary hover:bg-secondary/90 shadow-secondary/20" : 
                          isInProgress ? "bg-primary hover:bg-primary/90 shadow-primary/20" : 
                          "bg-muted text-foreground hover:bg-muted/80"
                        )}>
                          <Link href={`/curriculum/${module.id}`} className="flex items-center gap-2">
                            {isCompleted ? "Review Lab" : isInProgress ? "Continue Learning" : "Unlock Module"}
                            <ChevronRight size={20} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}