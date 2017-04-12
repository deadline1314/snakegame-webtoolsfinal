import React, { Component } from 'react';
import Post from './Post';
import PostEditor from './PostEditor';

class ThreadDisplay extends Component {

  constructor(props) {
    super(props);

    this.addPost = this.addPost.bind(this);
    this.updateLocalState = this.updateLocalState.bind(this);
    this.databaseRef = this.props.database.ref().child('post');

    this.state = {
      posts: [],
    };
  }

  componentWillMount() {
    const {updateLocalState} = this;
    this.databaseRef.on('child_added', snapshot => {
      const response = snapshot.val();
      updateLocalState(response);
    });
  }

  updateLocalState(response) {
    const post = this.state.posts;
    const brokenDownPost = response.postBody.split(/[\r\n]/g);
    post.push(brokenDownPost);
    this.setState({
      posts: post
    });
  }

  addPost(postBody) {
    const postToSave = {postBody};
    this.databaseRef.push().set(postToSave);
  }

  render() {
    return (
      <div>
        {
          this.state.posts.map((postBody, idx) => {
            return (
              <Post key={idx} postBody={postBody}/>
            )
          })
        }
        <PostEditor addPost={this.addPost} />
      </div>
    )
  }
}

export default ThreadDisplay;