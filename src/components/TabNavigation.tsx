
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TabProps {
  id: string;
  label: string;
  icon: ReactNode;
  count?: number;
}

interface TabNavigationProps {
  tabs: TabProps[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function TabNavigation({ tabs, activeTab, onChange }: TabNavigationProps) {
  const handleTabClick = (tabId: string) => {
    console.log('Tab clicked:', tabId);
    onChange(tabId);
  };
  
  return (
    <div className="w-full overflow-x-auto overflow-y-hidden flex justify-start md:justify-center border-b border-border/60 bg-background/95 backdrop-blur-sm sticky top-0 z-10 px-4">
      <div className="flex space-x-1 relative py-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out outline-none",
              "flex items-center gap-2",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground/90"
            )}
            type="button"
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <div className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full tab-indicator" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
