import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Users, Shield, UserCheck, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router";

export default function Landing() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">UserMgmt</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A comprehensive user management system with role-based access
            control, authentication, and modern dashboard interface.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Secure Authentication
              </h3>
              <p className="text-slate-600">
                JWT-based authentication with session management and secure
                login flows.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Role-Based Access
              </h3>
              <p className="text-slate-600">
                Granular permissions with admin and user roles for controlled
                access.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-slate-600">
                Comprehensive dashboard with user statistics and management
                tools.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Get Started
              </h2>
              <p className="text-slate-600 mb-6">
                Sign in to access your dashboard and manage users with our
                powerful tools.
              </p>
              <Button onClick={handleLogin} className="w-full" size="lg">
                Sign In to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
