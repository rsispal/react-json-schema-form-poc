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
- [ ] Schema documentation (more than type annotation?)
- [ ] LinkButton to go to next question (behaviour needs clarifying)
- [ ] Verify the message warnings for each question and when they actually need to appear
- [x] Add TextInput field
- [x] Render questions in a nicer card w shadow - done via render function prop
- [ ] Create namespace of utility methods
- [ ] Add ~~formik~~ and rc-field-form implementations
- [ ] Validation rules? Needs to be like async validator
- [ ] Backoffice answers visualisation
- [ ] Cypress e2e tests
- [x] Netlify/Heroku deploy for testing

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
