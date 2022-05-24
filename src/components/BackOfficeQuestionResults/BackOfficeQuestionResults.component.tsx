import { FC } from "react";
import { BackOfficeQuestionResultsProps } from "./BackOfficeQuestionResults.types";
import {QuestionFormUtilities } from '../QuestionForm/rc-field-form/QuestionForm.utilities';
import { Text } from "@chakra-ui/react";

export const BackOfficeQuestionResults: FC<BackOfficeQuestionResultsProps> = ({answers, schema}) => (
    <>
    </>
);


    // Object.keys(answers).map(name => {
    // const question = QuestionFormUtilities.getQuestionByName(schema.questions, name);
    // // const option = QuestionFormUtilities.getRadioGroupOptionForQuestionByValue(question, answers[name]);

    // return <Text>{question?.field.prompt}: {answers[name]}</Text>
    // });