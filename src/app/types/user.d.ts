/**
 * Represents a user in the task management system.
 */
export interface UserModel {
  /**
   * Unique identifier for the user.
   */
  userId: string;

  /**
   * The full name of the user.
   */
  name: string | null;

  /**
   * The unique username of the user.
   */
  username: string;

  /**
   * The unique email address of the user.
   */
  email: string;

  /**
   * The timestamp when the user account was created.
   */
  createdAt: Date;

  /**
   * The URL of the user's profile image.
   */
  image: string | null;
}
