import { UserAuth } from "../context/AuthContext";
import { APIProvider } from "../context/APIContext";
import { useEffect, useState } from "react";
import { Post } from "../context/data/types";
import PostTile from "./postTile";
import { numToMonth } from "../context/modules/misc";
import Goals from "./sub-components/goals";
import Loading from "./sub-components/loading";

function HomeLoggedIn(_props: any) {
  const { user, logOut } = UserAuth();
  const { getUserData, getUserGoals, setUserGoals } = APIProvider();

  const [loading, setLoading] = useState<boolean>(true);

  const [userData, setUserData] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [goals, setGoals] = useState<string[]>([
    "Some super long sentence that has a lot of words and break points",

    "Short",
  ]);
  const [selectedGoals, setSelectedGoals] = useState<boolean[]>([]);

  const yearStop = 2019;

  useEffect(() => {
    populateUserData();
    populateGoals();
  }, []);

  const populateUserData = async () => {
    setLoading(true);

    const data = await getUserData();
    setUserData(data);
    const user_posts = data.posts;
    let all_posts: Post[] = [];

    for (
      let i = new Date().getMonth(), currentYear = new Date().getFullYear();
      currentYear > yearStop;
      --i
    ) {
      if (i < 0) {
        --currentYear;
        i = 11;
      }

      const month = numToMonth(i);

      const key = month + " " + currentYear;
      if (key in user_posts) {
        const postsForMonth = user_posts[key] as Post[];
        const sorted = [
          ...postsForMonth.sort((a, b) => {
            return b.timestamp - a.timestamp;
          }),
        ];

        const combined = [...all_posts, ...sorted];
        const unique = combined.filter(
          (element, i) => i === combined.indexOf(element)
        );

        all_posts = unique;
      }
    }

    setPosts(all_posts);

    setLoading(false);
  };

  const toggleGoal = (index: number) => {
    const newSelectedGoals = [...selectedGoals];
    newSelectedGoals[index] = !newSelectedGoals[index];
    setSelectedGoals(newSelectedGoals);
  };

  const populateGoals = async () => {
    const goals = await getUserGoals();
    setGoals(goals);
    console.log("GOALS", goals);
  };

  return (
    <div className="home-logged-in-container">
      <div className="home-logged-in-header-posts">
        <div className="home-logged-in-header">
          <h1 className="home-logged-in-title">
            How are you{userData ? `, ${userData.firstName}` : ""}?
          </h1>
          <button onClick={() => logOut()} className="home-logged-in-button">
            Log Out
          </button>
        </div>

        <div className="home-logged-in-body">
          {loading ? (
            <Loading />
          ) : (
            posts.map((post: Post, index: number) => (
              <div key={index}>
                <PostTile postData={post} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="home-logged-in-goals-container">
        <div className="home-logged-in-goals-header">
          <h3>Daily Goals</h3>
          <button className="home-logged-in-goal-add-button">+ Goal</button>
        </div>
        <Goals goals={goals} selected={selectedGoals} onClick={toggleGoal} />
      </div>
    </div>
  );
}

export default HomeLoggedIn;
