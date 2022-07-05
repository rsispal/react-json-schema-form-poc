import { DynamicTextParagraph } from "../../DynamicText/DynamicText.types";

export interface WarningProps {
  prompt: DynamicTextParagraph[];
  continueButtonLabel: string;
  endFormButtonLabel: string;
  showEndFormButton: boolean;
  onContinueClick: () => void;
  onEndFormClick: () => void;
}
