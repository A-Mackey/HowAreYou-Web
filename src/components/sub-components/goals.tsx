import { useEffect, useState } from "react";
import { APIProvider } from "../../context/APIContext";
import { UserAuth } from "../../context/AuthContext";
import Loading from "./loading";

type GoalsProps = {
  onClick?: (index: number) => void;
  goals: string[];
  selected?: boolean[];
  editable?: boolean;
};

function Goals(props: GoalsProps) {
  const { user } = UserAuth();
  const { setUserGoals, getUserGoals } = APIProvider();

  const [goals, setGoals] = useState<string[]>([]);
  const [addedGoal, setAddedGoal] = useState<string>("");

  useEffect(() => {
    hydrateGoals();
  }, []);

  const hydrateGoals = async () => {
    setGoals(await getUserGoals());
  };

  const addGoal = () => {
    setUserGoals([...goals, addedGoal]);
    setGoals([...goals, addedGoal]);
  };

  const removeGoal = (index: number) => {
    const newGoals = goals.filter((_goal, i) => i !== index);
    setUserGoals(newGoals);
    setGoals(newGoals);
  };

  return (
    <div className="goals-container">
      {user === null ? (
        <Loading />
      ) : (
        goals.map((goal: string, index: number) => (
          <div className="goal-single" key={index}>
            <button
              className="goal-row"
              onClick={() => {
                if (props.onClick !== undefined) props.onClick(index);
              }}>
              <div className="goal-left">
                <div
                  className={
                    props.selected !== undefined
                      ? props.selected[index]
                        ? "goal-bullet-filled"
                        : "goal-bullet"
                      : "goal-bullet"
                  }
                />
              </div>
              <div className="goal-center">
                <div className="goal-goal">{goal}</div>
              </div>
              <div className="goal-right">
                <button
                  onClick={() => removeGoal(index)}
                  className="goal-remove-button">
                  <img src="/icons/X.svg" alt="X" />
                </button>
              </div>
            </button>
          </div>
        ))
      )}

      {props.editable !== undefined && props.editable && (
        <div className="goal-add-section">
          <button className="goal-add-button" onClick={() => addGoal()}>
            +
          </button>
          <input
            type="text"
            className="goal-input"
            onChange={(n) => {
              setAddedGoal(n.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Goals;
