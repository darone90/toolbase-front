import { useSelector } from 'react-redux';
import Login from './views/login/Login';
import { RootState } from './store';
import Main from './views/main/Main';



const App = () => {


  const { loginStatus } = useSelector((store: RootState) => store.login);

  const view = loginStatus ? <Main /> : <Login />

  return (
    <div>
      {view}
    </div>
  );
}

export default App;
