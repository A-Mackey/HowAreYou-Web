type GoalsProps = {
  onClick?: (index: number) => void;
  goals: string[];
  selected?: boolean[];
};

function Goals(props: GoalsProps) {
  return (
    <div className="goals-container">
      {props.goals.map((goal: string, index: number) => (
        <div className="goal-single" key={index}>
          <button
            className="goal-row"
            onClick={() => {
              if (props.onClick !== undefined) props.onClick(index);
            }}>
            <div
              className={
                props.selected !== undefined
                  ? props.selected[index]
                    ? "goal-bullet-filled"
                    : "goal-bullet"
                  : "goal-bullet"
              }
            />
            <div>{goal}</div>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Goals;
