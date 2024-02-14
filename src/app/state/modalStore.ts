import { create } from 'zustand'
import React from 'react'
import { ModalActions } from '../types/modal'

/**
 * Store for managing toast
 * @returns {ModalActions} Modal actions.
 */
export const useModalStore = create<ModalActions>((set) => ({
  isModalVisible: false,
  children: null,

  showModal: (children: React.ReactNode) => set(
    state => {
      return state.isModalVisible ? ({ }) : ({ isModalVisible: true, children })
    }
  ),

  removeModal: () => set(
    () => ({ isModalVisible: false, children: null })
  ),
}))
