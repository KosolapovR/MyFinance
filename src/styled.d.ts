import 'styled-components';
interface IPalette {
  main: string;
  contrastText: string;
}
declare module 'styled-components/native' {
  export interface DefaultTheme {
    sizes: {
      x2s: string;
      xs: string;
      s: string;
      md: string;
      lg: string;
    };
    colors: {
      primary: string;
      accent: string;
    };
    backgroundColors: {
      peach: string;
      brick: string;
      yellow: string;
      orange: string;
    };
    softPalette: {
      softpink: string;
      softbrick: string;
      softyellow: string;
    };
    grayPalette: {
      text1: string;
      text2: string;
      gray: string;
    };
  }
}
