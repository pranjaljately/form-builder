export function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child
      })}
    </form>
  )
}

export function Select({ register, options, name, ...rest }) {
  return (
    <select {...register(name)} {...rest}>
      {options.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  )
}
