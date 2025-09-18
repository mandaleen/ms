import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSession } from "@/contexts/SessionContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Skeleton } from "@/components/ui/skeleton";

const MainLayout = () => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !session) {
      navigate("/login");
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full">
        <Skeleton className="h-full w-[300px]" />
        <div className="flex-1 flex flex-col">
          <Skeleton className="h-16 w-full" />
          <div className="flex-1 p-6">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto bg-secondary/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;