import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Mills from '../pages/mills';
import Harvests from '../pages/harvests';

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact component={Mills} />
            <Route path="/mills/:id/" component={Harvests} />
        </Switch>
    );
}

export default Router;