import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "../components/sidebar";
import { UserTable } from "../components/user-table";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Users,
  UserCheck,
  UserPlus,
  Shield,
  Search,
  Bell,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { apiRequest } from "../lib/queryClient";
import type { UserStateType, UserType } from "../types";

export default function Dashboard() {
  const { isAuthenticated, isLoading, user } = useAuth<UserType>();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: stats, isLoading: statsLoading } = useQuery<UserStateType>({
    queryKey: ["/api/users/stats"],
    queryFn: async () => await apiRequest("GET", "/user/stats"),
    enabled: !!user && user?.role === "admin",
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        user={user}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-3"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Dashboard
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  {isAdmin
                    ? "Manage users and system settings"
                    : "View your profile and settings"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input placeholder="Search users..." className="pl-10 w-64" />
              </div>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Stats Grid - Only for admins */}
            {isAdmin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-600">
                          Total Users
                        </p>
                        <p className="text-2xl font-semibold text-slate-900">
                          {statsLoading ? "..." : stats?.totalUsers || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <UserCheck className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-600">
                          Active Users
                        </p>
                        <p className="text-2xl font-semibold text-slate-900">
                          {statsLoading ? "..." : stats?.verifiedUsers || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <UserPlus className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-600">
                          New This Month
                        </p>
                        <p className="text-2xl font-semibold text-slate-900">
                          {statsLoading ? "..." : stats?.newThisMonth || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-600">
                          Admins
                        </p>
                        <p className="text-2xl font-semibold text-slate-900">
                          {statsLoading ? "..." : stats?.adminUsers || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Users Table - Only for admins */}
            {isAdmin ? (
              <UserTable />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Welcome to UserMgmt
                  </h3>
                  <p className="text-slate-600">
                    You're logged in as a user. Contact an administrator for
                    access to user management features.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
