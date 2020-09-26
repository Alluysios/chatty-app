import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import './Chat.styles.scss';
import { Link } from 'react-router-dom';

// Components
import MessageBox from '../../components/MessageBox/MessageBox.Component';
import FormInput from '../../components/FormInput/FormInput.Component';
import FormButton from '../../components/FormButton/FormButton.Component';
import UserList from '../../components/UserList/UserList.Component';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    let ENDPOINT = 'http://localhost:8000/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        socket.emit('joinRoom', { name, room }, () => {})
        
        return () => {
            socket.emit('disconnect', () => {});
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on('roomusers', roomInfo => {
            setUsers(roomInfo.users);
        })
    }, [messages])
    console.log(users);
    const handleSubmit = e => {
        e.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    return (
        <div className='flex flex-center'>
            <Link className='home-btn' to='/'>
                &larr; Leave Room
            </Link>
            <div className="flex-1">
                <h2 className='room-name'>{room}</h2>
                <MessageBox messages={messages} name={name}/>
                <form action="#" id='form--chat' onSubmit={handleSubmit}>
                    <FormInput 
                        type='text'
                        id='message'
                        name='message'
                        placeholder="write a message..."
                        className="input--none"
                        value={message}
                        onChange={setMessage}
                    />
                    <FormButton btnType='secondary' title="send message" />
                </form>
            </div>
            <div className="flex-2">
                <h2>Users</h2>
                <UserList users={users} />
            </div>
        </div>
    )
}

export default Chat;