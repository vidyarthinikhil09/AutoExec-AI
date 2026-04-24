import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Zap,
  LayoutDashboard,
  PlusCircle,
  CheckSquare,
  FileText,
  BarChart2,
  CheckCircle,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../src/contexts/AuthContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: PlusCircle, label: "New Task", href: "/new-task" },
  { icon: CheckSquare, label: "My Tasks", href: "/tasks" },
  { icon: FileText, label: "Documents", href: "/documents" },
  { icon: BarChart2, label: "Reports", href: "/reports" },
  { icon: CheckCircle, label: "Approvals", href: "/approvals", badgeCount: 3 },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <Sidebar className="border-r-4 border-border bg-secondary-background">
      <SidebarHeader className="p-4 border-b-4 border-border bg-background">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-main p-1.5 rounded-base border-2 border-border shadow-[2px_2px_0_0_var(--border)]">
            <Zap size={24} className="text-main-foreground fill-main-foreground" />
          </div>
          <span className="text-foreground font-heading font-black text-2xl tracking-tight uppercase">
            AutoExec
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-secondary-background px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      isActive={isActive} 
                      className={`h-auto py-3 px-3 transition-all duration-200 border-2 ${isActive ? 'bg-main text-main-foreground border-border shadow-[4px_4px_0_0_var(--border)] -translate-x-[2px] -translate-y-[2px]' : 'bg-transparent border-transparent hover:bg-main/10 hover:border-border hover:shadow-[2px_2px_0_0_var(--border)] hover:-translate-x-[1px] hover:-translate-y-[1px]'}`}
                      onClick={() => navigate(item.href)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <item.icon size={20} className={isActive ? "text-main-foreground" : "text-foreground"} />
                        <span className={`font-bold uppercase tracking-widest text-sm ${isActive ? "text-main-foreground" : "text-foreground"}`}>{item.label}</span>
                      </div>
                    </SidebarMenuButton>
                    {item.badgeCount !== undefined && (
                      <SidebarMenuBadge className={`rounded-base px-2 border-2 border-border font-bold shadow-[2px_2px_0_0_var(--border)] ${isActive ? 'bg-background text-foreground' : 'bg-main text-main-foreground'}`}>
                        {item.badgeCount}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="font-heading font-bold text-foreground/50 uppercase tracking-widest text-xs mb-2">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={location.pathname === "/settings"} 
                  className={`h-auto py-3 px-3 transition-all duration-200 border-2 ${location.pathname === "/settings" ? 'bg-main text-main-foreground border-border shadow-[4px_4px_0_0_var(--border)] -translate-x-[2px] -translate-y-[2px]' : 'bg-transparent border-transparent hover:bg-main/10 hover:border-border hover:shadow-[2px_2px_0_0_var(--border)] hover:-translate-x-[1px] hover:-translate-y-[1px]'}`}
                  onClick={() => navigate("/settings")}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Settings size={20} className={location.pathname === "/settings" ? "text-main-foreground" : "text-foreground"} />
                    <span className={`font-bold uppercase tracking-widest text-sm ${location.pathname === "/settings" ? "text-main-foreground" : "text-foreground"}`}>Settings</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t-4 border-border bg-background">
        <div className="flex items-center gap-3 p-2 bg-secondary-background border-2 border-border shadow-[2px_2px_0_0_var(--border)] rounded-base mb-4">
          <Avatar className="h-10 w-10 border-2 border-border rounded-base">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="object-cover w-full h-full" />
            ) : (
              <AvatarFallback className="bg-main text-main-foreground font-heading font-bold text-sm">
                {user ? getInitials(user.name) : 'AJ'}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-foreground font-heading font-bold text-sm truncate uppercase tracking-tight">{user?.name || "Alex Johnson"}</span>
            <Badge className="bg-[#FFBF00] text-black hover:bg-[#FFBF00] border-2 border-border px-1.5 py-0 text-[10px] w-fit uppercase tracking-wider shadow-[2px_2px_0_0_var(--border)] rounded-base mt-1">
              Pro
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 px-2 pb-2">
          <div className="relative flex h-3 w-3 border-2 border-border bg-[#00D696] rounded-base"></div>
          <span className="text-xs text-foreground font-bold font-heading uppercase tracking-widest">
            Agents Online
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
