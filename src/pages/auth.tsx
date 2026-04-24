import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../contexts/AuthContext";
import { Bot, ArrowRight, Github } from "lucide-react";

export function AuthPage() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      login();
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left Side - Branding & Illustration */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-main p-12 relative overflow-hidden border-r-4 border-border">
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-background p-2 rounded-base border-2 border-border shadow-[4px_4px_0_0_var(--border)]">
            <Bot size={32} className="text-foreground" />
          </div>
          <span className="text-3xl font-heading font-black tracking-tight text-main-foreground">AutoExec</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-heading font-black mb-6 leading-tight text-main-foreground">
            Automate your workflow with brutal efficiency.
          </h1>
          <p className="text-lg font-medium text-main-foreground/90 mb-8 max-w-sm">
            Delegate tasks, manage approvals, and let AI handle the heavy lifting while you focus on what matters.
          </p>
          
          <div className="flex items-center gap-4 text-sm font-bold text-main-foreground">
            <div className="flex -space-x-3">
              <img className="w-12 h-12 rounded-base border-2 border-border shadow-[2px_2px_0_0_var(--border)] relative z-[3]" src="https://i.pravatar.cc/100?img=1" alt="User" referrerPolicy="no-referrer" />
              <img className="w-12 h-12 rounded-base border-2 border-border shadow-[2px_2px_0_0_var(--border)] relative z-[2]" src="https://i.pravatar.cc/100?img=2" alt="User" referrerPolicy="no-referrer" />
              <img className="w-12 h-12 rounded-base border-2 border-border shadow-[2px_2px_0_0_var(--border)] relative z-[1]" src="https://i.pravatar.cc/100?img=3" alt="User" referrerPolicy="no-referrer" />
            </div>
            <p className="uppercase tracking-widest bg-background px-3 py-1 border-2 border-border rounded-base shadow-[2px_2px_0_0_var(--border)]">Join 10k+ teams</p>
          </div>
        </div>

        <div className="relative z-10 text-sm font-bold text-main-foreground/70 uppercase tracking-widest">
          © 2026 AutoExec
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 relative bg-background">
        <div className="w-full max-w-md space-y-8 bg-secondary-background p-8 rounded-base border-2 border-border shadow-[8px_8px_0_0_var(--border)]">
          <div className="text-center md:text-left">
            <div className="md:hidden flex justify-center mb-6">
              <div className="bg-main p-3 rounded-base border-2 border-border shadow-[4px_4px_0_0_var(--border)]">
                <Bot size={32} className="text-main-foreground" />
              </div>
            </div>
            <h2 className="text-4xl font-heading font-black text-foreground mb-3 uppercase tracking-tighter">
              {isLogin ? "Welcome back" : "Get Started"}
            </h2>
            <p className="font-medium text-foreground/70">
              {isLogin 
                ? "Enter your credentials to access your dashboard." 
                : "Sign up to start automating your tasks today."}
            </p>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full h-12">
              <Github className="mr-2 h-5 w-5" />
              Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full h-12">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-border" />
            </div>
            <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
              <span className="bg-secondary-background px-4 text-foreground">
                Or
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="font-bold flex uppercase">Full Name</Label>
                <Input id="name" placeholder="Alex Johnson" required className="h-12" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold flex uppercase">Email address</Label>
              <Input id="email" type="email" placeholder="alex@example.com" required className="h-12" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-bold flex uppercase">Password</Label>
                {isLogin && (
                  <a href="#" className="text-xs font-bold text-main hover:underline uppercase tracking-wider">
                    Forgot password?
                  </a>
                )}
              </div>
              <Input id="password" type="password" required className="h-12" />
            </div>
            
            <Button type="submit" size="lg" className="w-full font-bold uppercase tracking-wider mt-4">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <p className="text-center text-sm font-medium text-foreground mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-main hover:underline uppercase tracking-wider"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
