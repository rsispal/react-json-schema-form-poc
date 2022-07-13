import { DynamicTextParagraph } from "../../DynamicText/DynamicText.types";

export interface PromptProps {
  prompt: DynamicTextParagraph[];
  continueButtonLabel: string;
  endFormButtonLabel: string;
  showEndFormButton: boolean;
  onContinueClick: () => void;
  onEndFormClick: () => void;
  dataTestId?: string;
}
