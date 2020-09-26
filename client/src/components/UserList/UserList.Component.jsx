import React from 'react';
import './UserList.styles.scss';

const UserList = ({ users }) => {
    return (
        <div className="userlist">
            {users ? users.map((user, i) => <div key={i} className="user">{user.name}</div>) : null}
        </div>
    )
}

export default UserList;
