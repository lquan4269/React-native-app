
// import React, {Component} from 'react';
// import Myinfocomponent from './components/Myinfocomponent'
// class App extends Component{
//     render(){
//       return(
//       <Myinfocomponent name ="QuanLC"/>
//       );
//     }
// }
// export default App;

import React from 'react';
import Main from './components/MainComponent';
//redux
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
// redux-persist
import { PersistGate } from 'redux-persist/es/integration/react';
const { persistor, store } = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
