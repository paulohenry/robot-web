import React from 'react';
import {Route,Switch,BrowserRouter} from 'react-router-dom'
import Interacao from './Pages/Interacao/index'
import Details from './Pages/Details/index'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Interacao}/>
        <Route path='/details' component={Details}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;