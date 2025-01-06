export default function FormOption({ children, value }) {
  return (
    <option value={value}>
      {children}
    </option>
  )
}