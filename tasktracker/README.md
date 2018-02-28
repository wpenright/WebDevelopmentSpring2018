# Tasktracker Design Decisions

- When viewing tasks, only list the ones assigned to the current user
- Reserve most task information for the "show task" page
- "Marking as Complete" consists of deleting the given task.
  Due to the limited scope of each task object, it is reasonable to simply recreate a task that needs to be reopened.
 
New:
- Marking a task as complete still results in its deletion
- Anyone can claim to be the manager of a user that is not already managed
- TaskReport present on ones own tasks page
- User must stay on the task page during the course of the working time block, or else start-time is reset
- Users can only start/stop working on a task assigned to them

Known shortcomings:
- Anyone can create/assign a task for any user
- No functionality to edit time blocks
- Must refresh on task-view page after finishing work for time-block to appear
