import { Box } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { QuestionForm } from "../QuestionForm/rc-field-form";
import { RiskQuestionFormProps } from "./RiskQuestionForm.types";

export const RiskQuestionForm: FC<RiskQuestionFormProps> = ({
  schema,
  onSubmitCallback,
}) => {
  const handleSubmit = (
    answers: Record<string, string | boolean | undefined>
  ) => {
    console.log("[RiskQuestionForm] Submit", { answers });
    // onSubmitCallback();
  };
  const handleFormChange = () => undefined;
  const handleEndFormClick = () => undefined;

  const generateQuestionFieldCard = (children: ReactElement) => (
    <Box
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      padding={6}
      margin={6}
    >
      {children}
    </Box>
  );

  return (
    <QuestionForm
      renderQuestion={generateQuestionFieldCard}
      onSubmitCallback={handleSubmit}
      onChangeCallback={handleFormChange}
      onEndFormClickCallback={handleEndFormClick}
      {...schema}
    />
  );
};
