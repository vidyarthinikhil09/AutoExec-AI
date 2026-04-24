import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Bot, Shield, Globe, Key, Trash2, Moon, Sun, Monitor } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "next-themes";

export function SettingsPage() {
  const { user, updateAvatar } = useAuth();
  const { theme, setTheme } = useTheme();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl || null);

  // Sync state if user changes externally
  useEffect(() => {
    if (user?.avatarUrl) {
      setAvatarPreview(user.avatarUrl);
    }
  }, [user?.avatarUrl]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      updateAvatar(imageUrl);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-heading font-black text-foreground uppercase tracking-tighter">Settings</h2>
        <p className="text-lg font-medium text-foreground/70 mt-1">Manage your account settings and AI preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8 items-start">
        <TabsList className="flex md:flex-col justify-start items-stretch !h-auto bg-transparent border-none p-0 gap-3 w-full md:w-64 shrink-0 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          <TabsTrigger 
            value="profile" 
            className="w-full justify-start px-4 py-4 text-left font-bold text-base data-[state=active]:bg-main data-[state=active]:text-main-foreground data-[state=active]:shadow-[4px_4px_0_0_var(--border)] rounded-base border-2 border-transparent data-[state=active]:border-border data-[state=active]:-translate-y-1 data-[state=active]:-translate-x-1 transition-all !h-auto"
          >
            <User className="mr-3 h-5 w-5 shrink-0" /> Profile
          </TabsTrigger>
          <TabsTrigger 
            value="appearance" 
            className="w-full justify-start px-4 py-4 text-left font-bold text-base data-[state=active]:bg-main data-[state=active]:text-main-foreground data-[state=active]:shadow-[4px_4px_0_0_var(--border)] rounded-base border-2 border-transparent data-[state=active]:border-border data-[state=active]:-translate-y-1 data-[state=active]:-translate-x-1 transition-all !h-auto"
          >
            <Sun className="mr-3 h-5 w-5 shrink-0" /> Appearance
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="w-full justify-start px-4 py-4 text-left font-bold text-base data-[state=active]:bg-main data-[state=active]:text-main-foreground data-[state=active]:shadow-[4px_4px_0_0_var(--border)] rounded-base border-2 border-transparent data-[state=active]:border-border data-[state=active]:-translate-y-1 data-[state=active]:-translate-x-1 transition-all !h-auto"
          >
            <Bell className="mr-3 h-5 w-5 shrink-0" /> Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="ai-preferences" 
            className="w-full justify-start px-4 py-4 text-left font-bold text-base data-[state=active]:bg-main data-[state=active]:text-main-foreground data-[state=active]:shadow-[4px_4px_0_0_var(--border)] rounded-base border-2 border-transparent data-[state=active]:border-border data-[state=active]:-translate-y-1 data-[state=active]:-translate-x-1 transition-all !h-auto"
          >
            <Bot className="mr-3 h-5 w-5 shrink-0" /> AI Preferences
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="w-full justify-start px-4 py-4 text-left font-bold text-base data-[state=active]:bg-main data-[state=active]:text-main-foreground data-[state=active]:shadow-[4px_4px_0_0_var(--border)] rounded-base border-2 border-transparent data-[state=active]:border-border data-[state=active]:-translate-y-1 data-[state=active]:-translate-x-1 transition-all !h-auto"
          >
            <Shield className="mr-3 h-5 w-5 shrink-0" /> Security
          </TabsTrigger>
          <TabsTrigger 
            value="integrations" 
            className="w-full justify-start px-4 py-4 text-left font-bold text-base data-[state=active]:bg-main data-[state=active]:text-main-foreground data-[state=active]:shadow-[4px_4px_0_0_var(--border)] rounded-base border-2 border-transparent data-[state=active]:border-border data-[state=active]:-translate-y-1 data-[state=active]:-translate-x-1 transition-all !h-auto"
          >
            <Globe className="mr-3 h-5 w-5 shrink-0" /> Integrations
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 w-full min-w-0">
          <TabsContent value="profile" className="m-0 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black font-heading uppercase">Profile Information</CardTitle>
                <CardDescription className="text-base font-medium">Update your personal details and public profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6 mb-4">
                  <div className="h-24 w-24 rounded-base bg-main flex items-center justify-center text-main-foreground text-3xl font-black border-2 border-border shadow-[4px_4px_0_0_var(--border)] overflow-hidden shrink-0">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar Preview" className="h-full w-full object-cover" />
                    ) : (
                      user ? getInitials(user.name) : "AJ"
                    )}
                  </div>
                  <div>
                    <input 
                      type="file" 
                      ref={avatarInputRef} 
                      onChange={handleAvatarChange} 
                      className="hidden" 
                      accept="image/jpeg,image/png,image/gif"
                    />
                    <Button 
                      variant="outline"
                      className="mb-2 font-bold"
                      onClick={() => avatarInputRef.current?.click()}
                    >
                      Change Avatar
                    </Button>
                    <p className="text-xs font-medium text-foreground/70 uppercase tracking-widest">JPG, GIF or PNG. Max size 800K.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-bold flex uppercase">First Name</Label>
                    <Input id="firstName" defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-bold flex uppercase">Last Name</Label>
                    <Input id="lastName" defaultValue="Johnson" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email" className="font-bold flex uppercase">Email Address</Label>
                    <Input id="email" type="email" defaultValue="alex.j@example.com" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio" className="font-bold flex uppercase">Bio</Label>
                    <textarea 
                      id="bio" 
                      className="w-full min-h-[120px] p-4 rounded-base border-2 border-border bg-secondary-background text-base focus:outline-none focus:-translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0_0_var(--border)] shadow-[2px_2px_0_0_var(--border)] transition-all resize-y"
                      placeholder="Write a few sentences about yourself..."
                      defaultValue="Product Manager at TechFlow. Passionate about AI and automation."
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t-2 border-border mt-6">
                  <Button size="lg" className="font-bold uppercase tracking-widest w-full sm:w-auto">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="m-0 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black font-heading uppercase">Appearance & Theme</CardTitle>
                <CardDescription className="text-base font-medium">Customize the look and feel of the application.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center justify-center p-6 rounded-base border-2 transition-all ${theme === 'light' ? 'border-border bg-main text-main-foreground shadow-[4px_4px_0_0_var(--border)] -translate-y-1 -translate-x-1' : 'border-border bg-secondary-background hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_var(--border)] text-foreground'} font-bold uppercase tracking-wider`}
                  >
                    <Sun size={32} className="mb-4" />
                    <span>Light Mode</span>
                  </button>
                  <button 
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center justify-center p-6 rounded-base border-2 transition-all ${theme === 'dark' ? 'border-border bg-main text-main-foreground shadow-[4px_4px_0_0_var(--border)] -translate-y-1 -translate-x-1' : 'border-border bg-secondary-background hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_var(--border)] text-foreground'} font-bold uppercase tracking-wider`}
                  >
                    <Moon size={32} className="mb-4" />
                    <span>Dark Mode</span>
                  </button>
                  <button 
                    onClick={() => setTheme("system")}
                    className={`flex flex-col items-center justify-center p-6 rounded-base border-2 transition-all ${theme === 'system' ? 'border-border bg-main text-main-foreground shadow-[4px_4px_0_0_var(--border)] -translate-y-1 -translate-x-1' : 'border-border bg-secondary-background hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_var(--border)] text-foreground'} font-bold uppercase tracking-wider`}
                  >
                    <Monitor size={32} className="mb-4" />
                    <span>System Default</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="m-0 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black font-heading uppercase">Notification Preferences</CardTitle>
                <CardDescription className="text-base font-medium">Choose what you want to be notified about.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-5 border-2 border-border shadow-[2px_2px_0_0_var(--border)] rounded-base bg-secondary-background">
                  <div className="space-y-1 pr-4">
                    <Label className="text-lg font-bold font-heading">Task Updates</Label>
                    <p className="text-base text-foreground/70">Receive notifications when a task status changes.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-5 border-2 border-border shadow-[2px_2px_0_0_var(--border)] rounded-base bg-secondary-background">
                  <div className="space-y-1 pr-4">
                    <Label className="text-lg font-bold font-heading">Agent Approvals</Label>
                    <p className="text-base text-foreground/70">Get alerted when AutoExec AI needs your approval to proceed.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-5 border-2 border-border shadow-[2px_2px_0_0_var(--border)] rounded-base bg-secondary-background">
                  <div className="space-y-1 pr-4">
                    <Label className="text-lg font-bold font-heading">Weekly Reports</Label>
                    <p className="text-base text-foreground/70">Receive a weekly summary of completed tasks.</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-preferences" className="m-0 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black font-heading uppercase">AI Agent Settings</CardTitle>
                <CardDescription className="text-base font-medium">Configure how AutoExec AI behaves and interacts with your data.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-5 border-2 border-border shadow-[2px_2px_0_0_var(--border)] rounded-base bg-secondary-background">
                  <div className="space-y-1 pr-4">
                    <Label className="text-lg font-bold font-heading">Auto-Execution</Label>
                    <p className="text-base text-foreground/70">Allow the agent to execute low-risk tasks without explicit approval.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-5 border-2 border-border shadow-[2px_2px_0_0_var(--border)] rounded-base bg-secondary-background">
                  <div className="space-y-1 pr-4">
                    <Label className="text-lg font-bold font-heading">Verbose Logging</Label>
                    <p className="text-base text-foreground/70">Show detailed step-by-step reasoning in the Agent Feed.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-5 border-2 border-border shadow-[2px_2px_0_0_var(--border)] rounded-base bg-secondary-background">
                  <div className="space-y-1 pr-4">
                    <Label className="text-lg font-bold font-heading">Proactive Scheduling</Label>
                    <p className="text-base text-foreground/70">Allow AI to automatically adjust deadlines if you fall behind.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="pt-6 border-t-2 border-border mt-6">
                  <Label className="text-xl font-bold font-heading uppercase block mb-6">AI Creativity Level</Label>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold uppercase tracking-widest text-foreground">Precise</span>
                    <input type="range" min="0" max="100" defaultValue="50" className="flex-1 accent-main h-4 bg-background border-2 border-border rounded-base appearance-none cursor-pointer shadow-[2px_2px_0_0_var(--border)]" />
                    <span className="text-sm font-bold uppercase tracking-widest text-foreground">Creative</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="m-0 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black font-heading uppercase">Security & Access</CardTitle>
                <CardDescription className="text-base font-medium">Manage your password and API keys.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-black font-heading uppercase flex items-center gap-2">
                    <Key size={20} className="text-foreground" /> API Keys
                  </h4>
                  <div className="p-4 border-2 border-border shadow-[2px_2px_0_0_var(--border)] rounded-base bg-secondary-background flex justify-between items-center">
                    <div>
                      <p className="font-bold text-base font-heading">Production API Key</p>
                      <p className="text-sm text-foreground/70 font-mono mt-1">sk-live-••••••••••••••••••••</p>
                    </div>
                    <Button variant="outline">Revoke</Button>
                  </div>
                  <Button variant="outline" className="w-full border-dashed font-bold uppercase">Generate New Key</Button>
                </div>
                
                <div className="pt-8 border-t-2 border-border space-y-4">
                  <h4 className="text-lg font-black font-heading uppercase text-destructive flex items-center gap-2">
                    <Trash2 size={20} /> Danger Zone
                  </h4>
                  <div className="p-5 border-4 border-destructive rounded-base bg-destructive/10 shadow-[4px_4px_0_0_#ff0505]">
                    <h5 className="font-bold text-lg font-heading text-destructive uppercase">Delete Account</h5>
                    <p className="text-base font-medium text-foreground mt-1 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                    <Button variant="destructive" className="font-bold uppercase tracking-widest">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="m-0 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black font-heading uppercase">Connected Apps</CardTitle>
                <CardDescription className="text-base font-medium">Manage third-party integrations and connected services.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border-2 border-border shadow-[2px_2px_0_0_var(--border)] rounded-base bg-secondary-background">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-white rounded-base border-2 border-border shadow-[2px_2px_0_0_var(--border)] flex items-center justify-center p-2.5 shrink-0">
                      <svg viewBox="0 0 24 24" className="w-full h-full"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-lg font-heading">Google Workspace</h5>
                      <p className="text-sm font-medium text-foreground/70">Connected to alex.j@example.com</p>
                    </div>
                  </div>
                  <Button variant="outline">Disconnect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border-2 border-border shadow-[2px_2px_0_0_var(--border)] rounded-base bg-secondary-background">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-[#4A154B] rounded-base border-2 border-border shadow-[2px_2px_0_0_var(--border)] flex items-center justify-center p-2.5 shrink-0">
                      <svg viewBox="0 0 24 24" className="w-full h-full" fill="white"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.523-2.522v-2.522h2.523zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.523-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.52H15.165z"/></svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-lg font-heading">Slack</h5>
                      <p className="text-sm font-medium text-foreground/70">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" className="font-bold uppercase tracking-widest mt-0 max-sm:mt-2">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
