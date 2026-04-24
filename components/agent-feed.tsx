import { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";

interface LogEntry {
  id: number;
  time: string;
  message: string;
}

const INITIAL_LOGS: LogEntry[] = [
  { id: 1, time: "10:42", message: "Parsing intent..." },
  { id: 2, time: "10:43", message: "Sub-tasks created: 3" },
  { id: 3, time: "10:44", message: "Reading uploaded PDF..." },
  { id: 4, time: "10:45", message: "Generating report draft..." },
  { id: 5, time: "10:46", message: "Email draft ready for approval" },
];

export function AgentFeed() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isConnected, setIsConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Connect to SSE endpoint for live logs
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    
    let eventSource: EventSource | null = null;
    
    try {
      eventSource = new EventSource(`${apiUrl}/agent/logs`);
      
      eventSource.onopen = () => {
        setIsConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Format time if not provided
          const timeString = data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          setLogs((prev) => [
            ...prev,
            {
              id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
              time: timeString,
              message: data.message || data.log || event.data,
            },
          ]);
        } catch (e) {
          // If not JSON, just use the raw string
          setLogs((prev) => [
            ...prev,
            {
              id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              message: event.data,
            },
          ]);
        }
      };

      eventSource.onerror = () => {
        setIsConnected(false);
        // Don't close immediately to allow EventSource to auto-reconnect
      };
    } catch (err) {
      console.error("Failed to connect to SSE endpoint:", err);
    }

    // Fallback simulation if SSE fails or isn't implemented on backend yet
    const fallbackTimer = setTimeout(() => {
      if (!isConnected) {
        setLogs((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message: "Awaiting user approval to send email. (Fallback simulation)",
          },
        ]);
      }
    }, 5000);

    return () => {
      clearTimeout(fallbackTimer);
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [isConnected]);

  return (
    <div className="bg-black border-2 border-border rounded-base shadow-shadow overflow-hidden flex flex-col h-[320px] mb-6 transition-all">
      {/* Terminal Header */}
      <div className="bg-background px-4 py-3 flex items-center gap-2 border-b-2 border-border">
        <Terminal size={16} className="text-foreground" />
        <span className="text-xs font-bold font-heading text-foreground tracking-wider uppercase">
          Live Agent Feed
        </span>
        <div className="ml-auto flex gap-1.5 border-2 border-border bg-black/5 p-1 rounded-sm">
          <div className={`w-3 h-3 rounded-full border-2 border-border ${isConnected ? 'bg-[#00D696]' : 'bg-chart-1'}`} title={isConnected ? 'Connected' : 'Disconnected'}></div>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm leading-relaxed"
      >
        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3">
              <span className="text-[#00D696]/50 shrink-0 font-bold">[{log.time}]</span>
              <span className="text-[#00D696] break-words font-medium">{log.message}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[#00D696]">_</span>
            <span className="w-2.5 h-4 bg-[#00D696] animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
