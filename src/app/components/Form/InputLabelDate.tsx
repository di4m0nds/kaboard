interface InputLabelTextProps<T extends object, K extends keyof T> {
  id: string | null,
  property: K,
  formData: T,
  label?: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputLabelDate = <T extends object, K extends keyof T>({
  id: id, property, formData, label, handleChange,
}: InputLabelTextProps<T, K>) => {
  return (
    <div className="pb-2 flex flex-col">
      <label
        className="text-md"
        htmlFor={`${id ? id + '-' : ''}${property.toString()}`}
      >{label ? label : 'Field'}:</label>
      <input
        type="date"
        id={`${id ? id + '-' : ''}${property.toString()}`}
        name={property.toString()}
        className={`
          border-[1.5px] border-${formData[property] !== '' ? 'lime-500' : 'red-500'} border-solid
          px-4 py-1
          rounded-lg
          text-lg
        `}
        defaultValue={formData ? formData[property]?.toString() ?? '' : ''}
        onChange={handleChange}
        required
      />
    </div>
  )
}

export default InputLabelDate
