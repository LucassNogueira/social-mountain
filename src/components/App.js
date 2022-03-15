import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Post from "./Post/Post";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.filterPost = this.filterPost.bind(this);
  }

  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then((res) => {
      this.setState({ posts: res.data });
    });
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then((res) => this.setState({ posts: res.data }));
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then((res) => this.setState({ post: res.data }));
  }

  createPost(text) {
    axios
      .post("https://practiceapi.devmountain.com/api/posts", { text })
      .then((res) => this.setState({ posts: res.data }));
  }

  filterPost(text) {
    text === ""
      ? axios
          .get("https://practiceapi.devmountain.com/api/posts")
          .then((res) => {
            this.setState({ posts: res.data });
          })
      : axios
          .get(
            `https://practiceapi.devmountain.com/api/posts/filter?text=${text}`
          )
          .then((res) => {
            this.setState({ posts: res.data });
          });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header
          filterPost={this.filterPost}
          componentDidMount={this.componentDidMount}
        />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map((post) => (
            <Post
              deletePostFn={this.deletePost}
              updatePostFn={this.updatePost}
              id={post.id}
              key={post.id}
              text={post.text}
              date={post.date}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
