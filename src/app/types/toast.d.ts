/**
 * Represents the status of a toast message.
 */
export type ToastStatus = 'success' | 'error' | 'warning' | 'info';

/**
 * Defines actions related to toast messages in the application.
 */
export interface ToastActions {
  /**
   * Indicates whether the toast message is currently visible.
   */
  isToastVisible: boolean;

  /**
   * The status of the toast message (success, error, warning, info).
   */
  status: ToastStatus;

  /**
   * The heading or main content of the toast message.
   */
  heading: string;

  /**
   * Displays a toast message with the specified status and heading.
   * @param status - The status of the toast message (success, error, warning, info).
   * @param heading - The heading or main content of the toast message.
   */
  showToast: (status: ToastStatus, heading: string) => void;

  /**
   * Removes the currently displayed toast message.
   */
  removeToast: () => void;
}
