import { Goal } from "../../context/data/types";

type GoalPillProps = {
  goal: Goal;
};

function GoalPill(props: GoalPillProps) {
  return (
    <div
      className={
        props.goal.completed ? "goal-pill-completed" : "goal-pill-not-completed"
      }>
      {props.goal.goal}
    </div>
  );
}

export default GoalPill;
