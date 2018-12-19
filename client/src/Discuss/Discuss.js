import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { ListGroup, ListGroupItem, Container, Row, Col, Button } from 'reactstrap';
import { MessageList, ChatItem, Input, Button as ChatBtn } from 'react-chat-elements'
import socketIOClient from 'socket.io-client'
import Moment from 'moment';

class Discuss extends Component {
  
  constructor() {
    super()
    this.myRef = React.createRef()
    this.state = {
      endpoint: "http://localhost:3001", // this is where we are connecting to with sockets
      messages: []
    }
    this.socket = socketIOClient(this.state.endpoint)

    this.socket.on('msgFromServer', function(data){
      addMessage(data)

  })

  const addMessage = data => {
    const { profile } = this.state
    console.log(data);
    if(profile.nickname !== data.nickname)
    {
      this.setState({messages: [...this.state.messages, data]});
    }
    console.log(this.state.messages);
}

  }

  

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  send = () => {
    const socket = socketIOClient(this.state.endpoint)
    const { isAuthenticated } = this.props.auth
    const { profile } = this.state
    
    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.
    //window.confirm(JSON.stringify(profile))
    socket.emit('msgFromClient', {'nickname': profile.nickname, 'msg': this.refs.myRef.state.value, 'time': Date()}) 
    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
  }

  login() {
    this.props.auth.login()
  }

  SendBtnClick() {
    //window.confirm(this.refs.myRef.state.value)
    const { profile } = this.state
    this.setState(prevState => ({
      messages: [...prevState.messages, {'nickname': profile.nickname, 'msg': this.refs.myRef.state.value, 'time': Date()}]
    }))
    //window.confirm(JSON.stringify(this.state.messages))
    this.send()
  }

  render() {
    const { isAuthenticated } = this.props.auth
    const { profile } = this.state

    return (
      <Container fluid>
        {
          isAuthenticated() && (
            
            <Row style={{ height: '90.8vh' }}>
              <Col id="chatWindow" sm="10" style={{ backgroundColor: 'white', textAlign: 'left', height: '80vh', overflowY: 'scroll' }}>
            <ChatItem
                  avatar={'none'}
                  title={Moment().format("dddd, MMMM Do YYYY, h:mm:ss")}
                  subtitle={'What are you doing?'}
                  date={new Date()}
                  unread={0} />

            {this.state.messages.map(msg => 
              <ChatItem
                avatar={'none'}
                title={msg.nickname}
                subtitle={msg.msg}
                date={new Date(msg.time)}
                unread={0}
                />
              )}
              </Col>
  
              <Col className='fixed-bottom' sm="10">
                <Input
                className="inputMsg"
                  placeholder="Tady začněte psát ..."
                  multiline={true}
                  ref = "myRef"
                  rightButtons={
                    <Button
                    style={{ color: 'white', backgroundColor: '#1a248f' }}
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.SendBtnClick.bind(this)}
                  >
                    Odeslat
                  </Button>
                  } />
              </Col>
              <Col style={{ backgroundColor: '#9ea7ff', color: 'black', height: '90.8vh' }} sm="2">Diskuze
            <ListGroup style={{ color: 'black', textAlign: 'center' }}>
                  <ListGroupItem>Pokus č.1</ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          
            )
        }
        </Container>
     
    );
  }
}

export default Discuss;