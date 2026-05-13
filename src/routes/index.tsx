import { Route, Switch } from 'react-router-dom';

import AppShell from 'components/app-shell';

const Routes = (): JSX.Element => (
  <Switch>
    <Route path="/" component={AppShell} />
  </Switch>
);

export default Routes;
