import { useEffect, useState } from "react";
import ActivityPill from "./sub-components/activityPill";
import EmotionButton from "./sub-components/emotionButton";
import Goals from "./sub-components/goals";
import SingleLineInput from "./sub-components/singleLineInput";
import { APIProvider } from "../context/APIContext";
import NotificationBar from "./sub-components/notificationBar";

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

  const [loading, setLoading] = useState<boolean>(false);
  const [successfulPost, setSuccssfulPost] = useState<boolean>(false);
  const [posted, setPosted] = useState<boolean>(false);

  const { submitPost } = APIProvider();

  const emotions = [
    { name: "good", icon: "./icons/GoodEmoji.svg" },
    { name: "alright", icon: "./icons/AlrightEmoji.svg" },
    { name: "bad", icon: "./icons/BadEmoji.svg" },
  ];

  const loadingText = "Loading";
  const successText = "Posted!";
  const failureText = "Something happened, are you missing parameters?";

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

  const submitPostLocal = async () => {
    setLoading(true);

    let response: boolean = false;

    try {
      response = await submitPost({
        emotion: emotions[selectedEmotion].name,
        entry: description,
        activities: activities,
        goals: goals.map((goal: string, index: number) => {
          return { goal: goal, completed: selectedGoals[index] };
        }),
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        timestamp: Date.now(),
      });
    } catch (_error: any) {
      setPosted(true);
      setLoading(false);
      setSuccssfulPost(false);
      return;
    }

    setPosted(true);
    setLoading(false);
    setSuccssfulPost(response);
    clearInputs();
  };

  const clearInputs = () => {
    setSelectedEmotion(-1);
    setDescription("");
    setActivity("");
    setActivities([]);
    // setGoals([]);
    setSelectedGoals([]);
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
          <div className="modal-section-1-header ">
            <h2>How are you?</h2>
            <button
              onClick={() => {
                setPosted(false);
                props.closeModal();
              }}
              className="modal-section-1-header-close">
              <img src="./icons/X.svg" alt="Close" />
            </button>
          </div>
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
            value={description}
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
          <button
            className="modal-submit-button"
            onClick={() => submitPostLocal()}>
            Submit
          </button>
        </div>

        {posted && (
          <div className="modal-section-6">
            {loading ? (
              <NotificationBar text={loadingText} color={0} />
            ) : successfulPost ? (
              <NotificationBar text={successText} color={1} />
            ) : (
              <NotificationBar text={failureText} color={-1} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePostModal;
