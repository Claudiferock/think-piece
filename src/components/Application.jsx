import React, { Component } from 'react';

import { firestore } from '../firebase';

import Posts from './Posts';
import { collectIdsAndDocs } from '../utilities';

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null;

  componentDidMount = async () => {
    this.unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  handleCreate = async post => {
    const { posts } = this.state;

    // Could do a post collection variable "firestore.collection('posts')"
    // or addPost() function that is used everywhere on the app
    const docRef = await firestore.collection('posts').add(post);
    const doc = await docRef.get();

    const newPost = collectIdsAndDocs(doc);

    this.setState({ posts: [newPost, ...posts] });
  };

  handleRemove = async id => {
    const allPosts = this.state.posts;

    //filter through the array
    // allowed to stay if your id is not equal to the id we are looking for
    const posts = allPosts.filter(post => post.id !== id);

    this.setState({ posts });
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts 
          posts={posts}
          onCreate={this.handleCreate} 
          onRemove={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
