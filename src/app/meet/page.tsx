"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Video, 
  Mic, 
  PhoneOff, 
  Users, 
  MessageSquare, 
  ShieldAlert, 
  Sparkles,
  Monitor,
  Layout,
  MoreVertical,
  User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/firebase";
import { Badge } from "@/components/ui/badge";

export default function MeetPage() {
  const [isJoined, setIsJoined] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const { user } = useUser();

  const handleJoin = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setHasCameraPermission(true);
      setIsJoined(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);

      toast({
        title: "Meeting Started",
        description: "You've joined the live learning lounge.",
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Hardware Access Denied',
        description: 'Please enable camera and microphone permissions.',
      });
    }
  };

  const handleLeave = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsJoined(false);
    setHasCameraPermission(null);
    toast({
      title: "Left Meeting",
      description: "Session ended successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background hero-glow">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {!isJoined ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <Card className="max-w-xl w-full glass-card border-primary/20 shadow-2xl rounded-[2.5rem] overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary animate-pulse" />
              <CardHeader className="text-center space-y-4 pt-10 px-8">
                <div className="mx-auto icon-plate purple h-20 w-20">
                  <Video className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-4xl font-headline font-bold text-white">Live Workshop</CardTitle>
                  <CardDescription className="text-lg">
                    Real-time collaboration for HS LearnPath+ creators.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 pb-10 px-8">
                <div className="bg-secondary/60 border border-white/5 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Room Active</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold border-white/10 text-muted-foreground">12 Joined</Badge>
                  </div>
                  <h3 className="font-bold text-2xl text-white">Cloud Architecture deep-dive</h3>
                  <div className="flex -space-x-3 overflow-hidden">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-secondary bg-zinc-800 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${i + 100}/80/80`} alt="user" />
                      </div>
                    ))}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 ring-4 ring-secondary border border-primary/20">
                      <span className="text-xs font-bold text-primary">+7</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={handleJoin}
                    className="col-span-2 bg-primary hover:bg-primary/90 py-8 text-xl font-bold shadow-xl shadow-primary/20 rounded-2xl cyber-button"
                  >
                    <Video className="mr-2 h-6 w-6" />
                    Join Workshop
                  </Button>
                  <Button variant="outline" className="py-7 border-white/10 hover:bg-white/5 rounded-2xl font-bold text-muted-foreground">
                    Invite Peers
                  </Button>
                  <Button variant="outline" className="py-7 border-white/10 hover:bg-white/5 rounded-2xl font-bold text-muted-foreground">
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex-1 relative bg-black flex flex-col md:flex-row">
            {/* Primary Video Area */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-secondary/20">
              <video 
                ref={videoRef} 
                className={cn(
                  "w-full h-full object-cover md:object-contain transition-opacity duration-700",
                  isVideoOff ? "opacity-0" : "opacity-100"
                )} 
                autoPlay 
                muted 
              />
              
              {isVideoOff && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background">
                  <div className="icon-plate purple h-40 w-40 rounded-full mb-4">
                    <UserIcon size={80} className="opacity-50" />
                  </div>
                  <p className="text-white font-headline font-bold text-2xl tracking-tight">{user?.email?.split('@')[0]}</p>
                </div>
              )}

              {/* Participants Sidebar */}
              <div className="absolute top-8 right-8 bottom-24 hidden md:flex flex-col gap-6 w-64">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-video glass-card rounded-2xl border-white/10 overflow-hidden relative group">
                    <img src={`https://picsum.photos/seed/${i + 200}/320/180`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="participant" />
                    <div className="absolute bottom-2 left-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] text-white font-bold uppercase tracking-widest border border-white/5">
                      Peer {i}
                    </div>
                  </div>
                ))}
              </div>

              {/* Meeting Info Overlay */}
              <div className="absolute top-8 left-8 p-5 glass-card rounded-2xl border-white/10 text-white flex items-center gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Active Session</p>
                  <p className="font-headline font-bold text-lg">Infrastructure Deep Dive</p>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="flex items-center gap-3">
                   <div className="icon-plate blue p-2 h-10 w-10">
                    <Users size={16} />
                   </div>
                  <span className="text-xs font-bold uppercase tracking-widest">14 Online</span>
                </div>
              </div>

              {/* Controls Bar */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 glass-card p-4 rounded-[2rem] border-white/10 shadow-2xl">
                <Button 
                  size="icon" 
                  variant={isMuted ? "destructive" : "ghost"} 
                  onClick={() => setIsMuted(!isMuted)}
                  className="rounded-2xl h-14 w-14 bg-secondary/80 hover:bg-white/10"
                >
                  <Mic size={22} className={cn(isMuted ? "text-white" : "text-accent")} />
                </Button>
                <Button 
                  size="icon" 
                  variant={isVideoOff ? "destructive" : "ghost"} 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className="rounded-2xl h-14 w-14 bg-secondary/80 hover:bg-white/10"
                >
                  <Video size={22} className={cn(isVideoOff ? "text-white" : "text-primary")} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-2xl h-14 w-14 bg-secondary/80 hover:bg-white/10">
                  <Monitor size={22} className="text-muted-foreground" />
                </Button>
                <div className="w-px h-10 bg-white/10 mx-2" />
                <Button size="icon" variant="ghost" className="rounded-2xl h-14 w-14 bg-secondary/80 hover:bg-white/10">
                  <MessageSquare size={22} className="text-muted-foreground" />
                </Button>
                <div className="w-px h-10 bg-white/10 mx-2" />
                <Button 
                  variant="destructive" 
                  onClick={handleLeave}
                  className="rounded-2xl h-14 px-8 font-bold flex items-center gap-3 shadow-lg shadow-destructive/20"
                >
                  <PhoneOff size={22} />
                  Leave Room
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {hasCameraPermission === false && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6">
          <Card className="max-w-md w-full glass-card border-destructive/20 text-center space-y-8 p-10 rounded-[2.5rem]">
            <div className="icon-plate blue h-20 w-20 mx-auto">
              <ShieldAlert className="h-10 w-10 text-destructive" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-headline font-bold text-white">Access Required</h2>
              <p className="text-muted-foreground leading-relaxed">
                To join the workshop, please enable camera and microphone permissions in your browser.
              </p>
            </div>
            <Button onClick={() => window.location.reload()} className="w-full bg-primary py-7 font-bold cyber-button rounded-2xl">
              Retry Access
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
