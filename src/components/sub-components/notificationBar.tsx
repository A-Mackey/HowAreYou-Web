type NotifcationBarProps = {
  text: string;
  type: "success" | "failure" | "loading";
};

function NotificationBar(props: NotifcationBarProps) {
  return (
    <div
      className={
        "notification-bar-container" +
        (props.type === "failure" ? " notification-bar-failure" : "") +
        (props.type === "loading" ? " notification-bar-loading" : "") +
        (props.type === "success" ? " notification-bar-success" : "")
      }>
      <div>{props.text}</div>
    </div>
  );
}

export default NotificationBar;
