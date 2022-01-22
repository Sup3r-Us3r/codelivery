import { AppProps } from 'next/app'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import { theme } from '../../styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <Component {...pageProps} />
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

export default MyApp
