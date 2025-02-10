import { Theme } from '@react-navigation/native';

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#4a3ba9',
    background: '#222',
    card: '#333',
    text: '#cccccc',
    border: '#777',
    notification: '#cccccc',
  },
  fonts: {
    regular: { fontFamily: 'Roboto-Regular', fontWeight: 'normal' },
    medium: { fontFamily: 'Roboto-Italic', fontWeight: '500' },
    bold: { fontFamily: 'Roboto-Bold', fontWeight: 'bold' },
    heavy: { fontFamily: 'Montserrat-Bold', fontWeight: '800' },
  },
};

export default DarkTheme;
