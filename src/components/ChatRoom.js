import React, { Component } from 'react';
import './chatRoom.css';

class ChatRoom extends Component {

  constructor() {
    super();
    this.state = {
      message: '',
      messages: [
        // {id: 0, text: 'asdasd'},
        // {id: 1, text: 'asdasd'},
        // {id: 2, text: 'asdasd'}
      ]
    }

  }

  componentDidMount() {
    window.firebase.database().ref('messages/').on('value', snap => {
      const currentMessages = snap.val();
      if (currentMessages != null) {
        this.setState({
          messages: currentMessages
        });
      }
    });
  }

  updateMessage(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let list = this.state.messages;
    const newMessage = {
      id: this.state.messages.length,
      text: this.state.message
    };
    // list.push(newMessage);
    // this.setState({
    //   messages: list
    // });
    window.firebase.database().ref(`messages/${newMessage.id}`)
      .set(newMessage);
    this.setState({
      message: ''
    });
  }

  render() {
    const { messages } = this.state;
    const messagesList = messages.map(message => {
      return <li key={message.id}>{message.text}</li>
    });

    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <ul>
          {messagesList}
        </ul>
        <input
          onChange={this.updateMessage.bind(this)}
          value={this.state.message}
          placeholder="Message"
          type="text" />
        <button
          onClick={this.handleSubmit.bind(this)}
          >
          Send
        </button>
      </form>
    )
  }
}
export default ChatRoom;
