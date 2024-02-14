import { create } from 'zustand'

import { getFromLocalStorage, saveToLocalStorage } from '@/app/utils/storage'
import { ColumnActions, ColumnModel } from '../types/column'
import { DEFAULT_KEY_COLUMN } from '../configs'

/**
 * Store for managing columns
 * @returns {ColumnActions} The column store actions.
 */
export const useColumnStore = create<ColumnActions>((set, get) => ({
  columns: getFromLocalStorage<ColumnModel>(DEFAULT_KEY_COLUMN) ?? [],

  getColumn: (columnId: string) => get().columns.find(
    column => column.columnId === columnId
  ) ?? null,

  setColumns: (callback: (prevColumns: ColumnModel[]) => ColumnModel[]) => set(
    state => ({ columns: [ ...callback(state.columns)] })
  ),

  addColumn: (column: ColumnModel) => set(
    state => {
      saveToLocalStorage(DEFAULT_KEY_COLUMN, [...state.columns, column])

      return { columns: [...state.columns, column] }
    }
  ),

  editColumn: (column: ColumnModel) => set(
    state => {
      state.columns.forEach((col, i) => {
        if (col.columnId === column.columnId) {
          state.columns[i] = column
        }
      })
      saveToLocalStorage(DEFAULT_KEY_COLUMN, [...state.columns])

      return { columns: [...state.columns] }
    }
  ),

  removeColumn: (columnId: string) => set(
    state => {
      const filteredColumn = state.columns.filter((column) => column.columnId !== columnId)
      saveToLocalStorage(DEFAULT_KEY_COLUMN, [...filteredColumn])
      return { columns: filteredColumn }
    }
  ),
}))
