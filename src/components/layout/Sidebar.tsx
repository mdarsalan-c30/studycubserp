import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Users,
  FileText,
  CheckSquare,
  FolderOpen,
  BarChart3,
  Settings,
  ChevronLeft,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Employees", href: "/dashboard/employees", icon: Users },
  { title: "Offer Letters", href: "/dashboard/offers", icon: FileText },
  { title: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { title: "Documents", href: "/dashboard/documents", icon: FolderOpen },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={cn(
      "bg-surface border-r border-border flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform",
            collapsed && "rotate-180"
          )} />
          {!collapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 group",
                    isActive 
                      ? "bg-gradient-to-r from-primary to-primary-hover text-primary-foreground shadow-lg" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive && "text-primary-foreground"
                  )} />
                  {!collapsed && (
                    <span className="font-medium truncate">
                      {item.title}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            StudyCubs ERM v1.0
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;