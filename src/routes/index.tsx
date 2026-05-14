import { Route, Switch } from 'react-router-dom';

import AboutPage from 'components/about-page';
import AppShell from 'components/app-shell';

const Routes = (): JSX.Element => (
  <Switch>
    <Route path="/about" component={() => <AboutPage onClose={() => window.history.back()} />} />
    <Route path="/" component={AppShell} />
  </Switch>
);

export default Routes;
