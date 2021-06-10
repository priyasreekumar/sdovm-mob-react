import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import moment from 'moment';

import HomeScreenAPIs from './../../../../api/home';
import asyncStorageFunction from './../../shared/lib/asyncStorage.lib';

import deliveredImg from './../../../../assets/images/delivered-check.png';
import inTransitImg from './../../../../assets/images/in-trans.png';
import completedImg from './../../../../assets/images/dot.png';

import styles from './index.style';
import fontSize from './../../shared/font/fontSize';

export default class StoreRouteInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeDetails: [],
      initialLongitude: null,
      initialLatitude: null,
      routeNum: null,
    };
  }

  componentDidMount = async () => {
    let routeCd = await asyncStorageFunction.retrieveData('routeCd');
    let dcName = await asyncStorageFunction.retrieveData('dcName');
    let storeDivision = await asyncStorageFunction.retrieveData(
      'storeDivision',
    );

    this.setState({
      routeNum: routeCd,
    });

    this.setRoute(routeCd, dcName, storeDivision);
  };

  closeCurrentSceen = () => {
    this.props.navigation.navigate('StoreList');
  };

  setRoute = async (routeCd, dcName, storeDivision) => {
    let data = await HomeScreenAPIs.storeRouteInfo(
      routeCd,
      dcName,
      storeDivision,
    );

    for (let i in data.orderRouteInfoList) {
      data.orderRouteInfoList[i]['isSelected'] = false;
    }

    this.setState({
      routeDetails: data.orderRouteInfoList,
      initialLatitude: parseFloat(data.orderRouteInfoList[1].latitude),
      initialLongitude: parseFloat(data.orderRouteInfoList[1].longitude),
    });
  };

  statusImage(reqStatus) {
    if (reqStatus == 'Delivered') {
      return deliveredImg;
    } else if (reqStatus == 'In Transit') {
      return inTransitImg;
    } else if (reqStatus == 'Completed') {
      return completedImg;
    }
  }

  statusText(reqStatus) {
    if (reqStatus == 'Delivered') {
      return '#6FCF97';
    } else if (reqStatus == 'In Transit') {
      return '#009FE0';
    } else if (reqStatus == 'Completed') {
      return '#696767';
    }
  }

  storeIdRound = status => {
    if (status == 'In Transit') {
      return '#c5ecff';
    } else if (status == 'Delivered') {
      return '#CCFDE1';
    } else if (status == 'Completed') {
      return '#CCFDE1';
    }
  };

  handleSelectedRoute = item => {
    for (let i in this.state.routeDetails) {
      if (this.state.routeDetails[i].stopID == item) {
        this.state.routeDetails[i]['isSelected'] = true;
      } else {
        this.state.routeDetails[i]['isSelected'] = false;
      }
    }

    this.setState({
      routeDetails: this.state.routeDetails,
    });
  };

  getPinColor = status => {
    if (status == true) {
      return 'blue';
    } else {
      return 'red';
    }
  };

  render() {
    return (
      <View style={styles.fullScreen}>
        <View style={{flex: 4, backgroundColor: 'white'}}>
          <MapView
            style={{flex: 1}}
            provider={PROVIDER_GOOGLE}
            zoomEnabled={true}
            showsUserLocation={true}
            initialRegion={{
              latitude: this.state.initialLatitude,
              longitude: this.state.initialLongitude,
              latitudeDelta: 1,
              longitudeDelta: 1,
            }}>
            {this.state.routeDetails.map((item, index) => {
              try {
                if (item.latitude != null) {
                  return (
                    <MapView.Marker
                      coordinate={{
                        latitude: parseFloat(item.latitude),
                        longitude: parseFloat(item.longitude),
                      }}
                      pinColor={this.getPinColor(item.isSelected)}
                      title={item.stopID}
                      key={`${index}-${
                        item.isSelected ? 'active' : 'inactive'
                      }`}
                    />
                  );
                } else {
                  return null;
                }
              } catch (error) {
                console.log(error);
              }
            })}
          </MapView>
        </View>
        <View style={{flex: 4}}>
          <View style={{
            ...styles.headerContainer,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: .1 },
            shadowOpacity: 0.3,
            shadowRadius: 2,  
            elevation: 2,
            zIndex:100
          }}>
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                width: wp('20%'),
              }}>
              <Text style={styles.headerText}>Stops</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                // alignSelf: 'center',
                width: wp('40%'),
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#828282',
                  fontSize: fontSize.size12,
                  letterSpacing: -0.24,
                  textAlign: 'center',
                }}>
                Store Info
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                width: wp('40%'),
              }}>
              <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <View style={{justifyContent: 'center', left: wp('10%')}}>
                  <Text style={styles.headerText}>Status 114</Text>
                </View>
                <View style={{top: -hp('3.5%'), right: -wp('11%'), alignSelf: 'flex-end'}}>
                  <TouchableOpacity
                    style={{
                      width: hp('5%'),
                      height: hp('5%'),
                      borderRadius: 40,
                      backgroundColor: '#00529F',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <MaterialCommunityIcons
                        name="autorenew"
                        color={'#FFFFFF'}
                        size={wp('6%')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{flex: 4, backgroundColor: '#FFFFFF', paddingTop: hp('1%')}}>
            <FlatList
              data={this.state.routeDetails}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              ItemSeparatorComponent={() => <View style={{height: 20}} />}
              renderItem={item => (
                <TouchableOpacity
                  onPress={() => this.handleSelectedRoute(item.item.stopID)}
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('20'),
                    }}>
                    <View
                      style={{
                        backgroundColor: this.storeIdRound(item.item.status),
                        //this.statusText(item.item.status),
                        width: wp('12'),
                        height: wp('12'),
                        borderRadius: wp('12'),
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Bold',
                          color: '#4F4F4F',
                          fontSize: fontSize.size10,
                          letterSpacing: -0.24,
                          textAlign: 'center',
                        }}>
                        {item.item.stopID}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      // alignItems: 'center',
                      width: wp('40%'),
                      paddingLeft: wp('4%'),
                      paddingRight: wp('2%'),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        color: '#4F4F4F',
                        fontSize: fontSize.size10,
                        letterSpacing: -0.24,
                        // textAlign: 'left',
                      }}>
                      {item.item.storeID}
                    </Text>
                    {item.item.address != null && (
                      <Text
                        style={{
                          fontFamily: 'Poppins-Medium',
                          color: '#828282',
                          fontSize: fontSize.size9,
                          letterSpacing: -0.24,
                          // textAlign: 'left',
                        }}>
                        {item.item.address}
                      </Text>
                    )}
                    {item.item.storePhone != null && (
                      <Text
                        style={{
                          fontFamily: 'Poppins-Medium',
                          color: '#828282',
                          fontSize: fontSize.size9,
                          letterSpacing: -0.24,
                          // textAlign: 'left',
                        }}>
                        {item.item.storePhone}
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      // justifyContent: 'center',
                      // alignItems: 'center',
                      width: wp('40%'),
                      // left: wp('2%'),
                      paddingHorizontal: wp('2%'),
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{alignSelf: 'center'}}>
                        <Image
                          style={{
                            width: wp('4%'),
                            height: wp('4%'),
                          }}
                          source={this.statusImage(item.item.status)}
                        />
                      </View>
                      <View
                        style={{
                          left: wp('2%'),
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Medium',
                            color: this.statusText(item.item.status),
                            fontSize: fontSize.size10,
                            letterSpacing: -0.24,
                            textAlign: 'left',
                          }}>
                          {item.item.status}
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        color: '#828282',
                        fontSize: fontSize.size9,
                        letterSpacing: -0.24,
                        textAlign: 'left',
                      }}>
                      Est Dep{' '}
                      {moment(item.item.estimatedDeparture).format('lll') ==
                      'Invalid date'
                        ? '-'
                        : moment(item.item.estimatedDeparture).format('lll')}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        color: '#828282',
                        fontSize: fontSize.size9,
                        letterSpacing: -0.24,
                        textAlign: 'left',
                      }}>
                      Act Dep{' '}
                      {moment(item.item.actualDepartureTime).format('lll') ==
                      'Invalid date'
                        ? '-'
                        : moment(item.item.actualDepartureTime).format('lll')}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}></FlatList>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp('5%'),
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: '#00529F',
                fontSize: wp('5%'),
                letterSpacing: -0.24,
              }}>
              Route {this.state.routeNum}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.closeCurrentSceen()}
            style={{justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: '#828282',
                fontSize: wp('5%'),
                letterSpacing: -0.24,
              }}>
              X Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
