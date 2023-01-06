import { useEffect, useState } from "react";
import ActivityPill from "./sub-components/activityPill";
import EmotionButton from "./sub-components/emotionButton";
import Goals from "./sub-components/goals";
import SingleLineInput from "./sub-components/singleLineInput";

type CreatePostModalProps = {
  closeModal: () => void;
};

export function CreatePostModal(props: CreatePostModalProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<number>(-1);
  const [description, setDescription] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [activities, setActivities] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>(["Yeet", "Yote", "Yote"]);
  const [selectedGoals, setSelectedGoals] = useState<boolean[]>([]);

  const emotions = [
    { name: "Good", icon: "./icons/GoodEmoji.svg" },
    { name: "Alright", icon: "./icons/AlrightEmoji.svg" },
    { name: "Bad", icon: "./icons/BadEmoji.svg" },
  ];

  useEffect(() => {
    setSelectedGoals(goals.map(() => false));
  }, [goals]);

  const updateActivities = () => {
    if (!activities.includes(activity) && activity !== "") {
      setActivities([...activities, activity]);
      setActivity("");
    }
  };

  const toggleGoal = (index: number) => {
    const newSelectedGoals = [...selectedGoals];
    newSelectedGoals[index] = !newSelectedGoals[index];
    setSelectedGoals(newSelectedGoals);
  };

  const submitPost = () => {
    console.log("Submitting...");
  };

  const removeActivity = (activityToRemove: string) => {
    console.log("Removing activity");
    setActivities(
      activities.filter((activity) => activity !== activityToRemove)
    );
  };

  return (
    <div className="modal-container" onClick={() => {}}>
      <div className="modal-body">
        <div className="modal-section-1">
          <h2>How are you?</h2>
          <div className="modal-section-1-emotions">
            {emotions.map((emotion, index: number) => {
              return (
                <EmotionButton
                  onClick={() => setSelectedEmotion(index)}
                  icon={emotion.icon}
                  alt={emotion.name}
                  selected={selectedEmotion === index}
                  key={index}
                />
              );
            })}
          </div>
        </div>

        <div className="modal-section-2">
          <h2>What's on your mind?</h2>
          <textarea
            className="modal-section-2-textarea"
            onChange={(newDescription) => {
              setDescription(newDescription.target.value);
            }}
          />
        </div>

        <div className="modal-section-3">
          <h2>What activities have you been up to?</h2>
          <div className="modal-section-3-activities">
            <SingleLineInput
              onClick={() => {
                updateActivities();
              }}
              onChange={(newInput: string) => {
                setActivity(newInput);
              }}
              input={activity}
            />

            {activities.map((activity: string, index: number) => (
              <ActivityPill
                activity={activity}
                onClick={(activityToRemove: string) => {
                  removeActivity(activityToRemove);
                }}
                key={index}
              />
            ))}
          </div>
        </div>

        <div className="modal-section-4">
          <h2>What goals did you achieve today?</h2>
          <Goals goals={goals} selected={selectedGoals} onClick={toggleGoal} />
        </div>

        <div className="modal-section-5">
          <button className="modal-submit-button" onClick={() => submitPost()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
