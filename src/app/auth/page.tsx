
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Navbar } from '@/components/layout/Navbar';
import { Loader2, GraduationCap, Briefcase, ShieldCheck, Mail, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'Student' | 'Teacher' | 'Admin'>('Student');
  
  const router = useRouter();
  const db = useFirestore();
  const auth = getAuth();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Initialize user profile in Firestore
      const userRef = doc(db, 'users', user.uid);
      const profileData = {
        id: user.uid,
        username: username || email.split('@')[0],
        email: email,
        role: role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setDoc(userRef, profileData)
        .catch((err) => {
          const permissionError = new FirestorePermissionError({
            path: userRef.path,
            operation: 'create',
            requestResourceData: profileData,
          });
          errorEmitter.emit('permission-error', permissionError);
        });

      toast({
        title: "Account created!",
        description: `Welcome to HS LearnPath+ as a ${role}.`,
      });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background hero-gradient">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-card border-white/10 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto bg-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-2">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline font-bold tracking-tight">
              HS LearnPath<span className="text-primary">+</span>
            </CardTitle>
            <CardDescription>
              Your personal AI-powered career navigator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/5 p-1 rounded-full">
                <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Login</TabsTrigger>
                <TabsTrigger value="register" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="name@example.com" 
                        className="pl-10 bg-white/5 border-white/10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type="password" 
                        className="pl-10 bg-white/5 border-white/10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="reg-username" 
                        placeholder="johndoe" 
                        className="pl-10 bg-white/5 border-white/10"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="reg-email" 
                        type="email" 
                        placeholder="name@example.com" 
                        className="pl-10 bg-white/5 border-white/10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="reg-password" 
                        type="password" 
                        className="pl-10 bg-white/5 border-white/10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label>I am a...</Label>
                    <RadioGroup 
                      defaultValue="Student" 
                      onValueChange={(v) => setRole(v as any)}
                      className="grid grid-cols-3 gap-2"
                    >
                      <div>
                        <RadioGroupItem value="Student" id="role-student" className="peer sr-only" />
                        <Label
                          htmlFor="role-student"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white/5 p-4 hover:bg-white/10 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                        >
                          <GraduationCap className="mb-2 h-6 w-6" />
                          <span className="text-xs font-semibold">Student</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="Teacher" id="role-teacher" className="peer sr-only" />
                        <Label
                          htmlFor="role-teacher"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white/5 p-4 hover:bg-white/10 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                        >
                          <Briefcase className="mb-2 h-6 w-6" />
                          <span className="text-xs font-semibold">Teacher</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="Admin" id="role-admin" className="peer sr-only" />
                        <Label
                          htmlFor="role-admin"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white/5 p-4 hover:bg-white/10 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                        >
                          <ShieldCheck className="mb-2 h-6 w-6" />
                          <span className="text-xs font-semibold">Admin</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 mt-4" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="justify-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service.
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
