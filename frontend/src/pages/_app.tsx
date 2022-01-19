import { AppProps } from 'next/app'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

import { theme } from '../../styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
}

export default MyApp
