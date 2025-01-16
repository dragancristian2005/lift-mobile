import { Image, StyleSheet } from 'react-native';

export const Logo = () => (
  <Image source={require('../../photos/Logo.png')} style={styles.logo} />
);

const styles = StyleSheet.create({
  logo: {
    marginTop: 80,
    marginBottom: 30,
    height: 110,
    width: 220,
  },
});
