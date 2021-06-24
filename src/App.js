import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';

// Landing
import Main from './components/Main'
import Search from "./components/landing_page/search/SearchView"
import Detail from "./components/landing_page/search/OfficeDetail"
import Availability from "./components/landing_page/reservation/Availability"

// Login
import Login from "./components/login/Login"

// Backoffice
import MainView from './components/backoffice/MainView'
// Publications - post
import Post from './components/backoffice/publications/post/MainView'
import NewOffice from './components/backoffice/publications/post/NewOffice'
// Publications - published
import Published from './components/backoffice/publications/published/Published'
// Rental - Favorites
import Favorites from './components/backoffice/rental/favorites/Favorites'
// Rental - Bookings
import Bookings from './components/backoffice/rental/rented/Bookings'


class App extends Component {

  render() {
      return (
          <Router>
              <Route exact path="/home" component={Main} />
              <Route exact path="/buscar_oficina" component = {Search} />
              <Route exact path="/detalle" component = {Detail} />
              <Route exact path="/reserva" component = {Availability} />

              <Route exact path="/login" component={Login} />

              <Route exact path="/inicio" component={MainView} />
              <Route exact path="/publicar" component={Post} />
              <Route exact path="/nueva_oficina" component={NewOffice} />
              <Route exact path="/publicados" component={Published} />
              <Route exact path="/favoritos" component={Favorites} />
              <Route exact path="/reservas" component={Bookings} />
              
              <Route exact path="/" render={() => <Redirect to="/home" />} />
          </Router>
      )
  }
}

export default App;