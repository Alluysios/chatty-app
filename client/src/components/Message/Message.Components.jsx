import React from 'react';
import './Message.styles.scss';
import ReactEmoji from 'react-emoji';

const Message = ({ message: {user, text}, name}) => {
    let currentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if(user === trimmedName) currentUser = true;


    return (
        currentUser ? (
            <div className="message align-right">
                <p className="message__name text-right">{user}</p>
                <div className="message__bg message__bg--blue ml-auto">
                    <span className="message__text">{ReactEmoji.emojify(text)}</span>
                </div>
            </div>
        )
        :
        (
            <div className="message align-left">
                <p className="message__name text-left">{user}</p>
                <div className="message__bg message__bg--light mr-auto">
                    <span className="message__text">{ReactEmoji.emojify(text)}</span>
                </div>
            </div>
        )
    )
}

export default Message;
