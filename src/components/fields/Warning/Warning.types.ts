import { TextItem, URLItem } from "../../DynamicText/DynamicText.types";

export interface WarningProps {
  prompt: (TextItem | URLItem)[];
  onContinueClick: () => void;
  onEndFormClick: () => void;
}
