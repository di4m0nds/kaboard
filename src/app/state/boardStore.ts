import { create } from 'zustand'

import { BoardActions, BoardModel } from '../types/board'
import { getFromLocalStorage, saveToLocalStorage } from '@/app/utils/storage'
import { DEFAULT_KEY_BOARD } from '../configs'

/**
 * Store for managing boards
 * @returns {BoardActions} The board store actions.
 */
export const useBoardStore = create<BoardActions>((set, get) => ({
  boards: getFromLocalStorage<BoardModel>(DEFAULT_KEY_BOARD) ?? [],

  getBoard: (boardId: string) => get().boards.find(
    board => board.boardId === boardId
  ) ?? null,

  addBoard: (board: BoardModel) => set(
    state => {
      saveToLocalStorage(DEFAULT_KEY_BOARD, [ board ])

      return { boards: [...state.boards, board] }
    }
  ),

  editBoard: (board: BoardModel) => set(
    state => {
      state.boards.forEach((b, i) => {
        if (board.boardId === b.boardId) {
          state.boards[i] = board
        }
      })
      saveToLocalStorage(DEFAULT_KEY_BOARD, [...state.boards])

      return { boards: [...state.boards] }
    }
  ),

  removeBoard: (boardId: string) => set(
    state => ({ boards: state.boards.filter((board) => board.boardId !== boardId) })
  ),
}))
