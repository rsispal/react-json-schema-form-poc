import { HTMLAttributeAnchorTarget } from "react";

export interface LinkButtonProps {
  label: string;
  url: string;
  target: HTMLAttributeAnchorTarget;
  disabled?: boolean;
  onClickCallback: (url: string) => void;
}
