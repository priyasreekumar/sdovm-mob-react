import {StyleSheet, Dimensions} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontSize from './../../shared/font/fontSize';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flex: 0.8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    color: '#828282',
    fontSize: fontSize.size12,
    letterSpacing: -0.24,
    textAlign: 'center',
  },
});
