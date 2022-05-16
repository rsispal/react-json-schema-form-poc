import { HTMLAttributeAnchorTarget } from "react";

export interface LinkButtonProps {
  label: string;
  url: string;
  target: HTMLAttributeAnchorTarget;
  disabled?: boolean;
}
