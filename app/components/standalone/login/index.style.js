import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {},
});
