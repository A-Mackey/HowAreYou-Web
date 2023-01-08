import { Goal } from "../../context/data/types";

type GoalPillProps = {
  goal: Goal;
};

function GoalPill(props: GoalPillProps) {
  return (
    <button
      className={
        props.goal.completed ? "goal-pill-completed" : "goal-pill-not-completed"
      }>
      {props.goal.goal}
    </button>
  );
}

export default GoalPill;
