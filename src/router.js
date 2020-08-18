import React from 'react';
import {Route,Switch,BrowserRouter} from 'react-router-dom'
import Interacao from './Pages/Interacao/index'
import Details from './Pages/Details/index'
import Wifi from './Pages/Wifi/index'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Interacao}/>
        <Route path='/details' component={Details}/>
        <Route path='/wifi' component={Wifi}/>
        
      </Switch>
    </BrowserRouter>
  )
}

export default Router;