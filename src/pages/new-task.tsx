import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Wand2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function NewTaskPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleMagicGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    try {
      // Simulate an AI parsing the intent from the prompt
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedTitle = prompt.length > 20 ? prompt.substring(0, 30) + '...' : prompt + ' Task';
      let priorityAssigned = "Medium";
      if (prompt.toLowerCase().includes("urgent") || prompt.toLowerCase().includes("asap")) priorityAssigned = "Urgent";
      else if (prompt.toLowerCase().includes("tomorrow")) priorityAssigned = "High";

      setTitle(`Generated: ${generatedTitle}`);
      setDescription(`Parsed context from user prompt:\n\n"- ${prompt}"\n\nAI Suggestion: Break this down into 3 subtasks and execute immediately.`);
      setPriority(priorityAssigned);
      
      toast.success("AI parsed intent successfully.");
    } catch (error) {
      console.error("Error calling AI endpoint:", error);
      toast.error("Failed to parse intent.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateTask = () => {
    if (!title) {
      toast.error("Please enter a task title.");
      return;
    }
    toast.success(`Task "${title}" created and added to queue!`);
    setTitle("");
    setDescription("");
    setPrompt("");
    setPriority("Medium");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Omni-Input Section */}
      <div className="relative group">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-main p-3 rounded-full shrink-0 border-2 border-border shadow-[2px_2px_0_0_var(--border)] group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[4px_4px_0_0_var(--border)] transition-all">
                <Sparkles className="text-main-foreground h-6 w-6" />
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="text-2xl font-black font-heading text-foreground uppercase tracking-tight">Omni-Input Magic Prompt</h3>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'I need to generate a client report and draft an email campaign by tomorrow...'"
                  className="w-full min-h-[120px] p-4 rounded-base border-2 border-border bg-secondary-background text-base focus:outline-none focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[4px_4px_0_0_var(--border)] shadow-[2px_2px_0_0_var(--border)] transition-all resize-none font-medium"
                />
                <div className="flex justify-end pt-2">
                  <Button 
                    onClick={handleMagicGenerate} 
                    disabled={isGenerating || !prompt}
                    className="bg-main text-main-foreground hover:bg-main font-bold uppercase tracking-widest px-8 rounded-full border-2 border-border shadow-[2px_2px_0_0_var(--border)] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[4px_4px_0_0_var(--border)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all h-12"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2"><Wand2 className="animate-spin h-5 w-5" /> Parsing Intent...</span>
                    ) : (
                      <span className="flex items-center gap-2">Auto-Fill Details <ArrowRight className="h-5 w-5" /></span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traditional Form (Parsed Details) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-black font-heading uppercase">Task Details</CardTitle>
          <CardDescription className="text-base font-medium">Review and refine the parsed task details before creating.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="font-bold flex uppercase">Task Title</Label>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g., Generate Q3 Financial Report" 
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold flex uppercase">Description & Sub-tasks</Label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[120px] p-4 rounded-base border-2 border-border bg-secondary-background text-base focus:outline-none focus:-translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0_0_var(--border)] shadow-[2px_2px_0_0_var(--border)] transition-all resize-y"
              placeholder="Provide detailed instructions..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold flex uppercase">Deadline</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label className="font-bold flex uppercase">Priority</Label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)} 
                className="w-full h-12 px-4 rounded-base border-2 border-border bg-secondary-background text-base font-medium focus:outline-none focus:-translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0_0_var(--border)] shadow-[2px_2px_0_0_var(--border)] transition-all outline-none"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between p-5 border-2 border-border shadow-[2px_2px_0_0_var(--border)] rounded-base bg-secondary-background">
            <div className="space-y-1 pr-4">
              <Label className="text-lg font-bold font-heading">Auto-Execute with AI</Label>
              <p className="text-base text-foreground/70">Let the AI handle this task autonomously.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex justify-end gap-4 pt-6 border-t-2 border-border">
            <Button variant="outline" size="lg" className="font-bold uppercase tracking-widest w-full sm:w-auto" onClick={() => {setTitle(""); setDescription(""); setPrompt("")}}>Cancel</Button>
            <Button size="lg" onClick={handleCreateTask} className="bg-[#00D696] hover:bg-[#00D696] text-black font-bold uppercase tracking-widest w-full sm:w-auto border-2 border-border shadow-[2px_2px_0_0_var(--border)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_var(--border)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all">Create Task</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
