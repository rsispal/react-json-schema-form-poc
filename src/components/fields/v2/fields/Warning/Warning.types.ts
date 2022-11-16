import { AlertProps } from "@chakra-ui/react";
import { DynamicTextParagraph } from "../../../../DynamicText/DynamicText.types";

export interface WarningProps extends AlertProps {
  prompt: DynamicTextParagraph[];
  continueButtonLabel: string;
  endFormButtonLabel: string;
  showEndFormButton: boolean;
  onContinueClick: () => void;
  onEndFormClick: () => void;
  dataTestId?: string;
}
