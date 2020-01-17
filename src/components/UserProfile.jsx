import React, { Component } from 'react';
import { auth } from '../firebase';
import { firestore } from '../firebase';

class UserProfile extends Component {
  state = { displayName: '' };
  imageInput = null;

  get uid() {
    return auth.currentUser.uid;
  }

  get userRef() {
    return firestore.doc(`users/${this.uid}`);
  }

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({ [name]: value});
  }

  handleSubmit = event => {
    event.preventDefault();  // to not accidentally drop the page
    const { displayName } = this.state;
    
    // if there is a display name, we want to update the user ref
    if (displayName) {
      this.userRef.update({ displayName });
    }
  }

  render() {
    const { displayName } = this.state;

    return (
      <section className="UserProfile">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={displayName}
            name="displayName"
            onChange={this.handleChange}
            placeholder="Display Name"
          />
          <input type="file" ref={ref => (this.imageInput = ref)} />
          <input className="update" type="submit" />
        </form>
      </section>
    );
  }
}

export default UserProfile;