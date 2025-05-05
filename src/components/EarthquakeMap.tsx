
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { EarthquakeData } from '@/hooks/useEarthquakeData';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Map, Compass, Target, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapControlsProps {
  onRefresh: () => void;
  lastUpdated: Date | null;
  isLoading: boolean;
}

function MapControls({ onRefresh, lastUpdated, isLoading }: MapControlsProps) {
  const map = useMap();

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 8 });
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <div className="bg-glass rounded-md p-2 shadow-sm border border-border/60 flex flex-col gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-8 h-8 p-0 rounded-md bg-background/80" 
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="sr-only">Refresh</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-8 h-8 p-0 rounded-md bg-background/80" 
          onClick={handleLocate}
        >
          <Target className="h-4 w-4" />
          <span className="sr-only">My Location</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-8 h-8 p-0 rounded-md bg-background/80" 
          onClick={() => map.setView([39.0, 35.0], 6)}
        >
          <Compass className="h-4 w-4" />
          <span className="sr-only">Reset View</span>
        </Button>
      </div>
      
      {lastUpdated && (
        <div className="bg-glass rounded-md py-1 px-2 text-xs flex items-center gap-1 border border-border/60 text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            {lastUpdated.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      )}
    </div>
  );
}

interface MapLegendProps {
  className?: string;
}

function MapLegend({ className }: MapLegendProps) {
  return (
    <div className={`absolute bottom-4 left-4 z-[1000] bg-glass rounded-lg border border-border/60 overflow-hidden ${className}`}>
      <div className="px-3 py-2">
        <h4 className="text-xs font-medium mb-2 flex items-center gap-1.5">
          <Map className="h-3.5 w-3.5" />
          Magnitude
        </h4>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full magnitude-bg-low"></div>
            <span className="text-xs">{'< 4.0'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full magnitude-bg-medium"></div>
            <span className="text-xs">4.0 - 4.9</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full magnitude-bg-high"></div>
            <span className="text-xs">5.0 - 5.9</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full magnitude-bg-severe"></div>
            <span className="text-xs">{'>= 6.0'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MapComponentProps {
  earthquakes: EarthquakeData[];
  isLoading: boolean;
  onRefresh: () => void;
  lastUpdated: Date | null;
  selectedEarthquake?: string | null;
  onSelectEarthquake: (id: string | null) => void;
}

export function EarthquakeMap({ 
  earthquakes, 
  isLoading, 
  onRefresh, 
  lastUpdated,
  selectedEarthquake,
  onSelectEarthquake
}: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Create custom markers for earthquakes based on magnitude
  const createEarthquakeMarker = (earthquake: EarthquakeData) => {
    const { mag } = earthquake;
    
    // Size based on magnitude (bigger for larger earthquakes)
    const size = Math.max(20, Math.min(50, 20 + (mag * 5)));
    
    // Determine color class based on magnitude
    let colorClass = 'magnitude-bg-low';
    if (mag >= 6.0) colorClass = 'magnitude-bg-severe';
    else if (mag >= 5.0) colorClass = 'magnitude-bg-high';
    else if (mag >= 4.0) colorClass = 'magnitude-bg-medium';
    
    // Create a custom HTML element for the marker
    const markerHtml = `
      <div class="earthquake-marker ${colorClass}" style="width: ${size}px; height: ${size}px;">
        ${mag.toFixed(1)}
      </div>
    `;
    
    const icon = L.divIcon({
      html: markerHtml,
      className: 'earthquake-marker-container',
      iconSize: [size, size],
      iconAnchor: [size/2, size/2]
    });
    
    return icon;
  };

  useEffect(() => {
    if (mapRef.current && selectedEarthquake && earthquakes.length > 0) {
      const earthquake = earthquakes.find(eq => eq._id === selectedEarthquake);
      if (earthquake) {
        const [lng, lat] = earthquake.geojson.coordinates;
        mapRef.current.setView([lat, lng], 8, {
          animate: true,
          duration: 1
        });
      }
    }
  }, [selectedEarthquake, earthquakes]);

  const handleMapReady = (map: L.Map) => {
    mapRef.current = map;
    setMapReady(true);
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute top-4 left-4 z-[1000] max-w-xs">
        <Card className="bg-glass border-border/60 shadow-sm">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              Recent Earthquakes
            </CardTitle>
            <CardDescription className="text-xs">
              Showing {earthquakes.length} earthquakes in Turkey
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      {isLoading && !mapReady ? (
        <div className="h-full w-full flex items-center justify-center bg-muted/20">
          <div className="space-y-4 w-full max-w-md px-4">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-[400px] w-full rounded-lg" />
            <div className="flex gap-2 justify-end">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full rounded-lg overflow-hidden flex-1">
          <MapContainer
            center={[39.0, 35.0]}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
            whenReady={(e) => handleMapReady(e.target)}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {earthquakes.map((earthquake) => {
              const [longitude, latitude] = earthquake.geojson.coordinates;
              return (
                <Marker
                  key={earthquake._id}
                  position={[latitude, longitude]}
                  icon={createEarthquakeMarker(earthquake)}
                  eventHandlers={{
                    click: () => onSelectEarthquake(earthquake._id)
                  }}
                >
                  <Popup>
                    <div className="p-1">
                      <div className="mb-2">
                        <Badge variant={earthquake.mag >= 5.0 ? "destructive" : "outline"}>
                          Magnitude {earthquake.mag.toFixed(1)}
                        </Badge>
                        <h3 className="font-medium text-sm mt-1">{earthquake.title}</h3>
                      </div>
                      <div className="text-xs space-y-1 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(earthquake.date_time).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>
                            {earthquake.location_properties?.epiCenter?.name || 'Unknown location'}
                          </span>
                        </div>
                        <div className="mt-1 pt-1 border-t border-border/60">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-xs h-7"
                            onClick={() => onSelectEarthquake(earthquake._id)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
            
            <MapControls
              onRefresh={onRefresh}
              lastUpdated={lastUpdated}
              isLoading={isLoading}
            />
            
            <MapLegend />
          </MapContainer>
        </div>
      )}
    </div>
  );
}
