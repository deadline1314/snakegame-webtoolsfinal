import React, {Component} from 'react';

class PostEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPostBody: ''
    };

    this.handlePostEditorInputChange = this.handlePostEditorChange.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  handlePostEditorChange(e) {
    this.setState({
      newPostBody: e.target.value
    });
  }

  createPost() {
    this.props.addPost(this.state.newPostBody);

    this.setState({
      newPostBody:''
    });
  }

  render() {
    return (
      <div className="panel panel-default post-editor">
        <div className="panel-body">
          <textarea className="form-control" value={this.state.newPostBody} onChange={this.handlePostEditorInputChange} />
          <button className="btn btn-success post-editor-btn" onClick={this.createPost}>Post</button>
        </div>
      </div>
    )
  }
}

export default PostEditor;