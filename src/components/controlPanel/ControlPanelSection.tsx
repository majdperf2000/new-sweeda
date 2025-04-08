import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion.js';
import { ControlPanelItem } from './ControlPanelItem.js';
import type { ControlPanelItem as ControlPanelItemType } from './types.js';

interface ControlPanelSectionProps {
  title: string;
  items: ControlPanelItemType[];
  selectedItemId?: string;
  onItemSelect: (itemId: string) => void;
}

export const ControlPanelSection: React.FC<ControlPanelSectionProps> = ({
  title,
  items,
  selectedItemId,
  onItemSelect,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="items">
      <AccordionItem value="items" className="border-none">
        <AccordionTrigger className="font-semibold text-lg py-3 px-4 hover:bg-accent hover:no-underline rounded-md">
          {title}
        </AccordionTrigger>
        <AccordionContent className="pt-2 px-1">
          <div className="space-y-1">
            {items.map((item) => (
              <ControlPanelItem
                key={item.id}
                item={item}
                level={1}
                isSelected={selectedItemId === item.id}
                onSelect={onItemSelect}
                expandedItems={expandedItems}
                toggleExpanded={toggleExpanded}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
