type ButtonProps = {
  text?: string;
  icon: boolean;
  onClick: () => void;
  primary: boolean;
};

function Button(props: ButtonProps) {
  return (
    <button
      className={
        "nav-button " +
        (props.primary ? "nav-button-primary" : "nav-button-secondary")
      }
      onClick={props.onClick}>
      {props.icon ? (
        <img src={props.text} alt="Logo" className="nav-button-icon" />
      ) : (
        <div>{props.text}</div>
      )}
    </button>
  );
}

export default Button;
