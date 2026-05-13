import '@getgo/chameleon-web/components/registerAll';

import { createContext, useContext } from 'react';
import { ThemeProvider } from '@getgo/chameleon-web-react-wrapper';

import { useTheme } from 'hooks';
import type { Theme } from 'hooks';
import Routes from 'routes';

import './App.css';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

const App = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider className="app__theme-provider" theme={theme} skin="gotoadmin" rebranding2021>
        <Routes />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
