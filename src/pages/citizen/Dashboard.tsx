import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Trash2, 
  Award, 
  TrendingUp, 
  Recycle, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CitizenDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data
  const nearbyBins = [
    { id: 1, location: 'Main Street', distance: '0.2 km', status: 'empty', fillLevel: 20 },
    { id: 2, location: 'Park Avenue', distance: '0.5 km', status: 'half', fillLevel: 65 },
    { id: 3, location: 'City Center', distance: '0.8 km', status: 'full', fillLevel: 95 },
  ];

  const wasteTips = [
    { title: 'Organic Waste', tip: 'Food scraps go in green bin', icon: '🥬' },
    { title: 'Recyclables', tip: 'Clean containers only', icon: '♻️' },
    { title: 'Hazardous', tip: 'Special disposal required', icon: '⚠️' },
  ];

  const recentActivity = [
    { date: '2024-01-15', action: 'Recycling reported', points: 10 },
    { date: '2024-01-14', action: 'Bin status updated', points: 5 },
    { date: '2024-01-13', action: 'Issue reported', points: 15 },
  ];

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
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Let's make a difference today</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Your Points</p>
            <p className="text-2xl font-bold text-accent">{user?.points || 0}</p>
          </div>
          <Award className="h-8 w-8 text-accent" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          className="h-20 flex-col space-y-2"
          onClick={() => navigate('/bins')}
        >
          <MapPin className="h-6 w-6" />
          <span>Find Nearby Bins</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-20 flex-col space-y-2"
          onClick={() => navigate('/report')}
        >
          <AlertTriangle className="h-6 w-6" />
          <span>Report Issue</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-20 flex-col space-y-2"
          onClick={() => navigate('/rewards')}
        >
          <Award className="h-6 w-6" />
          <span>View Rewards</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nearby Bins */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Nearby Bins
            </CardTitle>
            <CardDescription>Check bin status in your area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {nearbyBins.map((bin) => (
              <div key={bin.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(bin.status)}
                  <div>
                    <p className="font-medium">{bin.location}</p>
                    <p className="text-sm text-muted-foreground">{bin.distance} away</p>
                  </div>
                </div>
                <Badge className={getStatusColor(bin.status)}>
                  {bin.fillLevel}% full
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => navigate('/bins')}>
              View All Bins
            </Button>
          </CardContent>
        </Card>

        {/* Waste Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Recycle className="h-5 w-5" />
              Waste Segregation Tips
            </CardTitle>
            <CardDescription>Learn proper waste disposal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {wasteTips.map((tip, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <p className="font-medium">{tip.title}</p>
                  <p className="text-sm text-muted-foreground">{tip.tip}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your recent contributions and rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
                <Badge variant="outline" className="bg-accent text-accent-foreground">
                  +{activity.points} pts
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CitizenDashboard;