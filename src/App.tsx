import '@getgo/chameleon-web/components/registerAll';

import { ThemeProvider } from '@getgo/chameleon-web-react-wrapper';

import Routes from 'routes';

import './App.css';

const App = (): JSX.Element => (
  <ThemeProvider className="app__theme-provider" theme="light" skin="gotoadmin" rebranding2021>
    <Routes />
  </ThemeProvider>
);

export default App;
