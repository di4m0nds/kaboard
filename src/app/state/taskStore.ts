import { create } from 'zustand'

import { getFromLocalStorage, saveToLocalStorage } from '@/app/utils/storage'
import { TaskActions, TaskModel } from '../types/task'
import { DEFAULT_KEY_TASK } from '../configs'

/**
 * Store for managing tasks
 * @returns {TaskActions} The task store actions.
 */
export const useTaskStore = create<TaskActions>((set, get) => ({
  tasks: getFromLocalStorage<TaskModel>(DEFAULT_KEY_TASK) ?? [],

  getTask: (taskId: string) => get().tasks.find(
    task => task.taskId === taskId
  ) ?? null,

  addTask: (task: TaskModel) => set(
    state => {
      saveToLocalStorage(DEFAULT_KEY_TASK, [...state.tasks, task])

      return { tasks: [...state.tasks, task] }
    }
  ),

  setTasks: (callback: (prevTask: TaskModel[]) => TaskModel[]) => set(
    state => {
      saveToLocalStorage(DEFAULT_KEY_TASK, [...callback(state.tasks)])
      return ({ tasks: [ ...callback(state.tasks)] })
    }
  ),

  editTask: (task: TaskModel) => set(
    state => {
      state.tasks.forEach((t, i) => {
        if (t.taskId === task.taskId) {
          state.tasks[i] = task
        }
      })
      saveToLocalStorage(DEFAULT_KEY_TASK, [...state.tasks])

      return { tasks: [...state.tasks] }
    }
  ),

  removeTask: (taskId: string) => set(
    state => {
      const filteredTask = state.tasks.filter((task) => task.taskId !== taskId)
      saveToLocalStorage(DEFAULT_KEY_TASK, [...filteredTask])
      return { tasks: filteredTask }
    }
  ),
}))
