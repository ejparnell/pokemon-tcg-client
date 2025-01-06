export default function FormSelect({ label, children, onChange, value, name }) {
    return (
        <label>
            {label}
            <select name={name} onChange={onChange} value={value}>
                {children}
            </select>
        </label>
    )
}