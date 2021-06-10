import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

class headerLeftComponent extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{paddingHorizontal: 12, justifyContent: "center"}}>
          <Image
            source={require('./../../../../assets/images/logo_header.png')}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderLeftWidth: 2,
            borderLeftColor: '#E5E5E5',
          }}>
          <Text
            style={{
              left: 6.5,
              fontFamily: 'Poppins-Bold',
              color: '#00529F',
              fontSize: RFPercentage('2'),
              letterSpacing: -0.24,
            }}>
            Where’s My Order?
          </Text>
        </View>
      </View>
    );
  }
}
export default headerLeftComponent;
