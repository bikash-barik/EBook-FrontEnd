import logo from './logo.svg';
import React from 'react';
import Routing from './Routers/routes';
import store from "./Redux/store";
import { Provider } from "react-redux";
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory()
  // let isAuth = sessionStorage.getItem('isAuth')
  // React.useEffect(() => {
  //   if (isAuth) {
  //     history.push('/dashboard')
  //   }

  // }, [isAuth])
  return (
    <React.StrictMode>
      <Provider store={store}>

        <Routing />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
