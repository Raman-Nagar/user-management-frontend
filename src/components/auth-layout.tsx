import { Navigate } from "react-router";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    );
  }

  return <Navigate to="/dashboard" replace />;
}
