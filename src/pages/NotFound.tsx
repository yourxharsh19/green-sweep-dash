import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Search, ArrowLeft, FileText, Users, BarChart3 } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Track 404 analytics
    const analytics = {
      timestamp: new Date().toISOString(),
      path: location.pathname,
      userRole: user?.role || 'anonymous',
      referrer: document.referrer
    };
    console.log("404 Analytics:", analytics);
  }, [location.pathname, user?.role]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to dashboard with search intent
      window.location.href = `/dashboard?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const getSuggestedPages = () => {
    const baseSuggestions = [
      { icon: Home, label: "Dashboard", path: "/dashboard", description: "Return to your main dashboard" }
    ];

    if (user?.role === 'citizen') {
      return [
        ...baseSuggestions,
        { icon: FileText, label: "Submit Report", path: "/reports/new", description: "Report an issue to authorities" },
        { icon: Search, label: "Track Reports", path: "/reports", description: "Check status of your reports" }
      ];
    } else if (user?.role === 'authority') {
      return [
        ...baseSuggestions,
        { icon: Users, label: "Manage Users", path: "/users", description: "View and manage citizen accounts" },
        { icon: BarChart3, label: "Analytics", path: "/analytics", description: "View platform statistics" },
        { icon: FileText, label: "Reports", path: "/reports", description: "Review citizen reports" }
      ];
    }

    return baseSuggestions;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground">404</span>
          </div>
          <CardTitle className="text-3xl mb-2">Page Not Found</CardTitle>
          <p className="text-muted-foreground text-lg">
            The page "{location.pathname}" doesn't exist or has been moved.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Search Section */}
          <div className="space-y-2">
            <h3 className="font-semibold">Looking for something specific?</h3>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search for reports, users, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Suggested Pages */}
          <div className="space-y-3">
            <h3 className="font-semibold">Suggested Pages</h3>
            <div className="grid gap-3">
              {getSuggestedPages().map((page, index) => (
                <Link key={index} to={page.path} className="block">
                  <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                    <page.icon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">{page.label}</div>
                      <div className="text-sm text-muted-foreground">{page.description}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1">
              <Link to="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center text-sm text-muted-foreground pt-4 border-t">
            <p>
              If you believe this is an error, please contact support or try refreshing the page.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
