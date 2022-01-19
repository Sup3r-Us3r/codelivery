import { createTheme } from '@material-ui/core/styles'
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const palette: PaletteOptions = {
  type: 'dark',
  primary: {
    main: '#FFCD00',
    contrastText: '#242526',
  },
  background: {
    default: '#242526',
  },
};

const theme = createTheme({
  palette,
});

export { theme };
