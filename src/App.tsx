import { useSelector } from 'react-redux';
import Login from './views/login/Login';
import { RootState } from './store';
import { useEffect } from 'react';


const App = () => {

  const status = useSelector((store: RootState) => store.login);
  console.log(status);



  const view = status ? null : <Login />

  return (
    <div>
      {view}
    </div>
  );
}

export default App;
