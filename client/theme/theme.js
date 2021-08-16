import { extendTheme } from 'native-base';

export const theme = extendTheme({
    colors: {
      blueGrayReverse: {
        700: '#cbd5e1',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  });
