import { useEffect, useState } from "react";
import { Goal, Post } from "../context/data/types";
import { getImageFromEmotion } from "../context/modules/emotions";
import { getDayOfWeek, numToMonth } from "../context/modules/misc";
import ActivityPill from "./sub-components/activityPill";
import GoalPill from "./sub-components/goalPill";

type PostTileProps = {
  postData: Post;
};

function PostTile(props: PostTileProps) {
  const [dayOfTheWeek, setDayOfTheWeek] = useState<string>("");

  useEffect(() => {
    const date = new Date(props.postData.timestamp);
    const day = date.getDay();
    setDayOfTheWeek(getDayOfWeek(day));
  }, []);

  return (
    <div className="post-tile-container">
      <div className="post-tile-body">
        <div className="post-tile-emotion-image-container">
          <img
            src={getImageFromEmotion(props.postData.emotion)}
            alt="Logo"
            className="post-tile-emotion-image"
          />
        </div>
        <div className="post-tile-content">
          <div className="post-tile-header">
            <h1>
              {dayOfTheWeek}, {numToMonth(props.postData.month)}{" "}
              {props.postData.day}
            </h1>
            <p>
              {props.postData.day}/{props.postData.month + 1}/
              {props.postData.year}
            </p>
          </div>

          <div className="post-tile-activities">
            {props.postData.activities.map((activity, index) => (
              <ActivityPill
                activity={activity}
                key={index}
                onClick={() => {}}
              />
            ))}
          </div>

          <div className="post-tile-description">
            <p>{props.postData.entry}</p>
          </div>

          <div className="post-tile-goals">
            {props.postData.goals.map((goal: Goal, index: number) => (
              <GoalPill goal={goal} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostTile;
