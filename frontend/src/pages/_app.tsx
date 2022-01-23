import { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { theme } from '../../styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <Component {...pageProps} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp
