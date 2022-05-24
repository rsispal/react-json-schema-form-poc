LINK: https://shimmering-parfait-6b6525.netlify.app/

# Backlog

- [x] Rewrite visio diagram _cleanly_
- [x] Base UI
- [x] Add Chakra UI, React Final Form deps
- [x] Add seed data
- [x] Create LinkButton component
- [x] Create RadioGroup component
- [x] Create TextInput component (may not be required)
- [x] Create QuestionForm
- [x] Recursive field generation for next
- [x] Question chaining via next (U: the only way to create the quiz-style individual question flow)
- [ ] Schema documentation (more than type annotation!)
- [ ] Verify the message warnings for each question and when they actually need to appear
- [x] Add TextInput field
- [x] Render questions in a nicer card w shadow - done via render function prop
- [x] Create namespace of utility methods
- [x] Add ~~formik~~ and rc-field-form implementations
- [x] Validation rules? Needs to be like async validator
- [ ] Backoffice answers visualisation
- [x] Cypress e2e tests
- [x] Netlify/Heroku deploy for testing

## Backlog:: Logic to implement:
- [ ] Logic for  "Have your circumstances changed since you received Pension Wise guidance?" question - two buttons need to be shown before the next question
- [ ] Submit button should take a component with an onClickCallback, title and description props
- [ ] Disable submit button when error
- [ ] LinkButton to go to next question (behaviour needs clarifying)
- [ ] Need the ability to capture the LinkButton press (styled radio component?)
- [ ] Warnings require 2 buttons to control transition. When a warning appears, there needs to be two buttons:
OK, CONTINUE (which will then allow the next question to be visible)
END RISK QUESTIONS (cancel the form)

- [ ] SCHEMA: Need a new warning-style property that will allow a prompt with navigation buttons to be included (form field perhaps?)
EXAMPLE:
Have you received personal advice from a regulated financial adviser?
YES
NO

[PROMPT:] What you do with your pension is an important decision. If you haven't received Pension Wise guidance or personal advice, we strongly suggest you do this before proceeding.

[Button: I UNDERSTAND, CONTINUE]


## Questions for business
Is there any end-to-end design or even UI/UX resource in HL? I work from a full design  
Is there any flexibility with how child questions need to render?  
How important are the 2 sections in the risk questions? Your circumstances  
Tell me more about HL advice button - link required






# POC Options

- OPTION 1: Schema-driven form with React Final Form library
- OPTION 2: Schema-driven form with rc-field-form library
- OPTION 3: react-jsonschema-form implementation
- OPTION 4: modify existing hard-coded solution (decided not a good use of developer time, to forcibly retrofit an existing solution)

## Evaluation

|  Option  | Name                                             | Pros                                                                                        | Cons                                                                                                                                             | Notes |
| :------: | :----------------------------------------------- | :------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- | :---- |
| OPTION 1 | Schema-driven form with React Final Form library | - Bespoke to current requirements                                                           | - May be difficult to make API calls in the middle of questions (**_ check existing codebase to see if any calls made during risk questions _**) |       |
|          |                                                  | - Built upon widely used open source form library                                           | - Only as flexible as the currently developed behaviour (field types: RadioGroup, TextInput, LinkButton)                                         |       |
|          |                                                  | - Easily extended with new field types                                                      | - Transition logic for conditional questions must be defined for EACH answer for EACH question (gaps WILL break the flow)                        |       |
|          |                                                  | - Easy predictability of form flow with state-machine-like transition to next questions     | - Future developer must take care if modifying/extending the schema in future, so the form doesn't break                                         |       |
|          |                                                  | - Form state already handled                                                                | - In small cases may impose restrictions on how child questions are rendered (positioning relative to parent questions)                          |       |
|          |                                                  | - Can be modified to show either single questions at a time, or all questions based on prop |                                                                                                                                                  |       |
|          |                                                  |                                                                                             |                                                                                                                                                  |       |
|          |                                                  |                                                                                             |                                                                                                                                                  |       |
| OPTION 2 | Schema-driven form with rc-field-form library    | - Bespoke to current requirements                                                           | - May be difficult to make API calls in the middle of questions (**_ check existing codebase to see if any calls made during risk questions _**) |       |
|          |                                                  | - Built upon widely used open source form library                                           | - Only as flexible as the currently developed behaviour (field types: RadioGroup, TextInput, LinkButton)                                         |       |
|          |                                                  | - Easily extended with new field types                                                      | - Transition logic for conditional questions must be defined for EACH answer for EACH question (gaps WILL break the flow)                        |       |
|          |                                                  | - Provides better support for async-validator library                                       | - Future developer must take care if modifying/extending the schema in future, so the form doesn't break                                         |       |
|          |                                                  | - Easy predictability of form flow with state-machine-like transition to next questions     | - In small cases may impose restrictions on how child questions are rendered (positioning relative to parent questions)                          |       |
|          |                                                  | - Form state already handled                                                                |                                                                                                                                                  |       |
|          |                                                  | - Can be modified to show either single questions at a time, or all questions based on prop |                                                                                                                                                  |       |
|          |                                                  |                                                                                             |                                                                                                                                                  |       |
| OPTION 3 | react-jsonschema-form implementation             | - JSON schema structure is pre-defined and provided by the library                          | - Entire implementation rests upon the development and availability of this library (deprecation risk)                                           |       |
|          |                                                  | - Can achieve much more complex form flows                                                  | - Not used before                                                                                                                                |       |
|          |                                                  | - Form state already handled                                                                | - In small cases may impose restrictions on how the questions are rendered (positioning relative to parent questions)                            |       |
|          |                                                  |                                                                                             | - May not easily support LinkButton component                                                                                                    |       |
|          |                                                  |                                                                                             | - May be difficult to make API calls in the middle of questions (**_ check existing codebase to see if any calls made during risk questions _**) |       |
|          |                                                  |                                                                                             |                                                                                                                                                  |       |
|          |                                                  |                                                                                             |                                                                                                                                                  |       |
