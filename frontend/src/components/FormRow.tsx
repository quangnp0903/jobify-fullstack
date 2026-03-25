const FormRow: React.FC<{
  name: string;
  type: string;
  value?: string;
  defaultValue?: string;
  isRequired?: boolean;
  labelText?: string;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
  name,
  type = 'text',
  defaultValue,
  value,
  isRequired = true,
  labelText = name,
  autoFocus = false,
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue}
        required={isRequired}
        autoFocus={autoFocus}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default FormRow;
