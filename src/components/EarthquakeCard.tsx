
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Waves } from 'lucide-react';
import { EarthquakeData } from '@/hooks/useEarthquakeData';
import { formatDistanceToNow } from 'date-fns';

interface EarthquakeCardProps {
  earthquake: EarthquakeData;
  onClick?: () => void;
}

export function EarthquakeCard({ earthquake, onClick }: EarthquakeCardProps) {
  const { mag, title, date_time, depth } = earthquake;
  
  // Format the date/time
  const eventDate = new Date(date_time);
  const timeAgo = formatDistanceToNow(eventDate, { addSuffix: true });
  
  // Determine magnitude severity class
  const getMagnitudeClass = (magnitude: number) => {
    if (magnitude < 4.0) return 'magnitude-bg-low';
    if (magnitude < 5.0) return 'magnitude-bg-medium';
    if (magnitude < 6.0) return 'magnitude-bg-high';
    return 'magnitude-bg-severe';
  };

  const getMagnitudeSeverity = (magnitude: number) => {
    if (magnitude < 4.0) return 'Low';
    if (magnitude < 5.0) return 'Moderate';
    if (magnitude < 6.0) return 'High';
    return 'Severe';
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 card-hover border border-border/50 cursor-pointer animate-scale-in"
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-start gap-4">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${getMagnitudeClass(mag)} text-white font-bold shrink-0`}>
          {mag.toFixed(1)}
        </div>
        
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <Badge variant="outline" className="px-2 py-0.5 text-xs">
              {getMagnitudeSeverity(mag)}
            </Badge>
            <span className="text-muted-foreground text-xs flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {timeAgo}
            </span>
          </div>
          
          <h3 className="font-medium text-base line-clamp-1">{title}</h3>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> 
              {earthquake.location_properties?.epiCenter?.name || 'Unknown location'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> 
              {eventDate.toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Waves className="h-3.5 w-3.5" /> 
              {depth}km depth
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
