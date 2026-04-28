import { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";

interface LogEntry {
  id: number;
  time: string;
  status: "ok" | "working" | "error" | "info" | "none";
  text: string;
}

const SEQUENCE = [
  { action: "type", status: "info", text: "Receiving intent from orchestrator..." },
  { action: "type", status: "working", text: "Initializing scraper environment..." },
  { action: "replace", status: "ok", text: "Scraper initialized and assigned IP" },
  { action: "type", status: "working", text: "Parsing DOM structure..." },
  { action: "replace", status: "ok", text: "DOM parsed (2,408 nodes extracted)" },
  { action: "type", status: "working", text: "Extracting terms using defined schema..." },
  { action: "replace", status: "ok", text: "Extraction complete: 3 keys found" },
  { action: "type", status: "working", text: "Synthesizing payload for external CRM..." },
  { action: "replace", status: "ok", text: "Payload synthesis complete" },
  { action: "type", status: "working", text: "Drafting manual approval request..." },
  { action: "replace", status: "ok", text: "Workflow paused. Awaiting human approval." },
];

export function AgentFeed() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [activeText, setActiveText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, activeText]);

  useEffect(() => {
    if (currentIndex >= SEQUENCE.length) return;

    const step = SEQUENCE[currentIndex];
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (step.action === "replace") {
      // Instantly replace the last log
      setLogs(prev => {
        const newLogs = [...prev];
        if (newLogs.length > 0) {
          newLogs[newLogs.length - 1] = {
            ...newLogs[newLogs.length - 1],
            status: step.status as any,
            text: step.text,
          };
        }
        return newLogs;
      });
      
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 500); // Small pause after replacing before next action
      return () => clearTimeout(timer);
    } 
    
    if (step.action === "type") {
      setCurrentTime(now);
      let charIndex = 0;
      let typingTimer: NodeJS.Timeout;

      const typeChar = () => {
        // We type out characters one by one
        setActiveText(step.text.substring(0, charIndex));
        charIndex++;
        
        if (charIndex <= step.text.length) {
          typingTimer = setTimeout(typeChar, Math.random() * 30 + 10);
        } else {
          // Finished typing this step
          const pauseTimer = setTimeout(() => {
            setLogs(prev => [
              ...prev,
              {
                id: Date.now() + currentIndex,
                time: now,
                status: step.status as any,
                text: step.text
              }
            ]);
            setActiveText("");
            setCurrentIndex(prev => prev + 1);
          }, step.status === "working" ? 1200 : 400); // longer pause if "working"
        }
      };

      typeChar();
      return () => clearTimeout(typingTimer);
    }
  }, [currentIndex]);

  const getStatusTag = (status: string) => {
    switch (status) {
      case "working": return <span className="text-chart-1 font-bold mr-2 animate-pulse">[..]</span>;
      case "ok": return <span className="text-[#00D696] font-bold mr-2">[OK]</span>;
      case "error": return <span className="text-destructive font-bold mr-2">[!!]</span>;
      case "info": return <span className="text-chart-2 font-bold mr-2">[i]</span>;
      default: return null;
    }
  };

  return (
    <div className="bg-[#111111] border-2 border-border rounded-base shadow-[4px_4px_0_0_var(--border)] overflow-hidden flex flex-col h-[320px] mb-6 transition-all">
      {/* Terminal Header */}
      <div className="bg-background px-4 py-3 flex items-center gap-2 border-b-2 border-border">
        <Terminal size={16} className="text-foreground" />
        <span className="text-xs font-bold font-heading text-foreground tracking-wider uppercase">
          Autonomous Agent Log
        </span>
        <div className="ml-auto flex gap-1.5 border-2 border-border bg-black/5 p-1 rounded-sm">
          <div className="w-3 h-3 rounded-full border-2 border-border bg-[#00D696]" title="Connected"></div>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm leading-relaxed"
      >
        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log.id} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
              <span className="text-muted-foreground/70 shrink-0 font-bold">[{log.time}]</span>
              <div className="flex-1">
                {getStatusTag(log.status)}
                <span className={log.status === "ok" ? "text-muted-foreground font-medium" : "text-[#E0E0E0] font-medium"}>
                  {log.text}
                </span>
              </div>
            </div>
          ))}
          
          {currentIndex < SEQUENCE.length && SEQUENCE[currentIndex].action === "type" && activeText && (
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
              <span className="text-muted-foreground/70 shrink-0 font-bold">[{currentTime}]</span>
              <div className="flex-1 flex items-center">
                {getStatusTag(SEQUENCE[currentIndex].status)}
                <span className="text-[#E0E0E0] font-medium">{activeText}</span>
                <span className="w-2.5 h-4 bg-[#00D696] animate-pulse inline-block ml-1 align-middle"></span>
              </div>
            </div>
          )}

          {/* Blinking cursor when finished */}
          {currentIndex >= SEQUENCE.length && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#00D696] font-bold">_</span>
              <span className="w-2.5 h-4 bg-[#00D696] animate-pulse"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

