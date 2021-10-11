import 'styled-components';
interface IPalette {
  main: string;
  contrastText: string;
}
declare module 'styled-components/native' {
  export interface DefaultTheme {
    borderRadius: {
      x2s: string;
      xs: string;
      s: string;
      md: string;
      lg: string;
    };
    spaces: {
      x2s: string;
      xs: string;
      s: string;
      md: string;
      lg: string;
    };
    colors: {
      primary: string;
      accent: string;
      gray: string;
    };
  }
}
