import React, { useState, useEffect, useCallback } from 'react';
import '../assets/fontawesome/css/all.min.css';
import AddUser from './AddUser';
import EditUser from './EditUser';
import ResultMessage from '../portals/ResultMessage';

const UsersList = (props) => {
  const [users, setUsers] = useState(null);
  const [userId, setUserId] = useState(null);
  const [editUser, setEditUser] = useState(false);
  const [deleteUserResultMessage, setDeleteUserResultMessage] = useState(false);

  const getUsersFromStorage = useCallback(() => {
    const list = JSON.parse(localStorage.getItem('users'));
    setUsers(list);
  }, []);

  useEffect(() => {
    getUsersFromStorage();
  }, [getUsersFromStorage]);

  const removeUser = (id) => {
    setDeleteUserResultMessage(true);
    setTimeout(() => {
      const newList = users.filter(user => user.id !== id);
      localStorage.setItem('users', JSON.stringify(newList));
      setUsers(newList);
      if (newList.length === 0) {
        localStorage.removeItem('users');
        props.showButton();
      } else {
        setDeleteUserResultMessage(false);
      }
    }, 1000);
  }

  const openUserEdit = (id) => {
    setUserId(id);
    setEditUser(true);
  }

  const closeUserEdit = () => {
    setEditUser(false);
  }

  const tableHead = ['id', 'name', 'username', 'email', 'delete', 'edit'];

  return (
    <>
      <div>
        {!users ?
          <p style={{
            fontStyle: 'italic'
          }}>
            Loading users list...
        </p>
          :
          <>
            <table className='main__table'>
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
                {users.map(({ id, name, username, email }) =>
                  (<tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{username}</td>
                    <td>{email.toLowerCase()}</td>
                    <td>
                      <button
                        className='main__button'
                        title='remove user'
                        onClick={() => removeUser(id)}
                      >
                        <i className="fas fa-user-minus"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className='main__button'
                        title='edit data'
                        onClick={() => openUserEdit(id)}
                      >
                        <i className="fas fa-user-edit"></i>
                      </button>
                    </td>
                  </tr>)
                )}
              </tbody>
            </table>

            <AddUser
              users={users}
              updateList={getUsersFromStorage}
            />

            {editUser &&
              <EditUser
                id={userId}
                users={users}
                closeUserEdit={closeUserEdit}
              />
            }
          </>
        }
      </div>

      {deleteUserResultMessage &&
        <ResultMessage>
          <div>
            <p>User deleted!</p>
          </div>
        </ResultMessage>
      }
    </>
  )
}

export default UsersList;
