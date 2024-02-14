'use client'

import { useTaskStore } from '@/app/state/taskStore'
import { useToastStore } from '@/app/state/toastStore'
import { TaskModel } from '@/app/types/task'
import { generateID } from '@/app/utils/functions'
import { useState } from 'react'
import InputLabel from '../Form/InputLabelText'
import { useModalStore } from '@/app/state/modalStore'

interface TaskContentModalProps {
  columnId: string
  taskId: string | null
  /**
   * @deprecated This property is deprecated and will be removed in the future.
   * Please use another method for managing visibility.
   */
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskContentModal = ({ columnId, taskId }: TaskContentModalProps) => {
  const { getTask, addTask, editTask } = useTaskStore()
  const { showToast, removeToast } = useToastStore()
  const { removeModal, showModal } = useModalStore()

  const initialFormValues: TaskModel = {
    taskId: generateID(),
    boardId: 'some',
    currentStage: columnId,
    color: null,
    title: '',
    description: '',
    tags: [] as string[],
    comments: [] as string[],
    createdAt: new Date(),
    plannedStartDate: null,
    plannedEndDate: null,
    status: 1,
    ownerId: '',
  }
  const [formData, setFormData] = useState<TaskModel>(getTask(taskId ?? '') ?? initialFormValues)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formData.title.includes('>') || formData.title.includes('<') ||
        formData.description.includes('>') || formData.description.includes('<') ||
        formData.plannedStartDate === null) {
      setFormData(initialFormValues)
      showToast('error', 'Something went wrong.')
      setTimeout(() => removeToast(), 2000)
      return
    }
    if (taskId) {
      editTask(formData)
    } else {
      addTask(formData)
    }

    showToast('success', 'Created new Task')
    setTimeout(() => removeToast(), 2000)
    removeModal()
  }

  return (
    <section className="px-2 md:px-5">
      <header>
        <h2 className="text-2xl font-semibold mb-4">
          {taskId ? 'Edit ': 'Create new '}Task
        </h2>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <InputLabel id={taskId} setFormData={setFormData} label="Title" property="title" formData={formData} handleChange={handleChange} />
        <InputLabel id={taskId} setFormData={setFormData} label="Description" property="description" formData={formData} handleChange={handleChange} />
        <InputLabel id={taskId} setFormData={setFormData} type="color" label="Color" property="color" formData={formData} handleChange={handleChange} />
        <InputLabel id={taskId} setFormData={setFormData} type="date" label="Planned start date" property="plannedStartDate" formData={formData} handleChange={handleChange}  />
        <InputLabel id={taskId} setFormData={setFormData} required={false} type="date" label="Planned end date" property="plannedEndDate" formData={formData} handleChange={handleChange}  />

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 border-2 border-solid border-lime-300 dark:bg-lime-500/50 bg-lime-300 text-black dark:text-white rounded"
        >
          {taskId ? 'Edit ' : 'Create '}Task
          Save Column
        </button>
      </form>
    </section>
  )
}

export default TaskContentModal
