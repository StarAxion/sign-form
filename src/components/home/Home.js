import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersList from './UsersList';

const Home = () => {
  const [showUsersButton, setShowUsersButton] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users && users.length > 0) {
      setShowUsersButton(false);
    } else {
      setShowUsersButton(true);
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      localStorage.setItem('users', JSON.stringify(response.data));
      setShowUsersButton(false);
    } catch {
      setError(true);
    }
  }

  // OR:

  // const getUsers = () => {
  //   axios.get(`https://jsonplaceholder.typicode.com/users`)
  //     .then(response => {
  //       localStorage.setItem('users', JSON.stringify(response.data));
  //       window.location.reload();
  //     })
  //     .catch(() => {
  //       setError(true);
  //     });
  // }

  const showButton = () => {
    setShowUsersButton(true);
  }

  return (
    <main>
      {showUsersButton ?
        <button
          className='main__button'
          onClick={getUsers}
        >
          Get users list
        </button>
        :
        <UsersList
          showButton={showButton}
        />
      }
      {error &&
        <p
          className='error-message'
          style={{
            marginTop: '20px'
          }}
        >
          Oops! Something went wrong.
        </p>
      }
    </main>
  )
}

export default Home;
