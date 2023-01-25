import { useEffect, useState } from "react";
import ActivityPill from "./sub-components/activityPill";
import EmotionButton from "./sub-components/emotionButton";
import Goals from "./sub-components/goals";
import SingleLineInput from "./sub-components/singleLineInput";
import { APIProvider } from "../context/APIContext";
import NotificationBar from "./sub-components/notificationBar";
import { v4 as uuidv4 } from "uuid";
import { emotions } from "../context/modules/emotions";
import { Menu, MenuItem } from "@mui/material";

type CreatePostModalProps = {
  closeModal: () => void;
};

export function CreatePostModal(props: CreatePostModalProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<number>(-1);
  const [description, setDescription] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [activities, setActivities] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<boolean[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [successfulPost, setSuccssfulPost] = useState<boolean>(false);
  const [posted, setPosted] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const emojiMenuOpen = Boolean(anchorEl);

  const { submitPost, getUserGoals } = APIProvider();

  const loadingText = "Loading";
  const successText = "Posted!";
  const failureText = "Something happened, are you missing parameters?";

  useEffect(() => {
    const getGoals = async () => {
      const goals = await getUserGoals();
      setGoals(goals);
    };

    getGoals();
  }, []);

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
        id: uuidv4(),
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              return index < 3 ? (
                <EmotionButton
                  onClick={() => setSelectedEmotion(index)}
                  icon={emotion.icon}
                  alt={emotion.name}
                  selected={selectedEmotion === index}
                  key={index}
                />
              ) : (
                index === 4 && (
                  <button
                    onClick={handleClick}
                    className="modal-section-1-emotions-more-button">
                    <img
                      src="./icons/trippleDots.svg"
                      alt="More"
                      className="modal-section-1-emotions-more-buttom-image"
                    />
                  </button>
                )
              );
            })}
          </div>
        </div>

        <Menu
          open={emojiMenuOpen}
          anchorEl={anchorEl}
          classes={{ paper: "modal-menu" }}>
          {emotions.map((emotion, index: number) => (
            <MenuItem>
              <EmotionButton
                onClick={() => {
                  setSelectedEmotion(index);
                  handleClose();
                }}
                icon={emotion.icon}
                alt={emotion.name}
                selected={selectedEmotion === index}
                key={index}
              />
            </MenuItem>
          ))}
        </Menu>

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
              <NotificationBar text={loadingText} type="loading" />
            ) : successfulPost ? (
              <NotificationBar text={successText} type="success" />
            ) : (
              <NotificationBar text={failureText} type="failure" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePostModal;
