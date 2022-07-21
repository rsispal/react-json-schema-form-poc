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

export type DynamicTextParagraph = {
  type: "paragraph";
  content: (TextItem | URLItem)[];
};

export interface DynamicTextProps {
  data: DynamicTextParagraph[];
  dataTestId?: string;
}
