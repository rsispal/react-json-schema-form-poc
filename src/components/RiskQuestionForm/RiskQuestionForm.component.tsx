import { Box } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { QuestionForm } from "../QuestionForm/rc-field-form";
import { RiskQuestionFormProps } from "./RiskQuestionForm.types";

export const RiskQuestionForm: FC<RiskQuestionFormProps> = ({
  schema,
  onSubmitCallback,
  onEndFormCallback,
}) => {
  const [values, setValues] = useState<
    Record<string, string | boolean | undefined>
  >({});

  const handleSubmit = (
    answers: Record<string, string | boolean | undefined>
  ) => {
    console.log("[RiskQuestionForm] Submit", { answers });
    onSubmitCallback(answers);
  };
  const handleFormChange = (
    answers: Record<string, string | boolean | undefined>
  ) => setValues(answers);

  const handleEndFormClick = () => {
    console.log("[RiskQuestionForm] End", {});
    onEndFormCallback(values);
  };

  const handleSpecificCondition = (
    values: Record<string, string | boolean | undefined>
  ) => {
    const isQ1AnsweredAsYes = values["Q1"] === "YES";
    const isQ1_1_YLinkClicked = values["Q1_1_Y"];
    if (isQ1AnsweredAsYes && isQ1_1_YLinkClicked) {
      console.log(
        "User has gone to pensionwise via link. Submitting form answers"
      );
      handleSubmit(values);
    }
  };

  useEffect(() => {
    handleSpecificCondition(values);
    // onChangeCallback && onChangeCallback(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

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
