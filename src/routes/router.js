import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Mills from '../pages/mills';
import Harvests from '../pages/harvests';
import Farms from '../pages/farms';
import Fields from '../pages/fields';

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact component={Mills} />
            <Route path="/mills/:id/" component={Harvests} />
            <Route path="/harvests/:id/" component={Farms} />
            <Route path="/farms/:id/" component={Fields} />
        </Switch>
    );
}

export default Router;