import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Join.styles.scss';

import FormButton from '../../components/FormButton/FormButton.Component';
import FormInput from '../../components/FormInput/FormInput.Component';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className='join'>
            <div className="container--center">
                <h1>Welcome to Chatty</h1>
                <FormInput
                    type="text"
                    id="name"
                    name="name"
                    label="Name"
                    className='input--primary'
                    value={name}
                    onChange={setName}
                />
                <FormInput
                    type="text"
                    id="room"
                    name="room"
                    label="Room Name"
                    className='input--primary'
                    value={room}
                    onChange={setRoom}
                />
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <FormButton btnType='primary mt-7' title='Join Room' />
                </Link>
            </div>
        </div>
    )
}

export default Join;
