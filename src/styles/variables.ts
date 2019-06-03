const variables = {
  fontFamily: {
    bigTitle: 'SF UI Display', // TODO:import other web font instead of SF
    body: 'Open Sans',
    title: 'Open Sans'
  },
  fontSize: {
    body: '15px', // TODO: check all files and change names in styled components
    header: '20px',
    small: '10px',
    title: '20px'
  }
};

interface IColorPalette {
  chips: {
    background: string;
    text: string;
  };
  dropdown: {
    background: string;
  };
  primaryBackground: string;
  primaryBody: string;
  secondarySelection: string;
  secondaryBody: string;
  secondaryHover: string;
}

interface IFonts {
  bigTitle: string;
  title: string;
  body: string;
}

interface IFontSizes {
  title: string;
  body: string;
  small: string;
}

export interface ITheme {
  colors: IColorPalette;
  fontFamily: IFonts;
  fontSize: IFontSizes;
}

export default variables;
