import { SectionBlockProperties, SchemaDrivenQuestionFieldWrapperProps } from "components/QuestionForm/formik-v2/types";
import { FC } from "react";
import SectionBlock from "../../fields/SectionBlock";

export const SectionBlockFieldWrapper: FC<SchemaDrivenQuestionFieldWrapperProps<SectionBlockProperties>> = ({ question }) => (
  <SectionBlock dataTestId={`${question.id}-section-block`} title={question.properties.title} description={undefined} />
);
