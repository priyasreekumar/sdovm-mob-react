import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Popover from 'react-native-popover-view';

export default class HeaderHomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateToHome = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    const { userName, signOut } = this.props;

    return (
      <View style={{ paddingRight: 19, flexDirection: 'row' }}>
        {/* <TouchableOpacity
          onPress={() => this.navigateToHome()}
          style={{justifyContent: 'center', right: wp('5%')}}>
          <Image source={require('./../../../../assets/images/home.png')} />
        </TouchableOpacity> */}
        <View
          style={{
            width: 26,
            height: 26,
            backgroundColor: '#00529F',
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Popover
            from={
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#FFFFFF',
                    fontSize: hp('1.4%'),
                    letterSpacing: -0.24,
                    textAlign: 'center',
                  }}
                >
                  {userName}
                </Text>
              </TouchableOpacity>
            }
          >
            <Text
              onPress={signOut}
              style={{
                fontFamily: 'Poppins-Regular',
                color: 'black',
                fontSize: RFPercentage('1.5'),
                letterSpacing: -0.24,
                textAlign: 'center',
                padding: RFPercentage('1.2'),
              }}
            >
              Sign out
            </Text>
          </Popover>
        </View>
      </View>
    );
  }
}
