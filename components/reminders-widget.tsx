import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock, BellRing, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";

interface Reminder {
  id: string;
  title: string;
  timeRemaining: string;
  isUrgent?: boolean;
}

const FALLBACK_REMINDERS: Reminder[] = [
  {
    id: "r1",
    title: "Review Q3 Marketing Budget",
    timeRemaining: "2 hours",
    isUrgent: true,
  },
  {
    id: "r2",
    title: "Approve Acme Corp Contract",
    timeRemaining: "4 hours",
  },
  {
    id: "r3",
    title: "Weekly Sync Prep",
    timeRemaining: "Tomorrow",
  },
];

export function RemindersWidget() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/reminders`);
        if (!response.ok) throw new Error('Failed to fetch reminders');
        const data = await response.json();
        setReminders(data);
      } catch (error) {
        console.error("Error fetching reminders:", error);
        setReminders(FALLBACK_REMINDERS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReminders();
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3 border-b-2 border-border">
        <CardTitle className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
          <BellRing size={20} className="text-foreground" />
          Upcoming Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-main" />
          </div>
        ) : (
          <div className="divide-y-2 divide-border">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="p-4 flex items-start justify-between hover:bg-main/10 transition-colors">
                <div className="pr-4">
                  <h5 className="text-sm font-bold font-heading text-foreground mb-1 leading-tight">
                    {reminder.title}
                  </h5>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`shrink-0 flex items-center gap-1 text-xs font-bold border-2 border-border shadow-[2px_2px_0_0_var(--border)] ${
                    reminder.isUrgent 
                      ? "bg-chart-1 text-foreground" 
                      : "bg-secondary-background text-foreground"
                  }`}
                >
                  <Clock size={12} />
                  {reminder.timeRemaining}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
