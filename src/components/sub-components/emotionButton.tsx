type EmotionButtonProps = {
  icon: string;
  alt: string;
  onClick: () => void;
  selected: boolean;
};

function EmotionButton(props: EmotionButtonProps) {
  return (
    <button
      className={
        "emotion-button-container" +
        (props.selected
          ? " emotion-button-selected"
          : " emotion-button-unselected")
      }
      onClick={() => props.onClick()}>
      <img src={props.icon} alt={props.alt} className="emotion-button-icon" />
    </button>
  );
}

export default EmotionButton;
