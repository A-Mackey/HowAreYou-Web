type ActivityPillProps = {
  activity: string;
  onClick: (callbackActivity: string) => void;
};

function ActivityPill(props: ActivityPillProps) {
  return (
    <button
      className="activity-pill-container"
      onClick={() => props.onClick(props.activity)}>
      <div className="activity-pill-text">{props.activity}</div>
    </button>
  );
}

export default ActivityPill;
