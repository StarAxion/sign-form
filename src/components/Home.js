import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersList from './UsersList';

const Home = () => {
  const [showUsersButton, setShowUsersButton] = useState(true);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users && users.length > 0) {
      setShowUsersButton(false);
    }
  }, []);

  // const getUsersData = async () => {
  //   try {
  //     const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  //     localStorage.setItem('users', JSON.stringify(response.data));
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   window.location.reload();
  // }

  const getUsersData = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(response => {
        localStorage.setItem('users', JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });
    window.location.reload();
  }

  const showButton = () => {
    setShowUsersButton(true);
  }

  return (
    <main>
      {showUsersButton ?
        <button
          className='main__button'
          onClick={getUsersData}
        >
          Get users list
        </button>
        :
        <UsersList
          showButton={showButton}
        />
      }
    </main>
  )
}

export default Home;
