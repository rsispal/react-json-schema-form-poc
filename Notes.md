LINK: https://shimmering-parfait-6b6525.netlify.app/

## OUTSTANDING:

-[ ] Do we need to record the view HL advice button? - leave for now if complex  
-[ ] If a user changes a previously answered question that has child-questions (i.e. I change Q1A but have already filled Q2,3,4,5,6..), answer the subsequent questions, and then change my choice back to the original - is it an issue if those previous answers were restored? The submission _only_ happens when you click submit after the Q15.  
-[ ] Should we have an "I confirm my answers are correct ..." checkbox before the submit button? Puts onus on user to fill correctly

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
- [-] Schema documentation
- [x] Verify the message warnings for each question and when they actually need to appear
- [x] Add TextInput field
- [x] Render questions in a nicer card w shadow - done via render function prop
- [x] Create namespace of utility methods
- [x] Add ~~formik~~ and rc-field-form implementations
- [x] Validation rules? Needs to be like async validator
- [x] Backoffice answers visualisation
- [x] Cypress e2e tests
- [x] Netlify/Heroku deploy for testing
- [x] I understand block (same as warning, but has the links for text and no button)
- [x] if I change the answer to a previously answered question, then clear all existing values for questions _after_ this
- [x] Add a dynamic text component which can generate links. Use in Warning and Button blocks
- [x] Make submit button into form field, based on data shown in risk questions v1 (check any behaviour there too)
- [-] Create Formik variation (as most popular open source form library)
- [x] Prompt with continue and end button (can be used for an "i understand" style question block)
- [x] Warning with continue and end button
- [x] Submit button field type
- [x] Make Question type generic so it can include a sub-type for the properties
- [ ] Utilise render function props from QuestionForm for each field type, applying the relevant type to the prop parameters (negating the switch statement)
- [x] Utilise `id` property

# POC Options

- OPTION 1: Schema-driven form with React Final Form library (retired due to potential complexity and lack of popularity)
- OPTION 2: Schema-driven form with rc-field-form library (retired due to possible risk of all-in-one form library being dropped by open source community in future)
- OPTION 3 (preferred): Formik and Async Validaotr variant (todo, decoupled solution reduces implementation risk and allows greater flexibility)
- OPTION 4: modify existing hard-coded solution (decided not a good use of developer time, to forcibly retrofit an existing solution)

## Evaluation

|  Option  | Name                                                       | Pros                                                                                                                                         | Cons                                                                                                                                                    | Notes |
| :------: | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :---- |
| OPTION 1 | Schema-driven form with React Final Form library           | - Bespoke to current requirements                                                                                                            | - Complexities around waiting for specific combinations of answers to trigger external behaviour (i.e. submit early if specific question path answered) |       |
|          |                                                            | - Built upon widely used open source form library                                                                                            | - Only as flexible as the currently developed behaviour (field types: RadioGroup, TextInput, LinkButton)                                                |       |
|          |                                                            | - Easily extended with new field types                                                                                                       | - Transition logic for conditional questions must be defined for EACH answer for EACH question (gaps WILL break the flow)                               |       |
|          |                                                            | - Easy predictability of form flow with state-machine-like transition to next questions                                                      | - Future developer must take care if modifying/extending the schema in future, so the form doesn't break                                                |       |
|          |                                                            | - Form state already handled                                                                                                                 | - In small cases may impose restrictions on how child questions are rendered (positioning relative to parent questions)                                 |       |
|          |                                                            | - Can be modified to show either single questions at a time, or all questions based on prop                                                  | - Risk of being dropped by open source community                                                                                                        |       |
|          |                                                            |                                                                                                                                              | -                                                                                                                                                       |       |
|          |                                                            |                                                                                                                                              |                                                                                                                                                         |       |
| OPTION 2 | Schema-driven form with rc-field-form library              | - Bespoke to current requirements                                                                                                            | - Complexities around waiting for specific combinations of answers to trigger external behaviour (i.e. submit early if specific question path answered) |       |
|          |                                                            | - Built upon widely used open source form library                                                                                            | - Only as flexible as the currently developed behaviour (field types: RadioGroup, TextInput, LinkButton)                                                |       |
|          |                                                            | - Easily extended with new field types                                                                                                       | - Transition logic for conditional questions must be defined for EACH answer for EACH question (gaps WILL break the flow)                               |       |
|          |                                                            | - Provides better support for async-validator library                                                                                        | - Future developer must take care if modifying/extending the schema in future, so the form doesn't break                                                |       |
|          |                                                            | - Easy predictability of form flow with state-machine-like transition to next questions                                                      | - In small cases may impose restrictions on how child questions are rendered (positioning relative to parent questions)                                 |       |
|          |                                                            | - Form state already handled                                                                                                                 | - Risk of being dropped by open source community - a greater issue here as validation _and_ form handled as an all-in-one solution                      |       |
|          |                                                            | - Can be modified to show either single questions at a time, or all questions based on prop                                                  |                                                                                                                                                         |       |
|          |                                                            |                                                                                                                                              |                                                                                                                                                         |       |
| OPTION 3 | Schema-driven form with Formik and Async Validator library | - Most popular open source form library                                                                                                      |                                                                                                                                                         |       |
|          |                                                            | - Least risk as the form implementation and validation are decoupled, allowing either to be modified or replaced independently               |                                                                                                                                                         |       |
|          |                                                            | - Bespoke to current requirements                                                                                                            | - Complexities around waiting for specific combinations of answers to trigger external behaviour (i.e. submit early if specific question path answered) |       |
|          |                                                            | - Built upon widely used open source form library                                                                                            | - Only as flexible as the currently developed behaviour (field types: RadioGroup, TextInput, LinkButton)                                                |       |
|          |                                                            | - Easily extended with new field types                                                                                                       | - Transition logic for conditional questions must be defined for EACH answer for EACH question (gaps WILL break the flow)                               |       |
|          |                                                            | - Provides better support for async-validator library                                                                                        | - Future developer must take care if modifying/extending the schema in future, so the form doesn't break                                                |       |
|          |                                                            | - Easy predictability of form flow with state-machine-like transition to next questions                                                      | - In small cases may impose restrictions on how child questions are rendered (positioning relative to parent questions)                                 |       |
|          |                                                            | - Form state already handled                                                                                                                 | - Time required to introduce an "on form change" callback to notify any subscriber (i.e. HOC or state) of a field change                                |       |
|          |                                                            | - Can be modified to show either single questions at a time, or all questions based on prop                                                  |                                                                                                                                                         |       |
|          |                                                            |                                                                                                                                              |                                                                                                                                                         |       |
| OPTION 4 | Modify existing hard-coded solution                        | - Not a proactive use of time                                                                                                                |                                                                                                                                                         |       |
|          |                                                            | - Existing implementation matched far simpler requirements of a single path of questions                                                     |                                                                                                                                                         |       |
|          |                                                            | - Forcing an existing implementation to handle conditional logic risks getting out of control with unmaintainable code (not a sensible risk) |                                                                                                                                                         |       |
|          |                                                            | - Time to retrofit an existing solution is equivalent to producing a more futureproof alternative                                            |                                                                                                                                                         |       |
|          |                                                            |                                                                                                                                              |                                                                                                                                                         |       |
|          |                                                            |                                                                                                                                              |                                                                                                                                                         |       |
|          |                                                            |                                                                                                                                              |                                                                                                                                                         |       |
|          |                                                            |                                                                                                                                              |                                                                                                                                                         |       |
