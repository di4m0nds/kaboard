import { useTaskStore } from '@/app/state/taskStore'
import { Task } from '..'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo } from 'react'

interface TaskListProps {
  columnId: string
}

const TaskList = ({ columnId }: TaskListProps) => {
  const { tasks } = useTaskStore()

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.taskId)
  }, [tasks])

  return (
    <SortableContext items={tasksIds}>
      {tasks.filter((task) => task.currentStage === columnId).length > 0
        ? tasks.filter((task) => task.currentStage === columnId).map(task => <Task key={task.taskId} task={task} />)
        : <h2 className="text-gray-400 dark:text-zinc-200">No tasks yet.</h2> }
    </SortableContext>
  )
}

export default TaskList
