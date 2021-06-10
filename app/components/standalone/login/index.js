import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';

import styles from './index.style';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
  }

  signIn = () => {
    this.props.signIn();
  };

  render() {
    return (
      <View style={styles.fullScreen}>
        <StatusBar barStyle='dark-content' backgroundColor='#E5E5E5' />
        <View style={{ flex: 1 }}></View>
        {!this.props.isLoading && (
          <View style={styles.loginContainer}>
            <View style={{ flex: 1 }}>
              <Image
                style={styles.logo}
                source={require('./../../../../assets/images/logo.png')}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: '#00529F',
                  fontSize: 28,
                  letterSpacing: -0.24,
                }}
              >
                Where’s My Order?
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this.signIn}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    color: '#009FE0',
                    fontSize: 18,
                    letterSpacing: -0.24,
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={{ flex: 1 }}></View>
      </View>
    );
  }
}
