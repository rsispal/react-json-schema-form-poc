import { TextItem, URLItem } from "../../DynamicText/DynamicText.types";

export interface PromptProps {
  prompt: (TextItem | URLItem)[];
  continueButtonLabel: string;
  endFormButtonLabel: string;
  showEndFormButton: boolean;
  onContinueClick: () => void;
  onEndFormClick: () => void;
}
