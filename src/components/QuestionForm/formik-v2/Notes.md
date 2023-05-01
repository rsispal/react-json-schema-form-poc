# Schema issues

BACKLOG:

- Question 11 onward has warnings which don't have a transition. This surely is right compared to earlier questions' warnings. When Question has a Warning transition, it shouldn't require its own next transition, as it should basically be a blocker for the Question's next transitions
- Form validation (started, static rules need documenting, testing and finalising)

REFINEMENTS

- [ ] Ensure all question logic runs from `id` and not `name`
- [x] Remove independent property from schema
- [x] Remove exclude property from schema
- [ ] Refactor schemaversion schema properties into an enclosing version object. Also add revisionDate and revisionNotes
- [ ] Question warnings: Change the `question` property in the warning transition to `warningQuestionId`
