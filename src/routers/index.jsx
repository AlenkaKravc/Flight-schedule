import React from 'react';
import {Route, Switch} from 'react-router';
import {MainPage} from "../views/main";
import {withRouter} from 'react-router';


const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={MainPage}/>
    </Switch>
);


export default withRouter(MainRouter);
