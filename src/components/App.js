import {BrowserRouter, Route, Switch} from "react-router-dom";
import Calendar from "./Calendar/Calendar";
import Teams from "./Teams/Teams";
import League from "./League/League";
import ListLeagues from "./ListLeague/ListLeagues";
import React from "react";
import Navbar from "./Navbar/Navbar";

function App() {

    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route exact path={"/"} component={ListLeagues}/>
                <Route path={'/league/:id'} component={League}/>
                <Route exact path={"/teams/:id"} component={Teams}/>
                <Route exact path={"/calendar/:type/:id"} component={Calendar}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
