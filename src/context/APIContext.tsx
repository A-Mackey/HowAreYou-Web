import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext } from "react";
import { UserAuth } from "./AuthContext";
import { Post } from "./data/types";

type APIContextType = {
  submitPost: (post: Post) => Promise<boolean>;
  numToMonth: (num: number) => string;
};

const APIContext = createContext<APIContextType>({
  submitPost: async (post: Post): Promise<boolean> => {
    return false;
  },
  numToMonth: (num: number) => "",
});

export const APIContextProvider = ({ children }: { children: any }) => {
  const { user } = UserAuth();

  /// Very ugly way of adding a post to the database
  /// in the correct month and year, and creating
  /// the month and year if they don't exist
  const submitPost = async (post: Post): Promise<boolean> => {
    const db = getFirestore();

    const library_user: DocumentReference<DocumentData> = doc(
      db,
      "library_users",
      user.email
    );

    const post_key = numToMonth(post.month) + " " + post.year;

    try {
      let currentPostsForMonth = (await getDoc(library_user)).data();
      if (currentPostsForMonth === undefined) {
        return false;
      }

      console.log(currentPostsForMonth?.posts);
      if (currentPostsForMonth?.posts === undefined) {
        currentPostsForMonth = {
          ...currentPostsForMonth,
          posts: {},
        };
      }

      if (currentPostsForMonth?.posts[post_key] === undefined) {
        currentPostsForMonth.posts = {
          ...currentPostsForMonth?.posts,
          [post_key]: [post],
        };
      } else {
        currentPostsForMonth?.posts[post_key].push(post);
      }

      await updateDoc(library_user, {
        ...currentPostsForMonth,
      });

      console.log("Updated object");
      return true;
    } catch (_err: any) {
      console.error("ERROR", _err);
      return false;
    }
  };

  const numToMonth = (num: number) => {
    switch (num) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "January";
    }
  };

  return (
    <APIContext.Provider value={{ submitPost, numToMonth }}>
      {children}
    </APIContext.Provider>
  );
};

export const APIProvider = (): APIContextType => {
  return useContext(APIContext);
};
