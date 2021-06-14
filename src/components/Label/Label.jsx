const Label = ({ label: { htmlFor, title }, children }) => {
  return (
    <label htmlFor={htmlFor}>{title}
      {children}
    </label>
  )
}

export default Label