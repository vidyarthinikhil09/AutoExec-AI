import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";

const data = [
  { name: 'Mon', completed: 4, generated: 12 },
  { name: 'Tue', completed: 7, generated: 15 },
  { name: 'Wed', completed: 5, generated: 8 },
  { name: 'Thu', completed: 10, generated: 20 },
  { name: 'Fri', completed: 8, generated: 14 },
  { name: 'Sat', completed: 2, generated: 5 },
  { name: 'Sun', completed: 3, generated: 7 },
];

export function ReportsPage() {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("AutoExec AI - Project Summary", 20, 20);
    
    // Section 1
    doc.setFontSize(16);
    doc.text("1. Overview", 20, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const overviewText = "AutoExec AI is a modern, responsive web application designed to automate workflows with intelligent agents. It features a comprehensive dashboard, task management, document handling, and an approval system, all wrapped in a sleek, dark-mode compatible UI.";
    const splitOverview = doc.splitTextToSize(overviewText, 170);
    doc.text(splitOverview, 20, 50);

    // Section 2
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("2. Core Architecture", 20, 80);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const archList = [
      "• Framework: React 18 with Vite",
      "• Routing: React Router DOM (Client-side routing)",
      "• Styling: Tailwind CSS with custom theme variables",
      "• UI Components: shadcn/ui (Radix UI primitives + Tailwind)",
      "• Icons: Lucide React",
      "• State Management: React Context (AuthContext)"
    ];
    doc.text(archList, 25, 90);

    // Section 3
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("3. Features & Pages Built", 20, 135);
    
    doc.setFontSize(12);
    let yPos = 145;
    
    const features = [
      { title: "Authentication & Global State", desc: "Implemented AuthContext for global state management. Created a beautiful split-screen Login/Signup page with simulated authentication. The global state syncs the user profile and avatar across the application." },
      { title: "Layout & Navigation", desc: "Built a responsive Sidebar (collapsible on desktop, off-canvas on mobile) and a Topbar featuring an Omni-input search, theme toggle, and globally synced user avatar." },
      { title: "Dashboard", desc: "Features high-level metrics, a real-time Agent Feed for AI activities, and a Reminders widget for upcoming deadlines." },
      { title: "Task Management", desc: "Includes 'My Tasks' for viewing ongoing work and 'New Task' for assigning objectives. Task cards display progress bars, phases, and expandable subtasks." },
      { title: "Approvals System", desc: "A dedicated queue for tasks requiring human intervention. Features highly polished 'Approve' and 'Reject' buttons with hover scaling, ghost/solid variants, and loading states." },
      { title: "Settings & Profile", desc: "A tabbed interface for Profile, Notifications, AI Preferences, Security, and Integrations. Includes a fully functional Avatar upload feature that instantly updates the global Topbar avatar. Fixed mobile responsiveness for horizontal tab scrolling." },
      { title: "Documents & Reports", desc: "Drag-and-drop file upload UI for documents and a dedicated section for workflow analytics and reports." }
    ];

    features.forEach(f => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(f.title, 20, yPos);
      yPos += 6;
      doc.setFont("helvetica", "normal");
      const splitDesc = doc.splitTextToSize(f.desc, 170);
      doc.text(splitDesc, 20, yPos);
      yPos += (splitDesc.length * 5) + 5;
    });

    // Section 4
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("4. UI/UX Polish", 20, yPos);
    yPos += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const uxList = [
      "• Animations: Subtle hover scales and smooth layout transitions.",
      "• Responsiveness: Mobile-first approach ensuring complex layouts degrade gracefully.",
      "• Color Palette: Professional Navy and Surface colors accented with vibrant Brand Orange and Green."
    ];
    doc.text(uxList, 25, yPos);

    doc.save("AutoExec_AI_Project_Summary.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-heading font-black text-foreground uppercase tracking-tight">Analytics Overview</h2>
          <p className="text-lg font-medium text-foreground/70 mt-1">Track your AI agents' performance and task completion rates.</p>
        </div>
        <Button size="lg" onClick={generatePDF} className="bg-main hover:bg-main text-main-foreground font-bold uppercase tracking-widest border-2 border-border shadow-[2px_2px_0_0_var(--border)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_var(--border)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all w-full sm:w-auto">
          <Download className="mr-2 h-5 w-5" />
          Export Project Summary
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-black font-heading uppercase text-foreground">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--foreground)', fontSize: 12, fontWeight: 700 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--foreground)', fontSize: 12, fontWeight: 700 }} />
                  <Tooltip 
                    cursor={{ fill: 'var(--main)', opacity: 0.2 }}
                    contentStyle={{ borderRadius: 'var(--radius)', border: '2px solid var(--border)', boxShadow: '4px 4px 0px 0px var(--border)', backgroundColor: 'var(--secondary-background)' }}
                  />
                  <Bar dataKey="completed" fill="#00D696" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-black font-heading uppercase text-foreground">AI Artifacts Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--foreground)', fontSize: 12, fontWeight: 700 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--foreground)', fontSize: 12, fontWeight: 700 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: 'var(--radius)', border: '2px solid var(--border)', boxShadow: '4px 4px 0px 0px var(--border)', backgroundColor: 'var(--secondary-background)', fontWeight: 'bold' }}
                  />
                  <Line type="monotone" dataKey="generated" stroke="#FFBF00" strokeWidth={4} dot={{ r: 6, fill: '#FFBF00', strokeWidth: 3, stroke: 'var(--background)' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
