import React from 'react';
import './MessageBox.styles.scss';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message.Components';

const MessageBox = ({messages, name}) => {

    return (
        <ScrollToBottom className="scroll-to-bottom">
            <div className="flex-container">
                { messages ? messages.map((message, i) => <React.Fragment key={i}><Message message={message} name={name} /></React.Fragment>) : null}
            </div>
        </ScrollToBottom>
    )
}

export default MessageBox;
