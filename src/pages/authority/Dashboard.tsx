import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Trash2, 
  Users, 
  TrendingUp, 
  Route,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthorityDashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const binStats = {
    total: 150,
    empty: 60,
    half: 70,
    full: 20,
  };

  const criticalBins = [
    { id: 1, location: 'City Center Plaza', fillLevel: 95, status: 'full', lastCollection: '2 days ago' },
    { id: 2, location: 'Shopping Mall', fillLevel: 89, status: 'full', lastCollection: '1 day ago' },
    { id: 3, location: 'Park Entrance', fillLevel: 87, status: 'half', lastCollection: '3 hours ago' },
  ];

  const suggestedRoutes = [
    { id: 1, route: 'Route A', bins: 12, efficiency: '85%', estimatedTime: '2.5 hrs' },
    { id: 2, route: 'Route B', bins: 8, efficiency: '92%', estimatedTime: '1.8 hrs' },
    { id: 3, route: 'Route C', bins: 15, efficiency: '78%', estimatedTime: '3.2 hrs' },
  ];

  const engagementStats = {
    activeUsers: 1250,
    reportsToday: 23,
    pointsAwarded: 15600,
    recyclingRate: 78,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'empty': return 'bg-success text-success-foreground';
      case 'half': return 'bg-warning text-warning-foreground';
      case 'full': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'empty': return <CheckCircle className="h-4 w-4" />;
      case 'half': return <Clock className="h-4 w-4" />;
      case 'full': return <AlertTriangle className="h-4 w-4" />;
      default: return <Trash2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Authority Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage waste collection citywide</p>
        </div>
        <Button onClick={() => navigate('/analytics')}>
          <BarChart3 className="h-4 w-4 mr-2" />
          View Analytics
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bins</p>
                <p className="text-2xl font-bold">{binStats.total}</p>
              </div>
              <Trash2 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Need Collection</p>
                <p className="text-2xl font-bold text-destructive">{binStats.full}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{engagementStats.activeUsers}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recycling Rate</p>
                <p className="text-2xl font-bold text-success">{engagementStats.recyclingRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Bins */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Critical Bins
            </CardTitle>
            <CardDescription>Bins requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {criticalBins.map((bin) => (
              <div key={bin.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(bin.status)}
                  <div>
                    <p className="font-medium">{bin.location}</p>
                    <p className="text-sm text-muted-foreground">Last: {bin.lastCollection}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(bin.status)}>
                  {bin.fillLevel}%
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <MapPin className="h-4 w-4 mr-2" />
              View on Map
            </Button>
          </CardContent>
        </Card>

        {/* Suggested Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              AI-Optimized Routes
            </CardTitle>
            <CardDescription>Suggested collection routes for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedRoutes.map((route) => (
              <div key={route.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{route.route}</h4>
                  <Badge variant="outline">{route.efficiency} efficient</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <span>{route.bins} bins</span>
                  <span>{route.estimatedTime}</span>
                </div>
              </div>
            ))}
            <Button className="w-full">
              Optimize All Routes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          variant="outline" 
          className="h-16 flex-col space-y-2"
          onClick={() => navigate('/users')}
        >
          <Users className="h-5 w-5" />
          <span>Manage Users</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex-col space-y-2"
          onClick={() => navigate('/analytics')}
        >
          <BarChart3 className="h-5 w-5" />
          <span>View Analytics</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex-col space-y-2"
        >
          <MapPin className="h-5 w-5" />
          <span>Map View</span>
        </Button>
      </div>
    </div>
  );
};

export default AuthorityDashboard;