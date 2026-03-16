const FormRow: React.FC<{
  name: string;
  type: string;
  defaultValue?: string;
  isRequired?: boolean;
  labelText?: string;
  autoFocus?: boolean;
}> = ({
  name,
  type = 'text',
  defaultValue,
  isRequired = true,
  labelText = name,
  autoFocus = false,
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
      />
    </div>
  );
};

export default FormRow;
