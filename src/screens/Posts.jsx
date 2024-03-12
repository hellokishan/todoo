import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  async function getTodos() {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?userId=1"
      );
      setPosts(res.data);
    } catch (error) {
      alert(error?.message);
      console.log(error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className="todo-container" style={{ height: "100vh" }}>
        <h4>Showing Posts</h4>
        {posts.map((item) => (
          <div key={item?.id}
          data-testid={`item-${item?.id}`}>
            <p>{item?.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
