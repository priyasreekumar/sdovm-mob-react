import {StyleSheet, Dimensions} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  head: {
    height: 50,
    backgroundColor: '#F4F8FA',
  },
  text: {
    textAlign: 'center',
    fontSize: RFPercentage('1.7'),
    fontFamily: 'Poppins-Regular',
    color: '#828282',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: hp('6%'),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeadText: {
    textAlign: 'center',
    fontSize: RFPercentage('1.8'),
    fontFamily: 'Poppins-SemiBold',
    color: '#292929',
  },
  descText: {
    textAlign: 'left',
    fontSize: RFPercentage('1.7'),
    fontFamily: 'Poppins-Regular',
    color: '#828282',
    left: wp('10%'),
  },
});
