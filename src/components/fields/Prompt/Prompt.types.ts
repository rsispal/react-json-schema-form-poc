import { TextItem, URLItem } from "../../DynamicText/DynamicText.types";

export interface PromptProps {
  prompt: (TextItem | URLItem)[];
  onContinueClick: () => void;
  onEndFormClick: () => void;
}
