# Usage Instructions: Schema-based form

WIP

How does the component work?
The form operates in a state machine-like way, where for each question, all possible links are defined based on the input type. Once a question is answered, the next question will be rendered until all questions have been answered.

Whilst offering flexibility, the form can easily be broken by a missing transition (i.e. if you forget to define a valid transition based on a RadioGroup option, there will be no next question).

Please read the documentation **carefully** before attempting any modifications.

## Implementation details

```
QuestionForm -< QuestionField - FieldWrapper - Field

QuestionForm -< QuestionField - LinkButtonWrapper -   LinkButton
                              - RadioGroupWrapper - RadioGroup
                              - TextInputWrapper - TextInput
                              - NextQuestionButtonWrapper - NextQuestionButton
                              - ButtonGroupWrapper - ButtonGroup
                              - PromptWrapper - Prompt
                              - WarningWrapper - Warning
                              - SubmitButtonWrapper - SubmitButton


```

## JSON form schema

```json

```

## Question schema

## 1. Supported Fields

| Supported Field Type |     Field Code     | Description |
| :------------------: | :----------------: | :---------- |
|     Link Button      |     LinkButton     |             |
|  Radio Button Group  |     RadioGroup     |             |
|      Text Field      |     TextInput      |             |
| Next Question Button | NextQuestionButton |             |
|     Button Group     |    ButtonGroup     |             |
|        Prompt        |       Prompt       |             |
|       Warning        |      Warning       |             |
|    Submit Button     |    SubmitButton    |             |

### 1.1 LinkButton

| Property | Type | Description |
| :------: | :--: | :---------- |
|          |      |             |
|          |      |             |
|          |      |             |
|          |      |             |

### 1.2 RadioGroup

| Property | Type | Description |
| :------: | :--: | :---------- |
|          |      |             |
|          |      |             |
|          |      |             |
|          |      |             |

### 1.3 TextInput

| Property | Type | Description |
| :------: | :--: | :---------- |
|          |      |             |
|          |      |             |
|          |      |             |
|          |      |             |

### 1.4 NextQuestionButton

| Property | Type | Description |
| :------: | :--: | :---------- |
|          |      |             |
|          |      |             |
|          |      |             |
|          |      |             |

### 1.5 ButtonGroup

| Property | Type | Description |
| :------: | :--: | :---------- |
|          |      |             |
|          |      |             |
|          |      |             |
|          |      |             |

### 1.6 Prompt

| Property | Type | Description |
| :------: | :--: | :---------- |
|          |      |             |
|          |      |             |
|          |      |             |
|          |      |             |

Note: Warnings and validation properties have no effect on this field type.

### 1.7 Warning

| Property | Type | Description |
| :------: | :--: | :---------- |
|          |      |             |
|          |      |             |
|          |      |             |
|          |      |             |

It is possible to render a arning within a Question block, by including a `warnings` array on the Question entry itself. Define a NextFieldTransition with a value used by the Question and the warning name that should be rendered.

If a Question has a warning definition (NextFieldTransition), this will intercept the next question and prevent its display _until_ the continue button on the warning is pressed.

Note: Warnings and validation properties have no effect on this field type.

### 1.8 SubmitButton

| Property | Type | Description |
| :------: | :--: | :---------- |
|          |      |             |
|          |      |             |
|          |      |             |
|          |      |             |
