type SingleLineInputProps = {
  onClick: () => void;
  onChange: (newInput: string) => void;
  input: string;
};

function SingleLineInput(props: SingleLineInputProps) {
  return (
    <div className="single-line-input-container">
      <input
        type="text"
        value={props.input}
        onChange={(input) => props.onChange(input.target.value)}
        className="single-line-input"
      />
      <button
        onClick={() => props.onClick()}
        className="single-line-input-button">
        {">"}
      </button>
    </div>
  );
}

export default SingleLineInput;
