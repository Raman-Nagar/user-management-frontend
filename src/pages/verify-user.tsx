import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router";
import { verifyEmail } from "../hooks/useAuth";
import { useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "../components/ui/button";

const VerifyUser = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["verify-user", token],
    queryFn: async () => await verifyEmail(token),
    enabled: !!token,
  });

  useEffect(() => {
    if (data?.message) {
      const timeout = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [data, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-xl text-center">
        <CardContent className="p-8">
          {isLoading && (
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
              <p className="mt-4 text-muted-foreground">
                Verifying your email...
              </p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center text-red-500">
              <XCircle className="h-10 w-10 mb-2" />
              <p className="font-semibold">Verification failed</p>
              <p className="text-sm mt-1">{(error as Error).message}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </Button>
            </div>
          )}

          {data?.message && (
            <div className="flex flex-col items-center text-green-600">
              <CheckCircle2 className="h-10 w-10 mb-2" />
              <p className="font-semibold">Email Verified</p>
              <p className="text-sm mt-1">{data.message}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Redirecting to login...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyUser;
