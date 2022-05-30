import { HTMLAttributeAnchorTarget } from "react";

export type TextItem = {
  type: "text";
  value: string;
};

export type URLItem = {
  type: "url";
  label: string;
  url: string;
  target: HTMLAttributeAnchorTarget;
};

export interface DynamicTextProps {
  data: (TextItem | URLItem)[];
}
