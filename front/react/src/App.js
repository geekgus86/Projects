import React, { Component } from 'react'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import { Provider } from 'react-redux'
import { store } from './store'
import './App.css'
import CheckAuth from './CheckAuth'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CheckAuth />
        </MuiPickersUtilsProvider>
      </Provider>
    );
  }
}

export default App;
