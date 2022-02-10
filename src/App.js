import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, addNewPost } from "./store/testSlice";

function App() {
  const postStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const newPostStatus = useSelector((state) => state.products.itemStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = () => {
    dispatch(
      addNewPost({
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      })
    );
  };

  let content, buttonContent;

  if (postStatus === "loading") content = <p>loading...</p>;
  else if (postStatus === "succeeded") content = <p>fetch data succesfully</p>;
  else if (postStatus === "failed") content = <p>fetch data failed {error}</p>;

  if (newPostStatus === "loading") buttonContent = "...";
  else if (newPostStatus === "succeeded") buttonContent = "✔";
  else if (newPostStatus === "failed") buttonContent = "❌";

  return (
    <div>
      {content}
      <button onClick={handleAddPost}>add post {buttonContent}</button>
    </div>
  );
}

export default App;
