# Tasktracker Design Decisions

- All users must have unique email addresses
- When viewing tasks, only list the ones assigned to the current user
- Reserve most task information for the "show task" page
- "Marking as Complete" consists of deleting the given task.
  Due to the limited scope of each task object, it is reasonable to simply recreate a task that needs to be reopened.
