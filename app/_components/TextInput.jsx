export default function TextInput({ label, name, type, value, onChange, placeholder }){
    return (
      <div className="form-control">
        <label htmlFor={name} className="label">
          <span className="label-text text-white">{label}</span>
        </label>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input input-bordered  text-white"
        />
      </div>
    );
  };