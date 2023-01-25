import { UserAuth } from "../context/AuthContext";
import { APIProvider } from "../context/APIContext";
import { useEffect, useState } from "react";
import { Post } from "../context/data/types";
import PostTile from "./postTile";
import { numToMonth } from "../context/modules/misc";
import Loading from "./sub-components/loading";
import GoalsDrawer from "./sub-components/goalsDrawer";

function HomeLoggedIn(_props: any) {
  const { logOut } = UserAuth();
  const { getUserData, getUserGoals } = APIProvider();

  const [loading, setLoading] = useState<boolean>(true);

  const [userData, setUserData] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [goals, setGoals] = useState<string[]>([]);

  const yearStop = 2019;

  useEffect(() => {
    populateUserData();
    populateGoals();
  }, []);

  const populateUserData = async () => {
    setLoading(true);

    const data = await getUserData();
    setUserData(data);
    const user_posts = data?.posts;
    let all_posts: Post[] = [];

    if (user_posts === undefined) {
      setPosts([]);
      setLoading(false);
      return;
    }

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

  const populateGoals = async () => {
    const goals = await getUserGoals();
    setGoals(goals);
  };

  return (
    <div className="home-logged-in-container">
      <div className="home-logged-in-header-posts">
        <div className="home-logged-in-header">
          <h1 className="home-logged-in-title">
            How are you{userData?.firstName ? `, ${userData.firstName}` : ""}?
          </h1>
          <button onClick={() => logOut()} className="home-logged-in-button">
            Log Out
          </button>
        </div>

        <div className="home-logged-in-body">
          {loading ? (
            <Loading />
          ) : posts.length === 0 ? (
            <h3>
              No posts found 😩, create your first post using the + button in
              the left navigation!
            </h3>
          ) : (
            posts.map((post: Post, index: number) => (
              <div key={index}>
                <PostTile postData={post} />
              </div>
            ))
          )}
        </div>
      </div>

      <GoalsDrawer />
    </div>
  );
}

export default HomeLoggedIn;
