import {
  SectionBlockProperties,
  QuestionFieldWrapperProps,
} from "components/QuestionForm/formik-v2/types";
import { FC } from "react";
import SectionBlock from "../../fields/SectionBlock";

export const SectionBlockFieldWrapper: FC<
  QuestionFieldWrapperProps<SectionBlockProperties>
> = ({ question }) => (
  <SectionBlock
    dataTestId={`${question.name}-section-block`}
    title={question.properties.title}
    description={undefined}
  />
);
