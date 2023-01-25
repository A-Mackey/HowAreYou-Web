import { useEffect } from "react";

type SignInButtonProps = {
  id: number;
  image: string;
  alt: string;
  color: string;
  text: string;
  onClick: () => void;
};

export function SignInButton(props: SignInButtonProps) {
  useEffect(() => {
    const button = document.getElementById(`signin-button-body-${props.id}`);
    if (button) {
      button.style.backgroundColor = props.color;
    }
  }, []);

  return (
    <div className="sign-in-button-container">
      <button
        className="signin-button-body"
        id={`signin-button-body-${props.id}`}
        onClick={props.onClick}>
        <img
          src={props.image}
          alt={props.alt}
          className="sign-in-button-image"
        />
        {props.text}
      </button>
    </div>
  );
}
