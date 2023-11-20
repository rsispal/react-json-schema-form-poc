import { DynamicTextParagraph } from "components/DynamicText/DynamicText.types";

export interface SectionBlockProps {
  title: string;
  description?: DynamicTextParagraph[];
  dataTestId?: string;
}
