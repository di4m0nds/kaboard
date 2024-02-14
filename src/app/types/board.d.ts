/**
 * Represents a board in the task management system.
 */
export interface BoardModel {
  /**
   * Unique identifier for the board.
   */
  boardId: string;

  /**
   * The name of the board.
   */
  name: string;

  /**
   * A brief description of the board.
   */
  description: string;

  /**
   * The owner of the board.
   * Corresponds to the `userId` property in the UserModel.
   */
  ownerId: string;

  /**
   * The timestamp when the board was created.
   */
  createdAt: Date;

  /**
   * The background image associated with the board.
   */
  backgroundImage: string | null;
}


/**
 * Defines actions that can be performed on the boards in the task management system.
 */
export interface BoardActions {
  /**
   * Array containing all the boards in the system.
   */
  boards: BoardModel[];

  /**
   * Retrieves the details of a specific board based on its unique identifier.
   * @param boardId - Unique identifier of the board.
   * @returns The board details or null if not found.
   */
  getBoard: (boardId: string) => BoardModel | null;

  /**
   * Adds a new board to the task management system.
   * @param board - The board to be added.
   */
  addBoard: (board: BoardModel) => void;

  /**
   * Edits a board to the task management system.
   * @param board - The board to be edited.
   */
  editBoard: (board: BoardModel) => void;

  /**
   * Removes a board from the task management system based on its unique identifier.
   * @param boardId - Unique identifier of the board to be removed.
   */
  removeBoard: (boardId: string) => void;
}
