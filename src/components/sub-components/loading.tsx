import { getRandomGoodEmotion } from "../../context/modules/emotions";

function Loading(_props: any) {
  return (
    <div className="loading-container">
      <img
        src={getRandomGoodEmotion().icon}
        alt="Loading"
        className="rotate-img"
      />
    </div>
  );
}

export default Loading;
