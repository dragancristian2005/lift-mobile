import { Theme } from '@react-navigation/native';

const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#520080',
    background: '#f2f0f7',
    card: '#fff',
    text: '#000',
    border: '#444',
    notification: '#dddddd',
  },
  fonts: {
    regular: { fontFamily: 'Roboto-Regular', fontWeight: 'normal' },
    medium: { fontFamily: 'Roboto-Italic', fontWeight: '500' },
    bold: { fontFamily: 'Roboto-Bold', fontWeight: 'bold' },
    heavy: { fontFamily: 'Montserrat-Bold', fontWeight: '800' },
  },
};

export default LightTheme;
