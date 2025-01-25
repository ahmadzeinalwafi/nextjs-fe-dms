export default function SelectInput({ label, name, options, value, onChange }) {
    return (
        <div className="form-control">
            <label htmlFor={name} className="label">
                <span className="label-text">{label}</span>
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="select w-full max-w-xs"
            >
                <option value="" disabled>Please pick the option below</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
