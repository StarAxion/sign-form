import React, { useState, useEffect } from 'react';
import '../assets/fontawesome/css/all.min.css';

const UsersList = (props) => {
  const [usersList, setUsersList] = useState({
    data: []
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('users'));
    setUsersList({ data });
  }, []);

  const tableHead = ['id', 'name', 'username', 'email', 'x'];

  const removeUser = (id) => {
    const newData = usersList.data.filter(user => id !== user.id);
    if (newData.length === 0) {
      localStorage.removeItem('users');
      props.showButton();
    } else {
      localStorage.setItem('users', JSON.stringify(newData));
    }
    setUsersList({ data: newData });
  }

  return (
    <table>
      <caption>Users list:</caption>

      <thead>
        <tr>
          {tableHead.map((value, index) =>
            (<th key={index}>
              {value.toUpperCase()}
            </th>)
          )}
        </tr>
      </thead>

      <tbody>
        {usersList.data && usersList.data.map(({ id, name, username, email }) =>
          (<tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>{email.toLowerCase()}</td>
            <td>
              <button
                title='remove user'
                className='main__button'
                onClick={() => removeUser(id)}
              >
                <i className="fas fa-user-minus"></i>
              </button>
            </td>
          </tr>)
        )}
      </tbody>
    </table>
  )
}

export default UsersList;
