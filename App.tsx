import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { StatusBar } from 'react-native';

import { Loading } from '@components/Loading';
import theme from '@theme/index';
import { ThemeProvider } from 'styled-components'
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor='transparent'
      />

      {fontsLoaded
        ? <Routes />
        : <Loading />
      }

    </ThemeProvider>
  );
}