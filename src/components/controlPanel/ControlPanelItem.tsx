import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ControlPanelItem } from './controlPanelData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ControlPanelItemProps {
  item: ControlPanelItemType;
  level: number;
  isSelected: boolean;
  onSelect: (itemId: string) => void;
  expandedItems: Set<string>;
  toggleExpanded: (itemId: string) => void;
}

export const ControlPanelItem: React.FC<ControlPanelItemProps> = ({
  item,
  level,
  isSelected,
  onSelect,
  expandedItems,
  toggleExpanded,
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.has(item.id);

  return (
    <div className="w-full">
      <div
        className={cn(
          'flex items-center w-full rounded-md p-2 transition-colors hover:bg-accent group',
          isSelected && 'bg-accent font-medium',
          !hasChildren && 'pl-8'
        )}
        style={{ paddingLeft: !hasChildren ? level * 12 + 'px' : level * 12 - 4 + 'px' }}
      >
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 shrink-0 p-0 mr-1"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded(item.id);
            }}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}

        <div className="flex-1 truncate cursor-pointer" onClick={() => onSelect(item.id)}>
          <div className="font-medium">{item.title}</div>
          {item.description && (
            <div className="text-xs text-muted-foreground truncate">{item.description}</div>
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="pl-4 mt-1">
          {item.children?.map((child) => (
            <ControlPanelItem
              key={child.id}
              item={child}
              level={level + 1}
              isSelected={isSelected && child.id === item.id}
              onSelect={onSelect}
              expandedItems={expandedItems}
              toggleExpanded={toggleExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
};
