import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { cn } from "../lib/utils";
import { BarChart3, User as UserIcon, LogOut, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { memo } from "react";
import { logout } from "../hooks/useAuth";
import type { UserType } from "../types";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserIcon,
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  user: UserType;
}
export const Sidebar = memo(({ open, onClose, user }: SidebarProps) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50 bg-white border-r border-slate-200">
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-900">
              UserMgmt
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                item.href === pathname
                  ? "bg-primary/10 text-primary border-r-2 border-primary"
                  : "text-slate-700 hover:bg-slate-100",
                "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              )}
            >
              <item.icon
                className={cn(
                  item.href === pathname ? "text-primary" : "text-slate-400",
                  "mr-3 h-5 w-5"
                )}
              />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-slate-200">
          <div className="flex items-center space-x-3 px-3 py-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar || ""} alt="User avatar" />
              <AvatarFallback>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-500 truncate capitalize">
                {user?.role}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-slate-400 hover:text-slate-600"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden z-50",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-200">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-900">
                UserMgmt
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                item.href === pathname
                  ? "bg-primary/10 text-primary border-r-2 border-primary"
                  : "text-slate-700 hover:bg-slate-100",
                "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              )}
              onClick={onClose}
            >
              <item.icon
                className={cn(
                  item.href === pathname ? "text-primary" : "text-slate-400",
                  "mr-3 h-5 w-5"
                )}
              />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-slate-200">
          <div className="flex items-center space-x-3 px-3 py-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar || ""} alt="User avatar" />
              <AvatarFallback>
                {user?.firstName?.[0]}
                {user?.firstName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-500 truncate capitalize">
                {user?.role}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-slate-400 hover:text-slate-600"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
});
