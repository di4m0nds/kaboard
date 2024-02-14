import { ReactNode } from 'react'

/**
 * Defines actions related to modal messages in the application.
 */
export interface ModalActions {
  /**
   * Indicates whether the modal message is currently visible.
   */
  isModalVisible: boolean;

  /**
   * Node for modal content.
   */
   children: ReactNode,

  /**
   * Displays a modal with the content
   * @param children - The children for modal content.
   */
  showModal: (children: ReactNode) => void;

  /**
   * Removes the currently displayed modal message.
   */
  removeModal: () => void;
}
