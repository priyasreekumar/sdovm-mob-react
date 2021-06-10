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
    paddingHorizontal: 10,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: wp('2.5%'),
    letterSpacing: -0.24,
    textAlign: 'center',
  },
  countText: {
    fontFamily: 'Poppins-Medium',
    color: '#4F4F4F',
    fontSize: wp('3.2%'),
    letterSpacing: -0.24,
    textAlign: 'center',
    paddingVertical: hp('2%'),
  },
});
