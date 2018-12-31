import React, { Component } from 'react';
import ChatRoom from './components/ChatRoom';
import './App.css';
class App extends Component{
    render(){
        return(
            <div className="App"> 
                <h1>Chat Room</h1>
                <form className="chatRoom">
                <ChatRoom></ChatRoom>
                </form>
            </div>
        )
    }
}

export default App;