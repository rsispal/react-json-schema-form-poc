import { TextItem, URLItem } from "../../DynamicText/DynamicText.types";

export interface WarningProps {
  prompt: (TextItem | URLItem)[];
  continueButtonLabel: string;
  endFormButtonLabel: string;
  showEndFormButton: boolean;
  onContinueClick: () => void;
  onEndFormClick: () => void;
}
