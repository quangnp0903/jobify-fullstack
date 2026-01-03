const FormRowSelect: React.FC<{
  name: string;
  defaultValue?: string;
  isRequired?: boolean;
  labelText?: string;
  list: string[];
}> = ({ name, defaultValue, isRequired = true, labelText = name, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <select
        id={name}
        name={name}
        className="form-select"
        defaultValue={defaultValue}
        required={isRequired}
      >
        {list.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
