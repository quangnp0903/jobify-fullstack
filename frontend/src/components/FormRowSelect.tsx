const FormRowSelect: React.FC<{
  name: string;
  value?: string;
  defaultValue?: string;
  isRequired?: boolean;
  labelText?: string;
  list: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({
  name,
  defaultValue,
  isRequired = true,
  labelText = name,
  list,
  value,
  onChange,
}) => {
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
        onChange={onChange}
        value={value}
      >
        {list.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
