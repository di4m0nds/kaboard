import { BoardModel } from './board'
import { StatusCode } from './types'

/**
 * Represents a column in the task management system.
 */
export interface ColumnModel {
  /**
   * Unique identifier for the column.
   */
  columnId: string;

  /**
   * The name of the column.
   */
  name: string;

  /**
   * A brief description of the column.
   */
  // description: string;

  /**
   * The unique identifier of the board to which the column belongs.
   * Corresponds to the `boardId` property in the BoardModel.
   */
  boardId: string;

  /**
   * The owner of the column.
   * Corresponds to the `userId` property in the UserModel.
   */
  owner: string;

  /**
   * The timestamp when the column was created.
   */
  createdAt: Date;

  /**
   * The color associated with the column for visual identification.
   * May be `null` if no specific color is assigned.
   */
  color: string | null;

  /**
   * The status code indicating the current state of the column.
   */
  status: StatusCode;
}

/**
 * Represents a relationship between columns in the task management system.
 */
export interface ColumnRelationshipModel {
  /**
   * Unique identifier for the column relationship.
   */
  relationshipId: string;

  /**
   * The unique identifier of the board to which the relationship belongs.
   * Corresponds to the `boardId` property in the BoardModel.
   */
  boardId: string;

  /**
   * The timestamp when the relationship was created.
   */
  createdAt: Date;

  /**
   * The unique identifier of the previous column in the board.
   * Corresponds to the `columnId` property in the ColumnModel.
   */
  previousColumnId: string;

  /**
   * The unique identifier of the next column in the board.
   * Corresponds to the `columnId` property in the ColumnModel.
   */
  nextColumnId: string;
}

/**
 * Defines actions that can be performed on the columns in the task management system.
 */
export interface ColumnActions {
  /**
   * Array containing all the columns in the system.
   */
  columns: ColumnModel[];

  /**
   * Retrieves the details of a specific column based on its unique identifier.
   * @param columnId - Unique identifier of the column.
   * @returns The column details or null if not found.
   */
  getColumn: (columnId: string) => ColumnModel | null;

  /**
   * Set columns to the task management system.
   * @param columns - The columns to be setted.
   */
  setColumns: (callback: (prevColumns: ColumnModel[]) => ColumnModel[]) => void,

  /**
   * Adds a new column to the task management system.
   * @param column - The column to be added.
   */
  addColumn: (column: ColumnModel) => void;

  /**
   * Edits a column to the task management system.
   * @param column - The column to be edited.
   */
  editColumn: (column: ColumnModel) => void;

  /**
   * Removes a column from the task management system based on its unique identifier.
   * @param columnId - Unique identifier of the column to be removed.
   */
  removeColumn: (columnId: string) => void;

  /**
   * Retrieves the details of a specific column relationship based on its unique identifier.
   * @param relationshipId - Unique identifier of the column relationship.
   * @returns The column relationship details or null if not found.
   */
  // getColumnRelationship: (relationshipId: string) => ColumnRelationshipModel | null;

  /**
   * Adds a new column relationship to the task management system.
   * @param relationship - The column relationship to be added.
   */
  // addColumnRelationship: (relationship: ColumnRelationshipModel) => void;

  /**
   * Removes a column relationship from the task management system based on its unique identifier.
   * @param relationshipId - Unique identifier of the column relationship to be removed.
   */
  // removeColumnRelationship: (relationshipId: string) => void;
}
