import React, { Component } from 'react';

import axios from 'axios'

import './App.css';

import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.baseURL = 'https://practiceapi.devmountain.com/api'

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    const promise = axios.get(`${this.baseURL}/posts`)
    promise.then((res) => {
      this.setState ({
        posts: res.data
      })
    })
  }

  updatePost(id, text) {
    const promise = axios.put(`${this.baseURL}/posts/?id=${id}`,{text})
    promise.then((res) => {
      this.setState ({
        posts: res.data
      })
    })
  }

  deletePost(id) {
    const promise = axios.delete(`${this.baseURL}/posts/?id=${id}`)
    promise.then((res) => {
      this.setState({
        posts: res.data
      })
    })
  }

  createPost(text) {
    const promise = axios.post(`${this.baseURL}/posts`, {text})
    promise.then((res) => {
      this.setState ({
        posts: res.data
      })
    })
  }

  searchPosts = (text) => {
    const promise = axios.get(`${this.baseURL}/posts`)
    promise.then((res) => {
      const filteredData = res.data.filter((e,i) => e.text.includes(text))
      this.setState ({
        posts: filteredData
      })
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPosts={this.searchPosts}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {
            posts.map((e,i) => {
              return <Post key={i} text={e.text} date={e.date} id={e.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost} />
            })
          }
          
        </section>
      </div>
    );
  }
}

export default App;
