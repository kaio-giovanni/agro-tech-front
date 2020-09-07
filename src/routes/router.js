import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Mills from '../pages/mills';

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact component={Mills} />
        </Switch>
    );
}

export default Router;