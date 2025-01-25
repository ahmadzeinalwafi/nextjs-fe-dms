export default function TextArea({ label, name, value, onChange, placeholder }) {
    return (
        <div className="form-control">
            <label htmlFor={name} className="label">
                <span className="label-text">{label}</span>
            </label>
            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="textarea textarea-bordered h-24"
            />
        </div>
    );
}