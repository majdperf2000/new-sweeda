import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ControlPanel } from './ControlPanel';
import { ControlPanelDetails } from './ControlPanelDetails';
import { controlPanelsData } from './controlPanelData';
import type { ControlPanelItem } from './types';

interface ControlPanelsLayoutProps {
  initialActiveTab?: string;
}

const ControlPanelsLayout: React.FC<ControlPanelsLayoutProps> = ({
  initialActiveTab = controlPanelsData[0].id,
}) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();

  const activePanel = controlPanelsData.find((panel) => panel.id === activeTab);

  // Helper function to find an item by ID in the nested structure
  const findItemById = (items: ControlPanelItem[], id: string): ControlPanelItem | undefined => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  };

  // Find the selected item
  const selectedItem =
    selectedItemId && activePanel ? findItemById(activePanel.items, selectedItemId) : undefined;

  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  // Update active tab when initialActiveTab changes
  useEffect(() => {
    setActiveTab(initialActiveTab);
    setSelectedItemId(undefined);
  }, [initialActiveTab]);

  // Auto select the first item when changing tabs if nothing is selected
  useEffect(() => {
    if (!selectedItemId && activePanel && activePanel.items.length > 0) {
      setSelectedItemId(activePanel.items[0].id);
    }
  }, [activeTab, activePanel, selectedItemId]);

  return (
    <div className="w-full">
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          setSelectedItemId(undefined);
          // Update the URL hash
          window.location.hash = value;
        }}
        className="w-full"
      >
        <TabsList className="mb-6 w-full flex justify-between overflow-x-auto">
          {controlPanelsData.map((panel) => (
            <TabsTrigger
              key={panel.id}
              value={panel.id}
              className="flex-1 flex items-center justify-center gap-2"
            >
              {panel.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {controlPanelsData.map((panel) => (
          <TabsContent key={panel.id} value={panel.id} className="w-full">
            <Separator className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <ControlPanel
                  panel={panel}
                  selectedItemId={selectedItemId}
                  onItemSelect={handleItemSelect}
                />
              </div>
              <div className="md:col-span-2">
                <ControlPanelDetails selectedItem={selectedItem} panelType={panel.id} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ControlPanelsLayout;
