import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.js';
import { ScrollArea } from '@/components/ui/scroll-area.js';
import { Separator } from '@/components/ui/separator.js';
import { ControlPanelSection } from './ControlPanelSection.js';
import type { ControlPanelProps } from './types.js';

export const ControlPanel: React.FC<ControlPanelProps> = ({
  panel,
  onItemSelect,
  selectedItemId,
}) => {
  const handleItemSelect = (itemId: string) => {
    onItemSelect?.(itemId);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>{panel.title}</CardTitle>
        {panel.description && <CardDescription>{panel.description}</CardDescription>}
      </CardHeader>
      <Separator />
      <CardContent className="p-0 pt-2">
        <ScrollArea className="h-[calc(100vh-220px)] px-3 py-2">
          <ControlPanelSection
            title={panel.title}
            items={panel.items}
            selectedItemId={selectedItemId}
            onItemSelect={handleItemSelect}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
