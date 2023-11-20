import { HTMLAttributeAnchorTarget } from "react";

export interface NextQuestionButtonProps {
  label: string;
  disabled?: boolean;
  onClickCallback: () => void;
  dataTestId?: string;
}
