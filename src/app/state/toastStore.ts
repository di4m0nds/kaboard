import { create } from 'zustand'
import { ToastActions, ToastStatus } from '../types/toast'

/**
 * Store for managing toast
 * @returns {ToastActions} Toast actions.
 */
export const useToastStore = create<ToastActions>((set) => ({
  isToastVisible: false,
  status: 'success',
  heading: 'Completed successfully!',

  showToast: (status: ToastStatus, heading: string) => set(
    state => {
      state.isToastVisible = false
      return state.isToastVisible ? ({ }) : ({ isToastVisible: true, status, heading })
    }
  ),

  removeToast: () => set(
    () => ({ isToastVisible: false })
  ),
}))
