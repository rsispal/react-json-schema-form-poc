import { FC } from "react";
import { SectionBlock } from "../../../../fields/SectionBlock/";
import { QuestionFieldRenderProps } from "../../QuestionField/QuestionField.types";
import { SectionBlockProperties } from "../../QuestionForm.types";

export const SectionBlockFieldWrapper: FC<
  QuestionFieldRenderProps<SectionBlockProperties>
> = ({ question }) => (
  <SectionBlock
    {...question.properties}
    dataTestId={`${question.name}-section-block`}
  />
);
