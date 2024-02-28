import React from 'react'

const dbmanage = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return (
    <div>dbmanage</div>
  )
}

export default dbmanage