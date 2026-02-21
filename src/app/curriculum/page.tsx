
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { MOCK_CURRICULUM } from "@/lib/curriculum-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, PlayCircle, BookOpen, ChevronRight, Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CurriculumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        <header className="space-y-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-headline text-3xl font-bold">{MOCK_CURRICULUM.title}</h1>
              <p className="text-muted-foreground">Target Role: <span className="text-primary font-medium">{MOCK_CURRICULUM.careerPath}</span></p>
            </div>
            <div className="bg-card border p-4 rounded-xl flex items-center gap-6 min-w-[200px]">
              <div className="space-y-1 flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Completion</p>
                <p className="text-xl font-bold">{MOCK_CURRICULUM.totalProgress}%</p>
                <Progress value={MOCK_CURRICULUM.totalProgress} className="h-1.5" />
              </div>
              <div className="h-12 w-12 rounded-full border-4 border-secondary flex items-center justify-center font-bold text-secondary">
                {MOCK_CURRICULUM.modules.filter(m => m.status === 'completed').length}/{MOCK_CURRICULUM.modules.length}
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {MOCK_CURRICULUM.modules.map((module, index) => {
            const isCompleted = module.status === 'completed';
            const isInProgress = module.status === 'in-progress';
            const isRemaining = module.status === 'remaining';
            
            return (
              <Card 
                key={module.id} 
                className={cn(
                  "transition-all duration-300",
                  isInProgress ? "border-primary shadow-md scale-[1.01]" : "opacity-90 grayscale-[0.2]"
                )}
              >
                <div className="flex flex-col md:flex-row">
                  <div className={cn(
                    "md:w-16 flex items-center justify-center p-4 border-b md:border-b-0 md:border-r",
                    isCompleted ? "bg-secondary/10" : isInProgress ? "bg-primary/10" : "bg-muted"
                  )}>
                    <div className="text-2xl font-headline font-bold text-muted-foreground/50">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-secondary" />
                          ) : isInProgress ? (
                            <PlayCircle className="h-5 w-5 text-primary animate-pulse" />
                          ) : (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          )}
                          <CardTitle className="text-xl">{module.title}</CardTitle>
                        </div>
                        <CardDescription className="max-w-2xl">{module.description}</CardDescription>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={isCompleted ? "secondary" : isInProgress ? "default" : "outline"}>
                          {module.status.replace('-', ' ')}
                        </Badge>
                        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                          {module.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                      <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary">
                         <Link href={`/curriculum/${module.id}`}>
                           View Module
                         </Link>
                      </Button>
                      <Button asChild className={cn(
                        isInProgress ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
                      )}>
                        <Link href={`/curriculum/${module.id}`} className="flex items-center gap-2">
                          {isCompleted ? "Review" : isInProgress ? "Continue Lesson" : "Start Now"}
                          <ChevronRight size={18} />
                        </Link>
                      </Button>
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
