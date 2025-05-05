import React, { useState, useEffect } from 'react';
import { TabNavigation } from '@/components/TabNavigation';
import { PreparednessResources } from '@/components/PreparednessResources';
import { EarthquakeMap } from '@/components/EarthquakeMap';
import { DataSubmissionForm } from '@/components/DataSubmissionForm';
import { EarthquakeCard } from '@/components/EarthquakeCard';
import { useEarthquakeData } from '@/hooks/useEarthquakeData';
import { BookOpen, MapPin, FileEdit, Info, RefreshCw, HandHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { DonationList } from '@/components/DonationList';

const Index = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedEarthquake, setSelectedEarthquake] = useState<string | null>(null);
  const [infoCollapsed, setInfoCollapsed] = useState(false);
  
  const { 
    data: earthquakes, 
    isLoading, 
    error, 
    lastUpdated, 
    refreshData 
  } = useEarthquakeData(60000, 100);

  const tabs = [
    {id: 'donate', label: 'Donate', icon: <HandHeart className="size-4" />},
    {
      id: 'preparedness',
      label: 'Preparedness',
      icon: <BookOpen className="size-4" />,
    },
    {
      id: 'map',
      label: 'Real-Time Map',
      icon: <MapPin className="size-4" />,
      count: earthquakes.length,
    },
    {
      id: 'form',
      label: 'Report',
      icon: <FileEdit className="size-4" />,
    },
  ];

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleTabChange = (tabId: string) => {
    console.log('Changing tab to:', tabId);
    setActiveTab(tabId);
    if (tabId !== 'map') {
      setSelectedEarthquake(null);
    }
  };

  const handleSelectEarthquake = (id: string | null) => {
    setSelectedEarthquake(id);
    if (id) {
      setInfoCollapsed(false);
    }
  };

  const getSelectedEarthquake = () => {
    if (!selectedEarthquake) return null;
    return earthquakes.find(eq => eq._id === selectedEarthquake) || null;
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      <div className="border-b border-border/60 py-3 px-4 bg-background/95 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold truncate">Turkey Earthquake Monitor</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {lastUpdated && (
              <div className="text-xs text-muted-foreground flex items-center gap-1 mr-2">
                <Info className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Last updated:</span> 
                {lastUpdated.toLocaleTimeString()}
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-2 text-xs flex items-center gap-1"
              onClick={refreshData}
              disabled={isLoading}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
          </div>
        </div>
      </div>
      
      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />
      
      <main className="flex-1 relative overflow-hidden">
      <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${activeTab === 'donate' ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'}`}>
          <DonationList />
        </div>
        <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${activeTab === 'preparedness' ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'}`}>
          <PreparednessResources />
        </div>
        
        <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${activeTab === 'map' ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'}`}>
          <div className="h-full flex flex-col md:flex-row">
            <div className={`h-full ${selectedEarthquake && !infoCollapsed ? 'md:w-2/3' : 'w-full'}`}>
              {error ? (
                <div className="p-4">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Failed to load earthquake data. Please try refreshing the page.
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <EarthquakeMap 
                  earthquakes={earthquakes} 
                  isLoading={isLoading} 
                  onRefresh={refreshData}
                  lastUpdated={lastUpdated}
                  selectedEarthquake={selectedEarthquake}
                  onSelectEarthquake={handleSelectEarthquake}
                />
              )}
            </div>
            
            {activeTab === 'map' && (
              <div 
                className={`border-l border-border/60 bg-background h-full transition-all duration-300 
                  ${selectedEarthquake && !infoCollapsed ? 'md:w-1/3 translate-x-0' : 'md:w-0 translate-x-full md:translate-x-0'}`}
              >
                {selectedEarthquake && (
                  <div className="h-full flex flex-col">
                    <div className="p-3 border-b border-border/60 flex items-center justify-between">
                      <h3 className="font-medium flex items-center gap-1.5">
                        <Info className="h-4 w-4 text-primary" />
                        Earthquake Details
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => setInfoCollapsed(true)}
                      >
                        &times;
                      </Button>
                    </div>
                    
                    <ScrollArea className="flex-1 p-4">
                      {getSelectedEarthquake() ? (
                        <div className="space-y-4">
                          <EarthquakeCard 
                            earthquake={getSelectedEarthquake()!} 
                          />
                          
                          <div className="space-y-4 p-2">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Location Information</h4>
                              <div className="text-sm space-y-2">
                                <div className="flex justify-between border-b border-border/60 pb-1">
                                  <span className="text-muted-foreground">Region:</span>
                                  <span>{getSelectedEarthquake()?.location_properties?.epiCenter?.name || 'Unknown'}</span>
                                </div>
                                {getSelectedEarthquake()?.location_properties?.closestCity && (
                                  <div className="flex justify-between border-b border-border/60 pb-1">
                                    <span className="text-muted-foreground">Closest City:</span>
                                    <span>{getSelectedEarthquake()?.location_properties?.closestCity?.name}</span>
                                  </div>
                                )}
                                <div className="flex justify-between border-b border-border/60 pb-1">
                                  <span className="text-muted-foreground">Coordinates:</span>
                                  <span>
                                    {getSelectedEarthquake()?.geojson.coordinates.join(', ')}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Earthquake Details</h4>
                              <div className="text-sm space-y-2">
                                <div className="flex justify-between border-b border-border/60 pb-1">
                                  <span className="text-muted-foreground">Magnitude:</span>
                                  <span className="font-medium">{getSelectedEarthquake()?.mag.toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between border-b border-border/60 pb-1">
                                  <span className="text-muted-foreground">Depth:</span>
                                  <span>{getSelectedEarthquake()?.depth} km</span>
                                </div>
                                <div className="flex justify-between border-b border-border/60 pb-1">
                                  <span className="text-muted-foreground">Date:</span>
                                  <span>{new Date(getSelectedEarthquake()?.date_time || '').toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between border-b border-border/60 pb-1">
                                  <span className="text-muted-foreground">Time:</span>
                                  <span>{new Date(getSelectedEarthquake()?.date_time || '').toLocaleTimeString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Skeleton className="h-24 w-full rounded-md" />
                          <Skeleton className="h-32 w-full rounded-md" />
                          <Skeleton className="h-24 w-full rounded-md" />
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {activeTab === 'map' && !selectedEarthquake && (
            <div className="absolute bottom-6 right-4 z-[900]">
              <Button
                variant="default"
                size="sm"
                className="flex items-center gap-1.5 shadow-elevated bg-primary text-white"
                onClick={() => setActiveTab('form')}
              >
                <FileEdit className="h-4 w-4" />
                <span>Report an Earthquake</span>
              </Button>
            </div>
          )}
        </div>
        
        <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${activeTab === 'form' ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'}`}>
          <DataSubmissionForm />
        </div>
      </main>
    </div>
  );
};

export default Index;
