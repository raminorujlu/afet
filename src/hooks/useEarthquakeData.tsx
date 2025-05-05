
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface EarthquakeLocation {
  type: string;
  coordinates: [number, number];
}

export interface EarthquakeData {
  _id: string;
  earthquake_id: string;
  provider: string;
  title: string;
  date: string;
  mag: number;
  depth: number;
  geojson: EarthquakeLocation;
  location_properties: {
    closestCity?: {
      name: string;
      distance: number;
      population: number;
    };
    epiCenter?: {
      name: string;
      population: number;
    };
  };
  date_time: string;
  created_at: number;
  location_tz: string;
}

export interface EarthquakeResponse {
  status: boolean;
  httpStatus: number;
  metadata: {
    total: number;
  };
  result: EarthquakeData[];
}

export function useEarthquakeData(refreshInterval = 60000, limit = 50) {
  const [data, setData] = useState<EarthquakeData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.orhanaydogdu.com.tr/deprem/kandilli/live?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const jsonData: EarthquakeResponse = await response.json();
      
      if (jsonData.status && jsonData.result) {
        setData(jsonData.result);
        setLastUpdated(new Date());
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      toast.error('Failed to fetch earthquake data. Please try again later.');
      console.error('Error fetching earthquake data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchData();
    
    const intervalId = setInterval(() => {
      fetchData();
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [fetchData, refreshInterval]);

  const refreshData = useCallback(() => {
    toast.promise(
      fetchData(),
      {
        loading: 'Refreshing earthquake data...',
        success: 'Earthquake data updated',
        error: 'Failed to refresh data',
      }
    );
  }, [fetchData]);

  return { data, isLoading, error, lastUpdated, refreshData };
}
