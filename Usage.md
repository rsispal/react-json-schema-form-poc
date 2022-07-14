# Usage Instructions: Schema-based form

## How does the QuestionForm component work?

The form operates in a state machine-like way, where for each question, all possible links are defined based on (a) each possible answer (i.e. radio button options) (b) the validity of a field (is a text field value passing the validation?). Once a question is answered, applicable question transitions will be rendered as the next question(s) until all questions have been answered and the submit button is reached.

Whilst offering flexibility, the form can easily be broken by a missing transition (i.e. if you forget to define a valid transition based on a RadioGroup option, there will be no next question).

Please read the documentation **carefully** before attempting any modifications and extensively test _all_ possible answer paths.

It's recommended to create a process diagram (i.e. flowchart) detailing each question (and the field type), and the possible answers. From there, you can simplify the creation of the schema whilst closely following these instructions.

### Schema Configuration

The schema can either be delivered as a JavaScript object (allowing it to be stored within the codebase), or in JSON format (allowing it to be stored elsewhere).

The schema object itself requires four key parameters: `schemaVersionMajor`, `schemaVersionMinor`, `formName`, `questions`:

|        Field         |             Type              | Description                                                                                      |
| :------------------: | :---------------------------: | :----------------------------------------------------------------------------------------------- |
| `schemaVersionMajor` |        number (float)         | The schema version                                                                               |
| `schemaVersionMinor` |        number (float)         | The revision of the defined question set                                                         |
|      `formName`      |            string             | The name of the form to be added onto the HTML form element                                      |
|     `questions`      | Question<QuestionFieldType>[] | An array of Question objects defining the field, properties, transitions and validation criteria |

### Understanding the Question object

For simplicity, the Question object is standardised across all supported input field types. The `properties` property is a generic type that allows specific properties for that particular field to be defined. These are passed directly through the FieldWrapper.

```tsx
export type Question<T> = {
  /**
   * @property id {string} - a unique identifier for this question (for business reference, and used as React node key - uuidv4 recommended)
   */
  id: string;
  /**
   * @property name {string} - the name of the field which the value will be stored against
   */
  name: string;
  /**
   * @property exclude {boolean} - hide the question from rendering independently (i.e. for rendering dependency-style questions)
   */
  exclude: boolean;
  /**
   * @property type {SupportedFormField} - the kind of field to generate
   */
  type: SupportedFormField;
  /**
   * @property prompt {string} - question/prompt to show for this field (optional)
   */
  prompt?: string;
  /**
   * @property properties - field-specific configuration properties (see instructions)
   */
  properties: T;
  /**
   * @property validation {FieldProps["rules"] | undefined} - Async Validator static validation rules (functions not supported in JSON schemas)
   */
  validation?: FieldProps["rules"];
  /**
   * @property next {NextFieldTransition[]} - value-based transition rules for question chaining (must be define for _all_ answers)
   */
  next?: NextFieldTransition[];
  /**
   * @property warnings {WarningProperties} - value-based warnings to display (use _only_ when you require a warning to be displayed as a child of this Question)
   */
  warnings?: NextFieldTransition[];
};
```

|  Property  |          Type           | Description                                                                                                     |
| :--------: | :---------------------: | :-------------------------------------------------------------------------------------------------------------- |
|     id     |        `string`         | a unique identifier for this question (for business reference, and used as React node key - uuidv4 recommended) |
|    name    |        `string`         | the name of the field which the value will be stored against                                                    |
|  exclude   |        `boolean`        | hide the question from rendering independently (ideal for child questions)                                      |
|    type    |  `SupportedFormField`   | the kind of field to generate                                                                                   |
|   prompt   |        `string`         | question/prompt to show for this field (optional)                                                               |
| properties |           `T`           | field-specific configuration properties (see instructions)                                                      |
| validation |  `FieldProps["rules"]`  | Async Validator static validation rules (functions not supported in JSON schemas)                               |
|    next    | `NextFieldTransition[]` | value-based transition rules for question chaining (must be defined for _all_ possible answers)                 |
|  warnings  | `NextFieldTransition[]` | value-based warnings to display within the Question                                                             |

### Supported Field Types

In this current version, the following fields are able to be used within a schema. When defining a schema, utilise the Field Code as the `type` (see Schema Configuration below)

| Supported Field Type |     Field Code     | Description                                                                                                                   |
| :------------------: | :----------------: | :---------------------------------------------------------------------------------------------------------------------------- |
|     Link Button      |     LinkButton     | A button that opens a URL, which is also recorded with a boolean when the button is pressed                                   |
|  Radio Button Group  |     RadioGroup     | A group of radio button options                                                                                               |
|      Text Field      |     TextInput      | A text input field                                                                                                            |
| Next Question Button | NextQuestionButton | A button that can navigate to the next question                                                                               |
|     Button Group     |    ButtonGroup     | A special field kind which allows group of buttons (LinkButton, NextQuestionButton or SubmitButton) to be offered to the user |
|        Prompt        |       Prompt       | A dialog-style message with two buttons: continue and end form                                                                |
|       Warning        |      Warning       | A dialog-style warning message with two buttons: continue and end form                                                        |
|    Submit Button     |    SubmitButton    | A button that will trigger a form submission                                                                                  |

### Additional Components Used

| Supported Field Type |       Properties       |                                                      Description                                                       |
| :------------------: | :--------------------: | :--------------------------------------------------------------------------------------------------------------------: |
|     Dynamic Text     | `DynamicTextParagraph` | This component allows complex text strings to be generated which can include inline links (see below for instructions) |

Below, are details on how to implement each type of Field, as well as information on creating transitions (NextFieldTransition) and warnings.

### Validation

Unless otherwise stated, each `Question` object supports Async Validator properties. As the form is interacted with and new transitions occur, the validation schema is rebuilt and applied to the current value set. Any errors will then be presented and the form will not be submittable until these are _all_ resolved.

A JSON schema will obviously only support simple validation rules. However, if the form schema is implemented in JavaScript, more complex validators can be produced.

Please [refer to the Async Validator library for information on how to create these rules](https://github.com/yiminghe/async-validator).

## QuestionForm

This is a small wrapper around the underlying form component. The following functionality is handled within this component:

- Question schema is rendered into QuestionField components (see below)
- Validator is applied to the responses on each field change
- Submission is processed and returned via callback

Below are the properties that require definition, as well as an example:

|           Property            |                                                       Type                                                        | Description                                                                                                                                                                                                      |
| :---------------------------: | :---------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|       onChangeCallback        |              `onChangeCallback?: (results: Record<string, string \| boolean \| undefined>) => void;`              | Callback function which is fired when a field is changed. The results parameter will include the latest form value set at the point of change.                                                                   |
|       onSubmitCallback        |              `onSubmitCallback: (results: Record<string, string \| boolean \| undefined>) => void;`               | Callback function which is fired when a submit button is pressed. The results parameter will include the latest form value set at the point of submission.                                                       |
|        renderQuestion         |                            `renderQuestion: (children: ReactElement) => ReactElement;`                            | Render prop. This allows you to wrap each Question field in your own UI (i.e. a card component). The children parameter contains the Question field.                                                             |
|    onEndFormClickCallback     |                                       `onEndFormClickCallback: () => void;`                                       | Render prop. Here you can specify your own Field via a wrapper. The props object contains a `question (type: Question)` and an `onEndFormCallback` callback function (which is optional based on the field type) |
|     renderLinkButtonField     |         `renderLinkButtonField: (props: QuestionFieldRenderProps<LinkButtonProperties>) => ReactElement;`         | Render prop. Here you can specify your own Field via a wrapper. The props object contains a `question (type: Question)` and an `onEndFormCallback` callback function (which is optional based on the field type) |
|     renderRadioGroupField     |         `renderRadioGroupField: (props: QuestionFieldRenderProps<RadioGroupProperties>) => ReactElement;`         | Render prop. Here you can specify your own Field via a wrapper. The props object contains a `question (type: Question)` and an `onEndFormCallback` callback function (which is optional based on the field type) |
|     renderTextInputField      |          `renderTextInputField: (props: QuestionFieldRenderProps<TextInputProperties>) => ReactElement;`          | Render prop. Here you can specify your own Field via a wrapper. The props object contains a `question (type: Question)` and an `onEndFormCallback` callback function (which is optional based on the field type) |
| renderNextQuestionButtonField | `renderNextQuestionButtonField: (props: QuestionFieldRenderProps<NextQuestionButtonProperties>) => ReactElement;` | Render prop. Here you can specify your own Field via a wrapper. The props object contains a `question (type: Question)` and an `onEndFormCallback` callback function (which is optional based on the field type) |
|    renderButtonGroupField     |        `renderButtonGroupField: (props: QuestionFieldRenderProps<ButtonGroupProperties>) => ReactElement;`        | Render prop. Here you can specify your own Field via a wrapper. The props object contains a `question (type: Question)` and an `onEndFormCallback` callback function (which is optional based on the field type) |
|       renderPromptField       |             `renderPromptField: (props: QuestionFieldRenderProps<PromptProperties>) => ReactElement;`             | Render prop. Here you can specify your own Field via a wrapper. The props object contains a `question (type: Question)` and an `onEndFormCallback` callback function (which is optional based on the field type) |
|      renderWarningField       |            `renderWarningField: (props: QuestionFieldRenderProps<WarningProperties>) => ReactElement;`            | Render prop. Here you can specify your own Field via a wrapper. The props object contains a `question (type: Question)` and an `onEndFormCallback` callback function (which is optional based on the field type) |
|    renderFieldErrorMessage    |                        `renderFieldErrorMessage: (error: ValidateError) => ReactElement;`                         | Render prop. Here you can specify your own Field via a wrapper. The props object contains a `question (type: Question)` and an `onEndFormCallback` callback function (which is optional based on the field type) |
|    renderSubmitButtonField    |       `renderSubmitButtonField: (props: QuestionFieldRenderProps<SubmitButtonProperties>) => ReactElement;`       | Render prop. Here you can specify your own Field via a wrapper. The props object contains a `question (type: Question)` and an `onEndFormCallback` callback function (which is optional based on the field type) |

With this approach, further fields can be implemented per future requirements.

### Example

```tsx
return (
  <QuestionForm
    renderQuestion={generateQuestionFieldCard}
    onSubmitCallback={handleSubmit}
    onChangeCallback={handleFormChange}
    onEndFormClickCallback={handleEndFormClick}
    renderLinkButtonField={(props) => <LinkButtonWrapper {...props} />}
    renderRadioGroupField={(props) => <RadioGroupWrapper {...props} />}
    renderTextInputField={(props) => <TextInputWrapper {...props} />}
    renderNextQuestionButtonField={(props) => (
      <NextQuestionButtonWrapper {...props} />
    )}
    renderButtonGroupField={(props) => <ButtonGroupWrapper {...props} />}
    renderPromptField={(props) => <PromptWrapper {...props} />}
    renderWarningField={(props) => <WarningWrapper {...props} />}
    renderSubmitButtonField={(props) => <SubmitButtonWrapper {...props} />}
    renderFieldErrorMessage={(error) => (
      <MyErrorMessage color="red">{error.message}</MyErrorMessage>
    )}
    {...schema} // QuestionSchema
  />
);
```

### 1.1 LinkButton

| Property |            Type             | Description                                                                                                                    |
| :------: | :-------------------------: | :----------------------------------------------------------------------------------------------------------------------------- |
| disabled |          `boolean`          | Set to true to disable this button                                                                                             |
|  label   |          `string`           | The label to display on the button                                                                                             |
|   url    |          `string`           | The URL link that the button will load on press                                                                                |
|  target  | `HTMLAttributeAnchorTarget` | The [HTML anchor target](https://www.w3schools.com/tags/att_a_target.asp) (`target="_blank\|_self\|_parent\|_top\|framename"`) |

#### Example

Below is a complete example with the above field properties in use

```json
    {
      "id": "Q1_1_Y",
      "name": "Q1_1_Y",
      "exclude": true,
      "type": "LinkButton",
      "prompt": "",
      "properties": {
        "disabled": false,
        "label": "Help me book PensionWise appointment",
        "url": "https://www.hl.co.uk/retirement/preparing/pension-wise",
        "target": "_blank"
      },
      "warnings": [],
      "next": []
    },


```

### 1.2 RadioGroup

| Property |                 Type                  | Description                                                                               |
| :------: | :-----------------------------------: | :---------------------------------------------------------------------------------------- |
| disabled |               `boolean`               | Set to true to disable this radio group                                                   |
| options  | `{ value: string; label: string }[];` | Array of option objects which define a value and label to display on each required option |

#### Example

Below is a complete example with the above field properties in use

```json
    {
      "id": "Q2",
      "name": "Q2",
      "exclude": false,
      "type": "RadioGroup",
      "prompt": "Have you received personal advice from a regulated Financial Advisor?",
      "properties": {
        "disabled": false,
        "options": [
          {
            "value": "YES",
            "label": "Yes - I've received personalised advice"
          },
          {
            "value": "NO",
            "label": "No - I have not received personal advice"
          }
        ]
      },
      "warnings": [],
      "next": [
        {
          "equals": "NO",
          "question": "Enter the question name which should be rendered when NO is selected"
        },
        {
          "equals": "YES",
          "question": "Enter the question name which should be rendered when YES is selected"
        }
      ]
    },

```

### 1.3 TextInput

|   Property   |       Type       | Description                                                               |
| :----------: | :--------------: | :------------------------------------------------------------------------ |
|   disabled   |    `boolean`     | Set to true to disable this text input                                    |
| placeholder  |     `string`     | (optional) placeholder text to display when the field contains _no_ value |
| initialValue | `string \| null` | (optional) value to pre-fill the field with                               |

#### Example

Below is a complete example with the above field properties in use

```json
{
  "id": "Q4",
  "name": "Q4",
  "exclude": false,
  "type": "TextInput",
  "prompt": "Question 4",
  "properties": {
    "disabled": false,
    "placeholder": "Enter a value...",
    "initialValue": null
  },
  "warnings": [],
  "validation": [{ "required": true, "message": "You must enter a value" }],
  "next": [
    {
      "valid": true,
      "question": "Q4"
    }
  ]
}
```

### 1.4 NextQuestionButton

| Property |   Type    | Description                          |
| :------: | :-------: | :----------------------------------- |
| disabled | `boolean` | Set to true to disable this button   |
|  label   | `string`  | The label to display over the button |

#### Example

Below is a complete example with the above field properties in use

```json
{
  "id": "Q1A_2",
  "name": "Q1A_2",
  "exclude": true,
  "type": "NextQuestionButton",
  "prompt": "",
  "properties": {
    "disabled": false,
    "label": "I'm happy with my guidance, next question"
  },
  "warnings": [],
  "next": [
    {
      "equals": true,
      "question": "Q2"
    }
  ]
}
```

### 1.5 ButtonGroup

| Property |                                             Type                                             | Description                                                                                                                                                |
| :------: | :------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| buttons  | `Question<LinkButtonProperties \| NextQuestionButtonProperties \| SubmitButtonProperties>[]` | An array of Question objects for either a LinkButton, NextQuestionButton or SubmitButton (see respective field properties for implementation instructions) |

#### Example

Below is a complete example with the above field properties in use

```json
    {
      "id": "Q1A_ButtonGroup",
      "name": "Q1A_ButtonGroup",
      "exclude": false,
      "type": "ButtonGroup",
      "properties": {
        "buttons": [
          {
            "id": "Q1A_1",
            "name": "Q1A_1",
            "exclude": true,
            "type": "LinkButton",
            "prompt": "",
            "properties": {
              "disabled": false,
              "label": "Help me book PensionWise appointment",
              "url": "https://www.hl.co.uk/retirement/preparing/pension-wise",
              "target": "_blank"
            },
            "warnings": [],
            "next": []
          },

          {
            "id": "Q1A_2",
            "name": "Q1A_2",
            "exclude": true,
            "type": "NextQuestionButton",
            "prompt": "",
            "properties": {
              "disabled": false,
              "label": "I'm happy with my guidance, next question"
            },
            "warnings": [],
            "next": [
              {
                "equals": true,
                "question": "Q2"
              }
            ]
          }
        ]
      }
    },
```

### 1.6 Prompt

|      Property       |           Type           | Description                                                                                                 |
| :-----------------: | :----------------------: | :---------------------------------------------------------------------------------------------------------- |
|       prompt        | `DynamicTextParagraph[]` | DynamicText text or URL objects to render as the prompt message (see below for implementation instructions) |
| continueButtonLabel |         `string`         | Label to display on continue button                                                                         |
| endFormButtonLabel  |         `string`         | Label to display on end form button                                                                         |
|  showEndFormButton  |        `boolean`         | Set to true to hide the end form button                                                                     |

Note: Warnings and validation properties have no effect on this field type.

#### Example

Below is a complete example with the above field properties in use

```json
    {
      "id": "Q2Prompt",
      "name": "Q2Prompt",
      "exclude": false,
      "type": "Prompt",
      "properties": {
        "prompt": [
          {
            "type": "text",
            "value": "What you do with your pension is an important decision. If you haven't received "
          },
          {
            "type": "url",
            "label": "Pension Wise",
            "url": "https://www.pensionwise.gov.uk/"
          },
          {
            "type": "text",
            "value": " guidance or "
          },
          {
            "type": "url",
            "label": "personal advice",
            "url": "https://www.hl.co.uk/financial-advice/moving-a-pension-into-drawdown"
          },
          {
            "type": "text",
            "value": ", we strongly suggest you do this before proceeding."
          }
        ],
        "continueButtonLabel": "I agree, continue",
        "endFormButtonLabel": "End risk questions",
        "showEndFormButton": false
      },
      "warnings": [],
      "next": []
    },

```

### 1.7 SubmitButton

| Property |   Type    | Description                          |
| :------: | :-------: | :----------------------------------- |
| disabled | `boolean` | Set to true to disable this button   |
|  label   | `string`  | The label to display over the button |

#### Example

```json
{
  "id": "Q5_SubmitButton",
  "name": "Q5_SubmitButton",
  "exclude": false,
  "type": "SubmitButton",
  "prompt": "",
  "properties": {
    "disabled": false,
    "label": "Submit this form"
  },
  "warnings": [],
  "next": []
}
```

### 1.8 Warning

|      Property       |           Type           | Description                                                                                                 |
| :-----------------: | :----------------------: | :---------------------------------------------------------------------------------------------------------- |
|       prompt        | `DynamicTextParagraph[]` | DynamicText text or URL objects to render as the prompt message (see below for implementation instructions) |
| continueButtonLabel |         `string`         | Label to display on continue button                                                                         |
| endFormButtonLabel  |         `string`         | Label to display on end form button                                                                         |
|  showEndFormButton  |        `boolean`         | Set to true to hide the end form button                                                                     |

Note: Warnings and validation properties have no effect on this field type.

It is possible to render a warning within a Question block, by including a `warnings` array on the Question entry itself. Define a NextFieldTransition with a value used by the Question and the warning name that should be rendered.

If a Question has a warning definition (NextFieldTransition), this will intercept the next question and prevent its display _until_ the continue button on the warning is pressed.

Note: Warnings and validation properties have no effect on this field type.

#### Example

Below is a complete example with the above field properties in use

```json
 {
      "id": "uuidv4 here",
      "name": "Q4_Warning_On_No_Selection",
      "exclude": false,
      "type": "Warning",
      "properties": {
        "prompt": [
          {
            "type": "paragraph",
            "value": [
               {
                "type": "text",
                "value": "This is the warning that will be generated based on the answer for Question 4 in this example"
              }
            ]
          }
        ],
        "continueButtonLabel": "I agree, continue",
        "endFormButtonLabel": "End risk questions",
        "showEndFormButton": true
      },
      "warnings": [],
      "next": [
        {
          "equals": true,
          "question": "Q5"
        }
      ]
    },

```

### Dynamic Text

| Property |           Type           | Description                                                     |
| :------: | :----------------------: | :-------------------------------------------------------------- |
|   data   | `DynamicTextParagraph[]` | DynamicText text or URL objects to render as the prompt message |

#### TextItem:

| Property |   Type   | Description        |
| :------: | :------: | :----------------- |
|   type   | `string` | fixed value "text" |
|  value   | `string` | Text to render     |

#### URLItem:

| Property |            Type             | Description                                                                                                                    |
| :------: | :-------------------------: | :----------------------------------------------------------------------------------------------------------------------------- |
|   type   |          `string`           | fixed value "url"                                                                                                              |
|  label   |          `string`           | Label to display as the link                                                                                                   |
|   url    |          `string`           | URL to load on press                                                                                                           |
|  target  | `HTMLAttributeAnchorTarget` | The [HTML anchor target](https://www.w3schools.com/tags/att_a_target.asp) (`target="_blank\|_self\|_parent\|_top\|framename"`) |

#### Example

```tsx
const text: DynamicTextParagraph[] = [
  {
    type: paragraph,
    value: [
      {
        type: "text",
        value: "Paragraph 1. This is some text. ",
      },
      {
        type: "url",
        url: "https://google.co.uk",
        label: "This is a URL",
      },
      {
        type: "text",
        value: ". This is some more text",
      },
    ],
  },
  {
    type: paragraph,
    value: [
      {
        type: "text",
        value: "Paragraph 2. This is some text. ",
      },
      {
        type: "url",
        url: "https://google.co.uk",
        label: "This is a URL",
      },
      {
        type: "text",
        value: ". This is some more text",
      },
    ],
  },
];

return <DynamicText data={text} />;
```

# Guidance for the use of Warning field type

Warnings can be implemented in two different ways, and both require a Question to be defined with the Warning properties as described in previous sections.

There are two choices for how Warnings can be displayed:

- Option 1: Rendered separate to the Question as a peer component (just as any other Field type detailed above)
- Option 2: Rendered within the Question (within the Field) as a child element ()

## Option 1

Option 1 is the simplest, in the sense that it follows the exact convention of defining a Question but with a Warning as the field type. You define the `next` transition on the preceding question so that the warning can be displayed based on the user's answer. You do not need to add any configuration to the preceding question's `warnings` property.

Here's an example:

```
# When answering yes:
[Question 1: YES] -> [Question 2] -> ...
```

```
# When answering no:
[Question 1: NO] -> [Q1_Warning: acknowledged] -> [Question 2] -> ...
```

```json
   {
      "id": "Q1",
      "type": "RadioGroup",
      "prompt": "This is question 1",
      "properties": {
        "options": [
          {
            "value": "YES",
            "label": "Yes"
          },
          {
            "value": "NO",
            "label": "No"
          }
        ]
      },
      "warnings": [
          // No configuration required (the Warning will be generated as a peer component)
      ],
      "next": [
        {
          "equals": "YES",
          "question": "Q2"
        },
        {
          "equals": "NO",
          "question": "Q1_Warning"
        }
      ]
    },

    {
      "id": "Q1_Warning",
      "type": "Warning",
      "properties": {
        "prompt": [
          {
            // text to be shown for this warning (refer to "Dynamic Text" section)
          }
        ]
      },

      "next": [
        {
          "equals": true,
          "question": "Q6"
        }
      ]
    },

    {
      "id": "Q2",
      "type": "RadioGroup",
      "prompt": "This is question 2",
      // rest of Question configuration
    },


```

## Option 2

When a `next` transition is defined within a Question's `warning` property, the QuestionForm will intercept the generation of the next question and instead generate the desired Warning. Once acknowledged, the next question will be generated as per the previous question's `next` transitions were defined.

Ensure the `next` transition is defined for all answer options so that when the Warning is acknowledged the next question can be generated. Otherwise, your form will reach a break.

Here's an example:

```
# When answering yes:
[Question 1: YES] -> [Question 2] -> ...
```

```
# When answering no:
[Question 1: NO -> Q1_Warning: acknowledged]  -> [Question 2] -> ...
```

```json
   {
      "id": "Q1",
      "type": "RadioGroup",
      "prompt": "This is question 1",
      "properties": {
        "options": [
          {
            "value": "YES",
            "label": "Yes"
          },
          {
            "value": "NO",
            "label": "No"
          }
        ]
      },
      "warnings": [
          // No configuration required (the Warning will be generated as a peer component)
        {
          "equals": "NO",
          "question": "Q1_Warning"
        }
      ],
      "next": [
        {
          "equals": "YES",
          "question": "Q2"
        },
        {
          "equals": "NO",
          "question": "Q2"
        }
      ]
    },

    {
      "id": "Q1_Warning",
      "type": "Warning",
      "properties": {
        "prompt": [
          {
            // text to be shown for this warning (refer to "Dynamic Text" section)
          }
        ]
      },

      "next": [
        {
          "equals": true,
          "question": "Q6"
        }
      ]
    },

    {
      "id": "Q2",
      "type": "RadioGroup",
      "prompt": "This is question 2",
      // rest of Question configuration
    },


```
