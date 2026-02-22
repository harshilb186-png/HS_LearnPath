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
  MoreVertical
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
      
      // We set timeout to ensure the video element is rendered before attaching the stream
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
        description: 'Please enable camera and microphone permissions in your browser.',
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {!isJoined ? (
          <div className="flex-1 flex items-center justify-center p-4 hero-gradient">
            <Card className="max-w-xl w-full glass-card border-primary/20 shadow-2xl rounded-3xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse" />
              <CardHeader className="text-center space-y-4 pt-10">
                <div className="mx-auto bg-primary/20 w-20 h-20 rounded-3xl flex items-center justify-center mb-2">
                  <Video className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-3xl font-headline font-bold">Live Learning Lounge</CardTitle>
                  <CardDescription className="text-lg">
                    Real-time collaboration for HS LearnPath+ students and teachers.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 pb-10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Active Session</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold">12 Participants</Badge>
                  </div>
                  <h3 className="font-bold text-xl">Cloud Infrastructure & DevOps Workshop</h3>
                  <div className="flex -space-x-3 overflow-hidden">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-background bg-muted overflow-hidden">
                        <img src={`https://picsum.photos/seed/${i + 100}/80/80`} alt="user" />
                      </div>
                    ))}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 ring-4 ring-background">
                      <span className="text-xs font-bold text-primary">+7</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={handleJoin}
                    className="col-span-2 bg-primary hover:bg-primary/90 py-8 text-xl font-bold shadow-xl shadow-primary/20 rounded-2xl transition-all hover:scale-[1.02]"
                  >
                    <Video className="mr-2 h-6 w-6" />
                    Join Now
                  </Button>
                  <Button variant="outline" className="py-6 border-white/10 hover:bg-white/5 rounded-xl font-bold">
                    Schedule for Later
                  </Button>
                  <Button variant="outline" className="py-6 border-white/10 hover:bg-white/5 rounded-xl font-bold">
                    Invite Peers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex-1 relative bg-black flex flex-col md:flex-row">
            {/* Primary Video Area */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center">
              <video 
                ref={videoRef} 
                className={cn(
                  "w-full h-full object-cover md:object-contain",
                  isVideoOff && "hidden"
                )} 
                autoPlay 
                muted 
              />
              
              {isVideoOff && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
                  <div className="w-40 h-40 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <UserIcon size={80} className="text-primary/40" />
                  </div>
                  <p className="text-white font-bold text-xl">{user?.email?.split('@')[0]}</p>
                </div>
              )}

              {/* Participants Sidebar (Desktop Overlay) */}
              <div className="absolute top-6 right-6 bottom-24 hidden md:flex flex-col gap-4 w-64 pointer-events-none">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-video bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden pointer-events-auto group relative">
                    <img src={`https://picsum.photos/seed/${i + 200}/320/180`} className="w-full h-full object-cover" alt="participant" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded-md text-[10px] text-white font-bold">
                      Peer {i}
                    </div>
                  </div>
                ))}
              </div>

              {/* Meeting Info Overlay */}
              <div className="absolute top-6 left-6 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-white flex items-center gap-4">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Live Workshop</p>
                  <p className="font-bold">Cloud Infrastructure Deep Dive</p>
                </div>
                <div className="h-8 w-px bg-white/10 mx-2" />
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-muted-foreground" />
                  <span className="text-xs font-bold">14 Online</span>
                </div>
              </div>

              {/* Controls Bar */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-zinc-900/80 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 shadow-2xl">
                <Button 
                  size="icon" 
                  variant={isMuted ? "destructive" : "ghost"} 
                  onClick={() => setIsMuted(!isMuted)}
                  className="rounded-2xl h-12 w-12"
                >
                  <Mic size={20} />
                </Button>
                <Button 
                  size="icon" 
                  variant={isVideoOff ? "destructive" : "ghost"} 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className="rounded-2xl h-12 w-12"
                >
                  <Video size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-2xl h-12 w-12">
                  <Monitor size={20} />
                </Button>
                <div className="w-px h-8 bg-white/10 mx-2" />
                <Button size="icon" variant="ghost" className="rounded-2xl h-12 w-12">
                  <MessageSquare size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-2xl h-12 w-12">
                  <MoreVertical size={20} />
                </Button>
                <div className="w-px h-8 bg-white/10 mx-2" />
                <Button 
                  variant="destructive" 
                  onClick={handleLeave}
                  className="rounded-2xl h-12 px-6 font-bold flex items-center gap-2"
                >
                  <PhoneOff size={20} />
                  Leave
                </Button>
              </div>
            </div>

            {/* Mobile Participants Horizontal Scroll */}
            <div className="md:hidden h-24 bg-zinc-950 border-t border-white/5 flex items-center gap-3 px-4 overflow-x-auto">
               {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-16 aspect-video bg-zinc-900 rounded-lg border border-white/10 shrink-0 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${i + 200}/160/90`} className="w-full h-full object-cover" alt="participant" />
                  </div>
               ))}
            </div>
          </div>
        )}
      </main>

      {hasCameraPermission === false && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6">
          <Card className="max-w-md w-full glass-card border-destructive/20 text-center space-y-6 p-8">
            <div className="mx-auto bg-destructive/20 w-16 h-16 rounded-full flex items-center justify-center">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Camera Access Required</h2>
              <p className="text-muted-foreground">
                To join the Live Lounge, please enable camera and microphone permissions in your browser settings.
              </p>
            </div>
            <Button onClick={() => window.location.reload()} className="w-full bg-primary py-6 font-bold">
              Try Again
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
