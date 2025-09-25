import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, RefreshCcw, Navigation, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

type Bin = {
  id: number;
  location: string;
  distanceKm: number;
  fillLevel: number; // 0-100
  status: 'empty' | 'half' | 'full';
};

const mockBins: Bin[] = [
  { id: 1, location: 'Main Street', distanceKm: 0.2, fillLevel: 18, status: 'empty' },
  { id: 2, location: 'Park Avenue - Gate 2', distanceKm: 0.5, fillLevel: 62, status: 'half' },
  { id: 3, location: 'City Center', distanceKm: 0.8, fillLevel: 92, status: 'full' },
  { id: 4, location: 'Library Corner', distanceKm: 1.2, fillLevel: 34, status: 'half' },
];

const getStatusColor = (status: Bin['status']) => {
  switch (status) {
    case 'empty': return 'bg-success text-success-foreground';
    case 'half': return 'bg-warning text-warning-foreground';
    case 'full': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getStatusIcon = (status: Bin['status']) => {
  switch (status) {
    case 'empty': return <CheckCircle className="h-4 w-4" />;
    case 'half': return <Clock className="h-4 w-4" />;
    case 'full': return <AlertTriangle className="h-4 w-4" />;
    default: return <AlertTriangle className="h-4 w-4" />;
  }
};

const Bins = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nearby Bins</h1>
          <p className="text-muted-foreground">Find the closest available bins</p>
        </div>
        <Button variant="outline">
          <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bins around you</CardTitle>
          <CardDescription>Mock data for demo purposes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockBins.map((bin) => (
            <div key={bin.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(bin.status)}
                <div>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {bin.location}
                  </p>
                  <p className="text-sm text-muted-foreground">{bin.distanceKm.toFixed(1)} km away</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(bin.status)}>{bin.fillLevel}% full</Badge>
                <Button size="sm" variant="outline">
                  <Navigation className="h-4 w-4 mr-1" /> Navigate
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Bins;


