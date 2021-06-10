import {StyleSheet, Dimensions} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#002469',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    fontSize: 24,
    letterSpacing: -0.24,
  },
  dropDownConatiner: {
    flex: 5.5,
    justifyContent: 'space-between',
    backgroundColor: '#002058',
    borderRadius: 4,
  },
});
