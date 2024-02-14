import { HTMLInputTypeAttribute, useEffect } from 'react'
import { TaskModel } from '@/app/types/task'

interface InputLabelProps<T extends object, K extends keyof T> {
  id: string | null,
  property: K,
  formData: T,
  setFormData: React.Dispatch<React.SetStateAction<T>>
  label?: string
  type?: HTMLInputTypeAttribute | undefined
  required?: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputLabel = <T extends object, K extends keyof T>({
  id,
  property,
  formData,
  setFormData,
  label,
  type,
  required,
  handleChange,
}: InputLabelProps<T, K>) => {
  useEffect(() => {
    setFormData(_ => ({ ...formData }))
  }, [setFormData])
  return (
    <div className="pb-2 flex flex-col">
      <label
        className="text-md"
        htmlFor={`${id ? id + '-' : ''}${property.toString()}`}
      >{label ? label : 'Field'}:</label>
      <input
        type={type ?? 'text'}
        id={`${id ? id + '-' : ''}${property.toString()}`}
        name={property.toString()}
        className={`
          border-[1.5px] border-${formData[property] !== '' || formData[property] !== null ? 'lime' : 'red'}-500 border-solid
          bg-transparent
          px-4 py-1
          rounded-lg
          text-lg
        `}
        defaultValue={formData ? formData[property]?.toString() ?? '' : ''}
        onChange={handleChange}
        required={required ?? true}
      />
    </div>
  )
}

export default InputLabel
