import homeTimelineStore from '../stores/home-timeline-store';
import React from 'react'
import twitterClient from '../twitter-client'

/**
 * @param {KeyboardEvent} event
 * @return {String}
 */
const keyStringOf = (event) => {
  if (event.ctrlKey && event.keyCode === 13) {
    return 'Ctrl+Return';
  } else {
    return '';
  }
};

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  getRestTextLength() {
    return 140 - this.state.text.length;
  }

  onSubmitButtonClicked(event) {
    this.postTweet().then(({ tweet }) => {
      homeTimelineStore.mergeTweet(tweet);
    });
  }

  onTextareaChanged(event) {
    this.setState({ text: event.target.value });
  }

  onTextareaKeyDown(event) {
    if (keyStringOf(event) == 'Ctrl+Return') {
      event.preventDefault();
      this.postTweet();
    }
  }

  render() {
    return(
      <div className="editor">
        <div>
          <textarea name="name" rows="3" cols="40" className="editor-textarea" onChange={this.onTextareaChanged.bind(this)} onKeyDown={this.onTextareaKeyDown.bind(this)} placeholder="What's happening?" value={this.state.text}></textarea>
        </div>
        <div>
          <button className="editor-submit-button" onClick={this.onSubmitButtonClicked.bind(this)} type="button">
            <i className="fa fa-bullhorn"></i>
            Tweet
          </button>
          <div className="editor-counter">
            {this.getRestTextLength()}
          </div>
        </div>
      </div>
    );
  }

  postTweet() {
    twitterClient.postTweet({ text: this.state.text });
    this.setState({ text: '' });
  }
}
