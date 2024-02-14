import { StatusCode } from './types'

export type TaskProps = 'taskId' | 'title' | 'description' | 'tags' | 'createdAt' | 'plannedStartDate' | 'plannedEndDate' | 'color' | 'status' | 'currentStage' | 'ownerId' | 'boardId'

/**
 * Represents a task in the application.
 */
export interface TaskModel {
  /**
   * Unique identifier for the task.
   */
  taskId: string;

  /**
   * The title of the task.
   */
  title: string;

  /**
   * A concise description of the task.
   */
  description: string;

  /**
   * Tags related of the task.
   */
  tags: string[];

  /**
   * Comments related of the task.
   */
  comments: string[];

  /**
   * The timestamp when the task was initially created.
   */
  createdAt: Date;

  /**
   * The planned start timestamp of the task timeline.
   * May be `null` if not yet determined.
   */
  plannedStartDate: Date | null;

  /**
   * The planned end timestamp of the task timeline.
   * May be `null` if not yet determined.
   */
  plannedEndDate: Date | null;

  /**
   * The color associated with the task for visual identification.
   * May be `null` if no specific color is assigned.
   */
  color: string | null;

  /**
   * The status code indicating the current state of the task.
   */
  status: StatusCode;

  /**
   * The current stage of the task, referring to a column in the board.
   */
  currentStage: string;

  /**
   * The unique identifier of the user who owns the task.
   * Corresponds to the `userId` property in the UserModel.
   */
  ownerId: string;

  /**
   * The unique identifier of the board to which the task belongs.
   * Corresponds to the `boardId` property in the BoardModel.
   */
  boardId: string;
}

/**
 * Defines actions that can be performed on the tasks in the task management system.
 */
export interface TaskActions {
  /**
   * Array containing all the tasks in the system.
   */
  tasks: TaskModel[];

  /**
   * Retrieves the details of a specific task based on its unique identifier.
   * @param taskId - Unique identifier of the task.
   * @returns The task details or null if not found.
   */
  getTask: (taskId: string) => TaskModel | null;

  /**
   * Adds a new task to the task management system.
   * @param task - The task to be added.
   */
  addTask: (task: TaskModel) => void;

  /**
   * Set taskss to the task management system.
   * @param columns - The tasks to be setted.
   */
  setTasks: (callback: (prevTasks: TaskModel[]) => TaskModel[]) => void,

  /**
   * Edits a task to the task management system.
   * @param task - The task to be edited.
   */
  editTask: (task: TaskModel) => void;

  /**
   * Removes a task from the task management system based on its unique identifier.
   * @param taskId - Unique identifier of the task to be removed.
   */
  removeTask: (taskId: string) => void;
}
