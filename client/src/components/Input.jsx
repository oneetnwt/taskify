function Input({ type, placeholder, name, onChange, value }) {
    return (
        <input type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} className="border-1 rounded-md p-3 placeholder:text-gray-500" />
    )
}

export default Input