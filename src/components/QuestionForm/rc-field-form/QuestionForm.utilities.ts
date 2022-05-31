import {
  NextFieldTransition,
  Question,
  RadioGroupProperties,
  SupportedFormField,
  WarningProperties,
} from "./QuestionForm.types";

export namespace QuestionFormUtilities {
  /**
   * @function getFirstQuestion - get the first question from an array of questions
   * @param questions {Question[]} - array of questions
   * @returns Question | undefined
   */
  export const getFirstQuestion = (questions: Question[]) => questions.at(0);

  /**
   * @function getLastQuestion - get the last question from an array of questions
   * @param questions {Question[]} - array of questions
   * @returns Question | undefined
   */
  export const getLastQuestion = (questions: Question[]) =>
    questions.at(questions.length - 1);

  /**
   * @function getAllParentQuestions - get non-child questions from an array of questions
   * @param questions {Question[]} - array of questions
   * @returns Question[]
   */
  export const getAllParentQuestions = (questions: Question[]) =>
    questions.filter(({ isChildQuestion }) => isChildQuestion === false);

  /**
   * @function getQuestionByName - get a question by the name attribute within the field object
   * @param questions {Question[]} - array of questions
   * @param name {string} - field name
   * @returns Question | undefined
   */
  export const getQuestionByName = (questions: Question[], name: string) =>
    questions.filter((q) => q.name === name).at(0);

  /**
   * @function getChildQuestionsForParent - get any applicable warnings based on a provided "current" value
   * @param warnings {WarningProperties[] | undefined} - warnings array
   * @param currentValue {string | undefined} - current value to compare against
   * @returns WarningProperties[]
   */
  export const getChildQuestionsForParent = (
    questions: Question[],
    childQuestions: NextFieldTransition[] | undefined,
    currentValue: string | undefined
  ) =>
    questions.filter((question) =>
      (childQuestions || [])
        .filter(({ equals }) => equals === currentValue)
        .map((f) => f.question)
        .includes(question.name)
    );

  /**
   * @function getWarningsForField - get any applicable warnings based on a provided "current" value
   * @param warnings {WarningProperties[] | undefined} - warnings array
   * @param currentValue {string | undefined} - current value to compare against
   * @returns WarningProperties[]
   */
  export const getWarningsForField = (
    warnings: WarningProperties[] | undefined,
    currentValue: string | undefined
  ) => warnings?.filter(({ equals }) => equals === currentValue) || [];

  /**
   * @function getRadioGroupOptionForQuestionByValue - get the radio option corresponding to a specific value
   * @param question  {Question} - question with RadioGroup field
   * @param currentValue {string | undefined} - specific value to lookup with
   * @returns RadioOption | undefined
   */
  export const getRadioGroupOptionForQuestionByValue = (
    question: Question,
    currentValue: string
  ) => {
    if (question.type === SupportedFormField.RadioGroup) {
      return (question.properties as RadioGroupProperties).options
        .filter((entry) => entry.value === currentValue)
        .at(0);
    }
    return undefined;
  };
}
