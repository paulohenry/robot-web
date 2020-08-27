import React from 'react';
import {Route,Switch,BrowserRouter} from 'react-router-dom'
import Interacao from './Pages/Interacao/index'
import Info from './Pages/Info/index'
import Wifi from './Pages/Wifi/index'
import Login from './Pages/Login/index'
import Menu from './Pages/Menu/index'


function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/interacao' component={Interacao}/>
        <Route path='/info' component={Info}/>
        <Route path='/menu' component={Menu}/>
        <Route path='/wifi' component={Wifi}/>        
      </Switch>
    </BrowserRouter>
  )
}

export default Router;