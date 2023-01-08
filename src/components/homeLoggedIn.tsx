import { UserAuth } from "../context/AuthContext";
import { APIProvider } from "../context/APIContext";
import { useEffect, useState } from "react";
import { Post } from "../context/data/types";
import PostTile from "./postTile";
import { numToMonth } from "../context/modules/misc";

function HomeLoggedIn(_props: any) {
  const { user, logOut } = UserAuth();
  const { getUserData } = APIProvider();

  const [userData, setUserData] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const yearStop = 2019;

  useEffect(() => {
    populateUserData();
  }, []);

  useEffect(() => {
    console.log("Posts have changed", posts);
  }, [posts]);

  const populateUserData = async () => {
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
        console.log(key);
        const postsForMonth = user_posts[key] as Post[];
        const sorted = [
          ...postsForMonth.sort((a, b) => {
            return b.timestamp - a.timestamp;
          }),
        ];

        console.log("Prior to combining", posts);
        const combined = [...all_posts, ...sorted];
        console.log("Combined ", combined);
        const unique = combined.filter(
          (element, i) => i === combined.indexOf(element)
        );

        console.log("unique ", unique);

        all_posts = unique;
      }
    }

    setPosts(all_posts);
  };

  return (
    <div className="home-logged-in-container">
      <div className="home-logged-in-header">
        <h1 className="home-logged-in-title">
          How are you{userData ? `, ${userData.firstName}` : ""}?
        </h1>
        <button onClick={() => logOut()} className="home-logged-in-button">
          Log Out
        </button>
      </div>

      <div className="home-logged-in-body">
        {posts.map((post: Post, index: number) => (
          <div key={index}>
            <PostTile postData={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeLoggedIn;
