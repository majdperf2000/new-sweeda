export interface ControlPanelItem {
  id: string;
  title: string;
  description?: string;
  children?: ControlPanelItem[];
}

export interface ControlPanel {
  id: string;
  title: string;
  description?: string;
  items: ControlPanelItem[];
}

export interface ControlPanelProps {
  panel: ControlPanel;
  onItemSelect?: (itemId: string) => void;
  selectedItemId?: string;
}
