import { Route } from 'react-router-dom'
import React from "react";
import UberApp from "./components/UberApp";
import RidePage from "./RidePage";
function Main() {
    return (
    <div>
        <Route exact path='/' component={UberApp}/>
        <Route exact path='/ride/:userId' component={RidePage}/>
    </div>

    );
}
export default Main;