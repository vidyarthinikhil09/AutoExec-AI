import { Bell, Search, Menu, LogOut, Command } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useLocation } from "react-router-dom";
import { useAuth } from "../src/contexts/AuthContext";
import { useSidebar } from "./ui/sidebar";

interface TopbarProps {}

export function Topbar({}: TopbarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toggleSidebar } = useSidebar();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/": return "Dashboard";
      case "/tasks": return "My Tasks";
      case "/reports": return "Reports";
      case "/settings": return "Settings";
      case "/new-task": return "New Task";
      case "/documents": return "Documents";
      case "/approvals": return "Approvals";
      default: return "Dashboard";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <header className="h-16 bg-background border-b-4 border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      {/* Left: Mobile Menu & Page Title */}
      <div className="flex items-center gap-4 w-auto md:w-1/3">
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-foreground hover:bg-main hover:text-main-foreground transition-all border-2 border-transparent hover:border-border hover:shadow-[2px_2px_0_0_var(--border)] rounded-base p-1.5"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-heading font-bold text-foreground hidden sm:block tracking-tight">{getPageTitle()}</h1>
      </div>

      {/* Center: Omni-input */}
      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-foreground/50 group-focus-within:text-foreground transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search or type a command..."
            className="w-full h-10 pl-10 pr-12 rounded-base border-2 border-border bg-secondary-background text-foreground text-sm focus:outline-none focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[4px_4px_0_0_var(--border)] transition-all shadow-[2px_2px_0_0_var(--border)] placeholder:text-foreground/50 font-medium"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 font-mono text-[10px] font-bold text-foreground bg-background border-2 border-border rounded-sm shadow-[1px_1px_0_0_var(--border)]">
              <Command size={10} /> K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="w-auto md:w-1/3 flex items-center justify-end gap-2 md:gap-4">
        <button className="relative p-2 text-foreground hover:bg-main/20 border-2 border-transparent hover:border-border hover:shadow-[2px_2px_0_0_var(--border)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-0 active:translate-y-0 active:shadow-none rounded-base transition-all hidden sm:block">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full border-2 border-border"></span>
        </button>
        
        <div className="h-8 w-1 bg-border mx-1 hidden sm:block"></div>

        <div className="flex items-center gap-3 pl-1">
          <Avatar className="h-10 w-10 border-2 border-border shadow-[2px_2px_0_0_var(--border)] cursor-pointer hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[4px_4px_0_0_var(--border)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover rounded-[calc(var(--radius)-2px)]" />
            ) : (
              <AvatarFallback className="bg-main text-main-foreground font-heading font-bold text-xs">
                {user ? getInitials(user.name) : 'AJ'}
              </AvatarFallback>
            )}
          </Avatar>
          <button 
            onClick={logout}
            className="p-2 text-foreground hover:bg-destructive hover:text-white border-2 border-transparent hover:border-border hover:shadow-[2px_2px_0_0_var(--border)] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-0 active:translate-y-0 active:shadow-none rounded-base transition-all"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
