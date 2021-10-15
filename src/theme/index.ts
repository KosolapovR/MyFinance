import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  sizes: {
    x2s: '4px',
    xs: '8px',
    s: '12px',
    md: '16px',
    lg: '20px',
  },
  colors: {
    ...DefaultTheme.colors,
    primary: '#60034C',
    accent: '#F98B83',
  },
  backgroundColors: {
    peach: '#FED5CB',
    brick: '#F8DACE',
    yellow: '#FFCEA0',
    orange: '#FFC2A6',
  },
  softPalette: {
    softpink: '#FEE8E6',
    softbrick: '#FBECE6',
    softyellow: '#FFF3E7',
  },
  grayPalette: {
    text1: '#263154',
    text2: '#3E4968',
    gray: '#F2F2F2',
  },
};
