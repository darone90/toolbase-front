import React, { useEffect, useState } from 'react';
import Login from './views/login/Login';


const App = () => {

  const [status, setStatus] = useState<boolean>(false)

  useEffect(() => {
    console.log('checking login status by backend API');
    setStatus(false)
  }, []);

  const view = status ? null : <Login />

  return (
    <div>
      {view}
    </div>
  );
}

export default App;
