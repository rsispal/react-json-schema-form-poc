# Usage Instructions: SchemaDrivenQuestionForm

## What is it?

This component at its core is a Formik form utilising Async Validator for static validation rules. Additional logic has been added around the form fields, allowing these to be generated at runtime from a schema file, delivering a great deal of reusability and flexibility.

## How does it work?

Each field is referred to as a Question, and there are a number of different types (explained below) implemented for the Retirement Outcomes drawdown application.

Each Question is "linked" to another with a state machine-like transition property that defines the condition in which that next Question can be rendered.

[WARNING] Whilst offering flexibility, the form can easily be broken by a missing transition (i.e. if you forget to define a valid transition based on a RadioGroup option, there will be no next question).

Please read the documentation **carefully** before attempting any modifications and extensively test _all_ possible answer paths.

It's recommended to create a process diagram (i.e. flowchart) detailing each question (and the field type), and the permitted answers. From there, you can simplify the creation of the schema whilst closely following these instructions.

### Schema Configuration

The schema can either be delivered as a JavaScript object (allowing it to be stored within the codebase), or in JSON format (allowing it to be stored elsewhere).

The schema object itself requires four key parameters: `schemaVersionMajor`, `schemaVersionMinor`, `formName`, `questions`:

|        Field         |                                                  Type                                                   | Description                                                                                                                                     |
| :------------------: | :-----------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `schemaVersionMajor` |                                            `number` (float)                                             | The schema version                                                                                                                              |
| `schemaVersionMinor` |                                            `number` (float)                                             | The revision of the defined question set                                                                                                        |
|      `version`       | `{schemaVersionMajor: number, schemaVersionMinor: number, revisionDate:string, revisionNotes: string }` | Version information about the schema. Version number (vMAJOR.MINOR), revision date and revision description - useful for tracking changes       |     |
|      `formName`      |                                                `string`                                                 | The name of the form to be added onto the HTML form element                                                                                     |
|   `miscellaneous`    |                                          `Record<string, any>`                                          | An object of application-specific data that could be useful for preparing your final submission payload outside of the SchemaDrivenQuestionForm |
|     `questions`      |                                     `Question<QuestionFieldType>[]`                                     | An array of Question objects defining the field, properties, transitions and validation criteria                                                |

#### Example schema

```json
{
  "version": {
    "schemaVersionMajor": 1,
    "schemaVersionMinor": 0,
    "revisionDate": "2023-05-09",
    "revisionNotes": "Revised question 3 to have options in the RadioGroup"
  },
  "formName": "mySpecialTestForm",
  "questions": [
    // questions here
  ]
}
```

### Understanding the Question object

For simplicity, the Question object is standardised across all supported input field types. The `properties` property is a generic type that allows specific properties for that particular field to be defined. These are passed directly through the FieldWrapper.

```tsx
export type Question<T> = {
  /**
   * @property id {string} - a _unique_ identifier for this question (for business reference)
   */
  id: string;
  /**
   * @property type {SupportedFormField} - the kind of field to generate
   */
  type: SupportedFormField;
  /**
   * @property ui {boolean} - wrap the question in the UI wrapper via the QuestionField renderQuestion prop
   */
  ui: boolean;
  /**
   * @property prompt {string} - question/prompt to show for this field (optional)
   */
  prompt?: string;
  /**
   * @property prompt {string} - question/prompt to show for this field (optional)
   */
  description?: DynamicTextParagraph[];
  /**
   * @property properties - field-specific configuration properties (see instructions)
   */
  properties: T;
  /**
   * @property validation {FieldProps["rules"] | undefined} - Async Validator static validation rules (functions not supported in JSON schemas)
   */
  validation?: Rule[];
  /**
   * @property next {NextFieldTransition[]} - value-based transition rules for question chaining (must be define for _all_ answers)
   */
  next?: NextFieldTransition[];
  /**
   * @property warnings {WarningProperties} - value-based warnings to display
   */
  warnings?: NextFieldTransition[];
};
```

|  Property  |          Type           | Description                                                                                                                      |
| :--------: | :---------------------: | :------------------------------------------------------------------------------------------------------------------------------- |
|     id     |        `string`         | a unique identifier for this question (for business reference, and used as React node key - uuidv4 recommended)                  |
|    type    |  `SupportedFormField`   | the kind of field to generate                                                                                                    |
|   prompt   |        `string`         | question/prompt to show for this field (optional)                                                                                |
|     ui     |        `boolean`        | Whether to wrap the Question with a user-provided component (i.e. a card)                                                        |
| properties |           `T`           | field-specific configuration properties (see instructions)                                                                       |
| validation |        `Rule[]`         | [Async Validator](https://github.com/yiminghe/async-validator) static validation rules (functions not supported in JSON schemas) |
|    next    | `NextFieldTransition[]` | value-based transition rules for question chaining (must be defined for _all_ possible answers)                                  |
|  warnings  | `NextFieldTransition[]` | A Question can render a blocking warning based on the NextFieldTransition                                                        |

### Tell me more about the `warnings` property

It is possible to render a warning within a Question block, by including a `warnings` array on the Question entry itself. Define a NextFieldTransition with a value used by the Question and the warning name that should be rendered.

If a Question has a warning definition (NextFieldTransition), this will intercept the next question and prevent its display _until_ the continue button on the warning is pressed.

### Other important details to know

Note: A Question's `NextFieldTransition` definitions are evaluated to a maximum depth of 2 only, so do not define extensive sets of transitions that are layers deep. This is a sign of poor schema design!

### Additional Components

| Supported Field Type |       Properties       |                                                      Description                                                       |
| :------------------: | :--------------------: | :--------------------------------------------------------------------------------------------------------------------: |
|     Dynamic Text     | `DynamicTextParagraph` | This component allows complex text strings to be generated which can include inline links (see below for instructions) |

Below, are details on how to implement each type of Field, as well as information on creating transitions (NextFieldTransition) and warnings.

### Validation

A `Question` object supports Async Validator properties. As the form is interacted with the values are captured by Formik and the global validator is applied. This validator function evaluates all of the answered questions and extracts the validation rules from the schema for it, thus allowing Formik to manage the error/valid state for us.

A JSON schema will obviously only support static validation rules. However, if the form schema is implemented in JavaScript, more complex validators can be produced.

Please [refer to the Async Validator library for information on creating validation rules](https://github.com/yiminghe/async-validator).

## SchemaDrivenQuestionForm

This is a wrapper around the underlying Formik form. As with any Formik form, there are mandatory properties like the `initialValues` and `onSubmit` callback. These, amongst other input props are explained below:

|      Property       |                                                   Type                                                   | Description                                                                                                                                                                                        |
| :-----------------: | :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      `fields`       | Record<SupportedFormField, FunctionComponent<SchemaDrivenQuestionFieldWrapperProps<SupportedFormField>>> | A key-value object where the key is a particular field property in the SupportedFormField enum and the value is a FunctionComponent for a field wrapper (SchemaDrivenQuestionFieldWrapperProps<T>) |
|  `questionFieldUI`  |                                            FunctionComponent                                             | A React component that renders children used to wrap the field wrappers in a custom UI (i.e. a card component)                                                                                     |
|   `initialValues`   |                                    SchemaDrivenQuestionFormSubmission                                    | Object of initial values                                                                                                                                                                           |
| `onSubmitCallback`  |                          (values: SchemaDrivenQuestionFormSubmission) => void;                           | Callback function receiving the form submission as an argument                                                                                                                                     |
| `onEndFormCallback` |                                               () => void;                                                | Callback function for form fields that want to signal an early end/termination of the form                                                                                                         |
| `onAnswerCallback`  |            (question: Question<QuestionFieldProperties>, value: string \| undefined) => void;            | Callback function fired when a Question fires a change event. The Question and the current field value is returned (ideal for analytics)                                                           |
|    `{...schema}`    |                                              QuestionSchema                                              | Question schema (spread along the component as each property is defined as a prop)                                                                                                                 |

### Example

```tsx
<SchemaDrivenQuestionForm
  fields={fields}
  questionFieldUI={QuestionFieldUI}
  initialValues={initialValues}
  onSubmitCallback={handleSubmit}
  onEndFormCallback={handleEndForm}
  onAnswerCallback={logtoAnalyticsOnce}
  {...schema}
/>
```

## Form Fields

The SchemaDrivenQuestionForm supports a number of field types "out of the box" and can easily be extended per your use-case by adding a unique/descriptive identifier to the `SupportedFormField` enum.

Below is a table of how the field types have been used for Retirement Outcomes drawdown application for the risk questions:

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

### Passing form fields to the SchemaDrivenQuestionForm

Define an object (i.e. `fields`) and add the corresponding field wrapper component as the value:

```ts
const fields: SchemaDrivenQuestionFormProps["fields"] = {
  LinkButton: LinkButtonFieldWrapper,
  RadioGroup: RadioGroupFieldWrapper,
  TextInput: TextInputFieldWrapper,
  NextQuestionButton: NextQuestionButtonFieldWrapper,
  ButtonGroup: ButtonGroupFieldWrapper,
  Prompt: PromptFieldWrapper,
  Warning: WarningFieldWrapper,
  SubmitButton: SubmitButtonFieldWrapper,
  SectionBlock: SectionBlockFieldWrapper,
};
```

## SchemaDrivenQuestionField(Manager)

The SchemaDrivenQuestionFieldManager component is the only component rendered within the Formik form, and is responsible for evaluating the schema and rendering the questions that meet any transitions that evaluate as truthy
Given the costly logic to determine the questions to render, this component is memoized to reduce the number of unnecessary rerenders.

Any Question that SchemaDrivenQuestionFieldManager determines are to be rendered are then done so via SchemaDrivenQuestionField. One SchemaDrivenQuestionField component is rendered per Question and will extract the corresponding component for the field from the `fields` prop and render any validation output and warnings.

### 1.1 LinkButton

|       Property       |            Type             | Description                                                                                                                    |
| :------------------: | :-------------------------: | :----------------------------------------------------------------------------------------------------------------------------- |
|       disabled       |          `boolean`          | Set to true to disable this button                                                                                             |
|        label         |          `string`           | The label to display on the button                                                                                             |
|         url          |          `string`           | The URL link that the button will load on press                                                                                |
|        target        | `HTMLAttributeAnchorTarget` | The [HTML anchor target](https://www.w3schools.com/tags/att_a_target.asp) (`target="_blank\|_self\|_parent\|_top\|framename"`) |
|   analyticsEnabled   |          `boolean`          | Set to true to facilitate analytics logging when this LinkButton is interacted with                                            |
| analyticsDescription |    `string \| undefined`    | The descriptor to transmit to the analytics service                                                                            |

#### Example

Below is a complete example with the above field properties in use

```json
    {
      "id": "Q1_1_Y",
      "type": "LinkButton",
      "prompt": "",
      "properties": {
        "disabled": false,
        "label": "Help me book PensionWise appointment",
        "url": "https://www.hl.co.uk/retirement/preparing/pension-wise",
        "target": "_blank",
        "analyticsEnabled": true,
        "analyticsDescription": "Book Pension Wise appointment (strategic)"
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
      "equals": "SELECTED",
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
      "type": "ButtonGroup",
      "properties": {
        "buttons": [
          {
            "id": "Q1A_1",
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
            "type": "NextQuestionButton",
            "prompt": "",
            "properties": {
              "disabled": false,
              "label": "I'm happy with my guidance, next question"
            },
            "warnings": [],
            "next": [
              {
                "equals":"SELECTED",
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
          "equals":"SELECTED",
          "question": "Q5"
        }
      ]
    },

```

### 1.9 SectionBlock

The SectionBlock essentially delivers a static header and description which is useful for breaking up groups of Questions with further context.

|  Property   |           Type           | Description                                                                       |
| :---------: | :----------------------: | :-------------------------------------------------------------------------------- |
|    title    |         `string`         | A brief title for this section                                                    |
| description | `DynamicTextParagraph[]` | DynamicText text or URL objects to render as the description. Content is optional |

#### Example

```json
{
      "id": "UnderstandingYourOptionsSectionBlock",
      "type": "SectionBlock",
      "ui": false,
      "prompt": "",
      "properties": {
        "title": "Understanding your options",
        "description": [
          {
            "type": "paragraph",
            "value": [
              {
                "type": "text",
                "value": "This is a helpful line of text for this section. ",
              },
              {
                "type": "url",
                "url": "https://google.co.uk",
                "label": "This is a URL shown inline too",
              },
              {
                "type": "text",
                "value": ". This is some more text",
              },
            ],
          },
           {
            "type": "paragraph",
            "value": [
              {
                "type": "text",
                "value": "This is yet another helpful line of text but in a 2nd paragraph!",
              },
              {
                "type": "url",
                "url": "https://apple.com",
                "label": "This is another URL shown inline too",
              },
              {
                "type": "text",
                "value": ". This is some more text",
              },
            ],
          }
        ]
      },
      "warnings": [],
      "next": [
        {
          "valid": true,
          "question": "Q1"
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
    type: "paragraph",
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
    type: "paragraph",
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
- Option 2: Rendered within the Question (within the Field) as a child element (blocking the next Question from showing until acknowledged)

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
          "equals":"SELECTED",
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

When a `next` transition is defined within a Question's `warning` property, the QuestionForm will intercept the generation of the next question and instead generate the desired Warning. Once acknowledged, the next question will be generated from the Warning question's `next` transition.

Ensure the `next` transition is defined for all answer options _but_ the Warning transition (this should be defined in `warnings`) so that when the Warning is acknowledged the next question can be generated from that Warning itself.

If you do define all transitions on the previous Question, the question after the Warning would still be rendered.

Ensure you test out _each_ transition as without focus your form could reach a break in the logic.

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
        // Notice we ONLY define the YES transition, as the NO transition is defined above for the Warning
        {
          "equals": "YES",
          "question": "Q2"
        },
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
        // When the user acknowledges the Warning
        {
          "equals":"SELECTED",
          "question": "Q2"
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

## Canned responses

Certain Questions do not explicitly require a bespoke answer. They just require some kind of user input (i.e. a user acknowledging a Prompt or Warning).

For instances like these the `PreDefinedResponse` enum is used to provide a universal answer of "SELECTED". It's important you ensure the spelling is exact as there is no forgiveness when evaluating the NextFieldTransition. The form component will not compensate for errors or omissions in schemas!

## How can I be sure my changes work?

Just because the form delivers flexibility, it does not deliver this in the absence of tests.

You _should_ still be writing integration and end to end tests to guarantee that your schema revisions do work! NEVER modify a schema and simply push it to a live environment, this is highly risky!
