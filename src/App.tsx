import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import CitizenDashboard from "./pages/citizen/Dashboard";
import AuthorityDashboard from "./pages/authority/Dashboard";
import Analytics from "./pages/Analytics";
import Report from "./pages/citizen/Report";
import Bins from "./pages/citizen/Bins";
import Rewards from "./pages/citizen/Rewards";
import MapPage from "./pages/Map";
import UsersPage from "./pages/authority/Users";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {children}
    </div>
  );
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <Auth />} />
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />} />
      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute>
            {user?.role === 'authority' ? <Analytics /> : <Navigate to="/dashboard" replace />}
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            {user?.role === 'citizen' ? <CitizenDashboard /> : <AuthorityDashboard />}
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/report" 
        element={
          <ProtectedRoute>
            {user?.role === 'citizen' ? <Report /> : <Navigate to="/dashboard" replace />}
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/bins" 
        element={
          <ProtectedRoute>
            {user?.role === 'citizen' ? <Bins /> : <Navigate to="/dashboard" replace />}
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rewards" 
        element={
          <ProtectedRoute>
            {user?.role === 'citizen' ? <Rewards /> : <Navigate to="/dashboard" replace />}
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/map" 
        element={
          <ProtectedRoute>
            {user ? <MapPage /> : <Navigate to="/auth" replace />}
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute>
            {user?.role === 'authority' ? <UsersPage /> : <Navigate to="/dashboard" replace />}
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/analytics" replace />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
