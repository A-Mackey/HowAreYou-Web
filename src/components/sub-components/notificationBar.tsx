type NotifcationBarProps = {
  text: string;
  color: number;
};

function NotificationBar(props: NotifcationBarProps) {
  return (
    <div
      className={
        "notification-bar-container" +
        (props.color === -1 ? " notification-bar-failure" : "") +
        (props.color === 0 ? " notification-bar-loading" : "") +
        (props.color === 1 ? " notification-bar-success" : "")
      }>
      <div>{props.text}</div>
    </div>
  );
}

export default NotificationBar;
