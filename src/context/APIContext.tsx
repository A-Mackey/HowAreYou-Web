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
import { Post, User } from "./data/types";
import { numToMonth } from "./modules/misc";

type APIContextType = {
  submitPost: (post: Post) => Promise<boolean>;
  getUserData: () => Promise<User>;
};

const APIContext = createContext<APIContextType>({
  submitPost: async (post: Post): Promise<boolean> => {
    return false;
  },
  getUserData: async (): Promise<User> => {
    return {};
  },
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

      return true;
    } catch (_err: any) {
      console.error("ERROR", _err);
      return false;
    }
  };

  const getUserData = async (): Promise<User> => {
    const db = getFirestore();
    const library_user: DocumentReference<DocumentData> = doc(
      db,
      "library_users",
      user.email
    );

    const database_user = (await getDoc(library_user)).data();
    return database_user as User;
  };

  return (
    <APIContext.Provider value={{ submitPost, getUserData }}>
      {children}
    </APIContext.Provider>
  );
};

export const APIProvider = (): APIContextType => {
  return useContext(APIContext);
};
