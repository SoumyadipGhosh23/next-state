"use client";
import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost } from "../redux/slices/postSlice";
import styles from "./page.module.css";
import { useState } from "react";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const handleAddPost = (e) => {
    e.preventDefault();

    if(!title && !description) return;

    const newPost = {
      id: Date.now(),
      title,
      description,
    };

    dispatch(addPost(newPost));

    // Reset form fields
    setTitle('');
    setDescription('');
  };

  const handleRemovePost = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleAddPost}>
        <input
          type="text"
          className={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          className={styles.input}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className={styles.button} onClick={handleAddPost}>Add New Post</button>
      </form>
      <h1 className={styles.heading}>Posts</h1>
      {posts ? (
        posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.description}>{post.description}</p>
            <button
              className={styles.deleteButton}
              onClick={() => handleRemovePost(post.id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}