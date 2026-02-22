"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Sparkles, 
  Target, 
  Briefcase, 
  Code, 
  ArrowRight, 
  Lightbulb, 
  Loader2,
  ShieldAlert,
  Video,
  Mic,
  PhoneOff,
  Users
} from "lucide-react";
import Link from "next/link";
import { assessUserSkills, AssessUserSkillsOutput } from "@/ai/flows/assess-user-skills";
import { cn } from "@/lib/utils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/firebase";
import { Badge } from "@/components/ui/badge";

export default function AssessmentPage() {
  const [currentSkills, setCurrentSkills] = useState("");
  const [careerPath, setCareerPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AssessUserSkillsOutput | null>(null);
  
  // Meet State
  const [isMeetActive, setIsMeetActive] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const { user } = useUser();

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

  const toggleMeet = async () => {
    if (isMeetActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsMeetActive(false);
      setHasCameraPermission(null);
      return;
    }

    setIsMeetActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setHasCameraPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      toast({
        title: "Joined Meeting",
        description: "You are now live in the Career Lounge.",
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings to use this feature.',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background hero-glow">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content: Assessment & Results */}
          <div className="lg:col-span-8 space-y-8">
            <header className="text-center lg:text-left space-y-4">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 px-4 py-1 text-sm font-bold uppercase tracking-widest">
                AI Skill Assessment
              </Badge>
              <h1 className="font-headline text-4xl font-bold tracking-tight text-white">
                Map Your Path to <span className="text-primary italic">Success</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Our AI analysis compares your current toolkit with industry benchmarks for your dream career path.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <Card className="glass-card border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="icon-plate purple p-2">
                      <Target size={20} />
                    </div> 
                    Your Profile
                  </CardTitle>
                  <CardDescription>
                    Tell us where you are and where you want to go.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAssessment} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="career" className="flex items-center gap-2 text-white">
                        <Briefcase size={16} className="text-accent" /> Desired Career Path
                      </Label>
                      <Input 
                        id="career"
                        placeholder="e.g. Senior Frontend Engineer..."
                        value={careerPath}
                        onChange={(e) => setCareerPath(e.target.value)}
                        className="bg-secondary/40 border-white/10 focus:border-primary h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills" className="flex items-center gap-2 text-white">
                        <Code size={16} className="text-accent" /> Current Skills & Experience
                      </Label>
                      <Textarea 
                        id="skills"
                        placeholder="List your technologies..."
                        rows={6}
                        value={currentSkills}
                        onChange={(e) => setCurrentSkills(e.target.value)}
                        className="bg-secondary/40 border-white/10 focus:border-primary resize-none"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isLoading || !currentSkills || !careerPath}
                      className="w-full bg-primary hover:bg-primary/90 py-7 text-lg font-bold cyber-button rounded-2xl"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing Potential...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Generate Map
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {!result && !isLoading && (
                  <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4 glass-card border-dashed border-white/10 rounded-2xl">
                    <div className="icon-plate blue h-16 w-16 mb-2">
                      <Lightbulb className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-headline text-xl font-bold text-white">Ready to Level Up?</h3>
                      <p className="text-muted-foreground">
                        Complete the form to receive a personalized skill gap analysis.
                      </p>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="space-y-6 animate-pulse">
                    <div className="h-32 bg-white/5 rounded-xl" />
                    <div className="h-64 bg-white/5 rounded-xl" />
                  </div>
                )}

                {result && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Card className="border-primary/20 bg-primary/5 rounded-2xl">
                      <CardHeader>
                        <CardTitle className="text-lg text-primary">AI Assessment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground italic">
                          {result.overallAssessment}
                        </p>
                      </CardContent>
                    </Card>

                    <h3 className="font-headline text-xl font-bold flex items-center gap-2 px-2 text-white">
                      <div className="icon-plate blue p-1.5"><ShieldAlert size={16} /></div> Identified Gaps
                    </h3>

                    <div className="space-y-4">
                      {result.skillGaps.map((gap, idx) => (
                        <Card key={idx} className="glass-card hover:border-primary/40 transition-all rounded-2xl">
                          <div className="bg-secondary/40 px-4 py-2 border-b flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Gap #{idx + 1}</span>
                            <Badge variant="outline" className="border-accent/20 text-accent">{gap.skillName}</Badge>
                          </div>
                          <CardContent className="p-4 space-y-3">
                            <p className="text-sm font-medium text-white">{gap.description}</p>
                            <div className="space-y-2">
                              <p className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                                <Lightbulb size={12} className="text-accent" /> Steps to Improve
                              </p>
                              <ul className="space-y-2">
                                {gap.suggestions.map((suggestion, sIdx) => (
                                  <li key={sIdx} className="text-sm text-muted-foreground flex gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="p-6 bg-primary text-white rounded-2xl flex items-center justify-between shadow-xl shadow-primary/20">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase opacity-80">Next Step</p>
                        <p className="font-bold text-lg">Master: {result.skillGaps[0]?.skillName}</p>
                      </div>
                      <Button variant="secondary" size="lg" asChild className="rounded-full shadow-lg font-bold">
                        <Link href="/curriculum" className="gap-2">
                          Go to Courses <ArrowRight size={18} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: Meet Feature */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="glass-card border-primary/20 sticky top-24 overflow-hidden rounded-3xl">
              <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-destructive/20 text-destructive border-destructive/30 animate-pulse">
                    LIVE
                  </Badge>
                  <Users className="text-accent h-5 w-5" />
                </div>
                <CardTitle className="font-headline text-2xl text-white">Career Lounge</CardTitle>
                <CardDescription>
                  Join live discussions with teachers and peers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-secondary/80 border border-white/5">
                  <video 
                    ref={videoRef} 
                    className={cn(
                      "w-full h-full object-cover",
                      !isMeetActive && "hidden"
                    )} 
                    autoPlay 
                    muted 
                  />
                  
                  {!isMeetActive ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                      <div className="icon-plate blue opacity-50">
                        <Video className="h-8 w-8" />
                      </div>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Lounge Offline</p>
                    </div>
                  ) : hasCameraPermission === false ? (
                    <Alert variant="destructive" className="absolute inset-0 flex flex-col items-center justify-center m-4 bg-destructive/10 border-destructive/20">
                      <AlertTitle className="text-center font-bold">Camera Denied</AlertTitle>
                      <AlertDescription className="text-center text-xs">
                        Enable permissions to join.
                      </AlertDescription>
                    </Alert>
                  ) : null}

                  {isMeetActive && hasCameraPermission && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10">
                      <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/20">
                        <Mic size={18} className="text-white" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={toggleMeet} className="rounded-full shadow-lg">
                        <PhoneOff size={18} />
                      </Button>
                    </div>
                  )}
                </div>

                {!isMeetActive ? (
                  <Button 
                    onClick={toggleMeet}
                    className="w-full bg-primary hover:bg-primary/90 py-7 text-lg font-bold shadow-xl shadow-primary/20 rounded-2xl cyber-button"
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Enter Lounge
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/60 rounded-2xl border border-white/5 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Active Workshop</p>
                      <p className="text-sm font-medium text-white">Interview Prep & Portfolio Review</p>
                      <div className="flex items-center gap-2 pt-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-secondary overflow-hidden">
                              <img src={`https://picsum.photos/seed/${i + 50}/32/32`} alt="user" />
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">+12 active</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={toggleMeet}
                      className="w-full border-white/10 hover:bg-white/5 py-6 font-bold rounded-xl"
                    >
                      Exit Room
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
