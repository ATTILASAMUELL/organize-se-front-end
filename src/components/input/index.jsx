export const TextFieldInput  = ({ label, name, placeholder,className,type, value, setValue}) => {

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return(
        <div className={className}>
            <label htmlFor={name}>{label}</label>
            <input value={value} type={type} name={name} placeholder={placeholder} onChange={handleChange} required/>
        </div>
    );
}