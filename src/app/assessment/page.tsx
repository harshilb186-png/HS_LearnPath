
"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  Target, 
  Briefcase, 
  Code, 
  ArrowRight, 
  Lightbulb, 
  Loader2,
  CheckCircle2,
  ShieldAlert
} from "lucide-react";
import { assessUserSkills, AssessUserSkillsOutput } from "@/ai/flows/assess-user-skills";
import { cn } from "@/lib/utils";

export default function AssessmentPage() {
  const [currentSkills, setCurrentSkills] = useState("");
  const [careerPath, setCareerPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AssessUserSkillsOutput | null>(null);

  const handleAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSkills || !careerPath) return;

    setIsLoading(true);
    try {
      const assessment = await assessUserSkills({ currentSkills, careerPath });
      setResult(assessment);
    } catch (error) {
      console.error("Assessment failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl space-y-8">
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="secondary" className="px-4 py-1 text-sm font-bold uppercase tracking-widest">
            AI Skill Assessment
          </Badge>
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Map Your Path to <span className="text-primary">Success</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Our AI analysis compares your current toolkit with industry benchmarks for your dream career path.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="text-primary" /> Your Profile
              </CardTitle>
              <CardDescription>
                Tell us where you are and where you want to go.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAssessment} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="career" className="flex items-center gap-2">
                    <Briefcase size={16} /> Desired Career Path
                  </Label>
                  <Input 
                    id="career"
                    placeholder="e.g. Senior Frontend Engineer, Cloud Architect..."
                    value={careerPath}
                    onChange={(e) => setCareerPath(e.target.value)}
                    className="border-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills" className="flex items-center gap-2">
                    <Code size={16} /> Current Skills & Experience
                  </Label>
                  <Textarea 
                    id="skills"
                    placeholder="List your technologies, tools, and years of experience..."
                    rows={6}
                    value={currentSkills}
                    onChange={(e) => setCurrentSkills(e.target.value)}
                    className="resize-none border-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading || !currentSkills || !careerPath}
                  className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Your Potential...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Career Map
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {!result && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4 bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
                <div className="bg-background p-4 rounded-full shadow-sm">
                  <Lightbulb className="h-12 w-12 text-secondary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline text-xl font-bold">Ready to Level Up?</h3>
                  <p className="text-muted-foreground">
                    Complete the form on the left to receive a personalized skill gap analysis and actionable learning suggestions.
                  </p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="space-y-6 animate-pulse">
                <div className="h-32 bg-muted rounded-xl" />
                <div className="h-64 bg-muted rounded-xl" />
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <Card className="border-secondary/20 bg-secondary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Overall Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {result.overallAssessment}
                    </p>
                  </CardContent>
                </Card>

                <h3 className="font-headline text-xl font-bold flex items-center gap-2 px-2">
                  <ShieldAlert className="text-secondary" /> Identified Skill Gaps
                </h3>

                <div className="space-y-4">
                  {result.skillGaps.map((gap, idx) => (
                    <Card key={idx} className="group hover:border-secondary transition-colors overflow-hidden">
                      <div className="bg-secondary/10 px-4 py-2 border-b flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-secondary">Skill Gap #{idx + 1}</span>
                        <Badge variant="outline" className="bg-white">{gap.skillName}</Badge>
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <p className="text-sm font-medium">{gap.description}</p>
                        <div className="space-y-2">
                          <p className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                            <Lightbulb size={12} /> Improvement Steps
                          </p>
                          <ul className="space-y-2">
                            {gap.suggestions.map((suggestion, sIdx) => (
                              <li key={sIdx} className="text-sm text-muted-foreground flex gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="p-4 bg-primary text-white rounded-xl flex items-center justify-between shadow-lg">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase opacity-80">Recommended Next Step</p>
                    <p className="font-bold">Start: {result.skillGaps[0]?.skillName}</p>
                  </div>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/curriculum" className="gap-2">
                      Go to Courses <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Badge({ children, variant = "default", className }: { children: React.ReactNode, variant?: "default" | "secondary" | "outline", className?: string }) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-border text-foreground"
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold inline-block", variants[variant], className)}>
      {children}
    </span>
  );
}
