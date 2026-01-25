
import { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
{/*maybe import local styles */}

function HomePage() {
  const { user, data, success, SetSuccess, SetLoading, SetNewFetch } = useOutletContext();


  return (
    <>
      <div>Welcome home, <i>{user ? user.alias : "Guest"}</i> </div>
    </>
  )
}

export default HomePage;