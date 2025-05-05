
// This file is no longer needed, but we'll leave it in the codebase for now
// in case the user wants to revert the change. We could delete it if requested.
import React from 'react';
import { BookOpen, MapPin, FileEdit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface BottomNavigationProps {
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function BottomNavigation({ activeTab, onChange }: BottomNavigationProps) {
  const navItems: NavItem[] = [
    {
      id: 'preparedness',
      label: 'Preparedness',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: 'map',
      label: 'Map',
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      id: 'form',
      label: 'Report',
      icon: <FileEdit className="h-5 w-5" />,
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-glass rounded-full border border-border/60 bottom-nav hidden">
      <div className="flex items-center justify-center px-2 py-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={cn(
              "flex flex-col items-center justify-center px-6 py-2 rounded-full transition-all duration-200",
              activeTab === item.id
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground/90"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
