import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const bins = [
  { id: 1, name: 'Main Street Bin', position: [28.6139, 77.2090], status: 'empty', fill: 18 },
  { id: 2, name: 'Park Avenue Bin', position: [28.6165, 77.2140], status: 'half', fill: 62 },
  { id: 3, name: 'City Center Bin', position: [28.6200, 77.2050], status: 'full', fill: 92 },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'empty': return 'green';
    case 'half': return 'orange';
    case 'full': return 'red';
    default: return 'gray';
  }
};

const icon = (status: string) => new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background:${statusColor(status)};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 0 2px rgba(0,0,0,0.15)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

type Status = 'empty' | 'half' | 'full' | 'all';

const MapPage = () => {
  const [filter, setFilter] = useState<Status>('all');
  const [locating, setLocating] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  const filtered = bins.filter((b) => (filter === 'all' ? true : b.status === filter));

  const locate = () => {
    if (!mapRef.current) return;
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        mapRef.current!.setView([latitude, longitude], 15, { animate: true });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Map</h1>
        <p className="text-muted-foreground">Live view of bins (mock data)</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <Button size="sm" variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All</Button>
        <Button size="sm" variant={filter === 'empty' ? 'default' : 'outline'} onClick={() => setFilter('empty')}>OK</Button>
        <Button size="sm" variant={filter === 'half' ? 'default' : 'outline'} onClick={() => setFilter('half')}>Half</Button>
        <Button size="sm" variant={filter === 'full' ? 'default' : 'outline'} onClick={() => setFilter('full')}>Full</Button>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="outline">Green=OK</Badge>
          <Badge variant="outline">Orange=Half</Badge>
          <Badge variant="outline">Red=Full</Badge>
          <Button size="sm" onClick={locate} disabled={locating}>{locating ? 'Locating...' : 'My Location'}</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>City Bins</CardTitle>
          <CardDescription>Status by color: green (ok), orange (half), red (full)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[520px] rounded-lg overflow-hidden">
            <MapContainer whenCreated={(map) => (mapRef.current = map)} center={[28.6139, 77.2090]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filtered.map((bin) => (
                <Marker key={bin.id} position={bin.position as any} icon={icon(bin.status)}>
                  <Popup>
                    <div className="space-y-1">
                      <p className="font-medium">{bin.name}</p>
                      <p className="text-sm text-muted-foreground">Fill: {bin.fill}%</p>
                      <p className="text-sm">Status: {bin.status}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapPage;
