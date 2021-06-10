import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

import HomeScreenAPIs from './../../../../api/home';

import deliveredImg from './../../../../assets/images/delivered-check.png';
import inTransitImg from './../../../../assets/images/transit.png';
import cancelledImg from './../../../../assets/images/cancelled.png';
import onHoldImg from './../../../../assets/images/onHold.png';
import orderSubmittedImg from './../../../../assets/images/orderSubmitted.png';

import styles from './index.style';
import fontSize from './../../shared/font/fontSize';

export default class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      listData: [],
      listDataCopy: [],
      dcName: '',
      showNoOrderImage: false,
      initialPlaceHolder: this.getDeliveryStatusText(this.props.route.params.orderStatus)
    };
  }
  componentWillUnmount() {
    // Remove the event listener
    this._unsubscribe();
  }
  componentDidMount() {
    try {
      const dcNumber = this.props.route.params.dcNumber;
      const dcName = this.props.route.params.dcName;
      const isDcOrderStatusSelected = this.props.route.params
        .isDcOrderStatusSelected;
      const orderStatus = this.props.route.params.orderStatus;

      this.setState({
        dcName: dcName,
      });

      this.setListData(dcNumber, isDcOrderStatusSelected, orderStatus);
    } catch (error) {
      console.log(error);
    }
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener("focus", () => {      
     
    if(this.dropdownRef.current.isOpen){  
      this.dropdownRef.current.close();
     }
    });
  }

  setListData = async (dcNumber, isDcOrderStatusSelected, orderStatus) => {
    try {
      let data = await HomeScreenAPIs.getDcDetails(dcNumber);

      if (data.dcOrderResponseList.length != 0) {
        let dataDC = [];
        for (let i = 0; i < data.dcOrderResponseList.length; i++) {
          for (
            let j = 0;
            j < data.dcOrderResponseList[i].dcOrderList.length;
            j++
          ) {
            dataDC.push(data.dcOrderResponseList[i].dcOrderList[j]);
          }
        }

        if (isDcOrderStatusSelected == true) {
          let dataToFilter = dataDC;
          let updatedData = dataToFilter.filter(e =>
            e.orderStatus.includes(orderStatus),
          );

          this.setState({
            listData: updatedData,
            listDataCopy: dataDC,
            showNoOrderImage: updatedData.length > 0 ? false : true,
          });
        } else {
          this.setState({
            listData: dataDC,
            listDataCopy: dataDC,
            showNoOrderImage: false,
          });
        }
      } else {
        this.setState({
          showNoOrderImage: true,
        });
      }
    } catch (error) {
      this.setState({
        showNoOrderImage: true,
      });
      console.log(error);
    }
  };

  navigateToPreviousScreen = () => {
    this.props.navigation.goBack();
  };

  statusImage(reqStatus) {
    if (reqStatus == 'delivered') {
      return deliveredImg;
    } else if (reqStatus == 'intransit') {
      return inTransitImg;
    } else if (reqStatus == 'On Hold') {
      return onHoldImg;
    } else if (reqStatus == 'Submitted') {
      return orderSubmittedImg;
    } else if (reqStatus == 'Cancelled') {
      return cancelledImg;
    }
  }

  statusText(reqStatus) {
    if (reqStatus == 'delivered') {
      return '#6FCF97';
    } else if (reqStatus == 'intransit') {
      return '#009FE0';
    } else if (reqStatus == 'On Hold') {
      return '#FF8E26';
    } else if (reqStatus == 'Submitted') {
      return '#00529F';
    } else if (reqStatus == 'Cancelled') {
      return '#FF4646';
    }
  }

  getDeliveryStatusText = reqStatus => {
    if (reqStatus == 'delivered') {
      return 'Delivered';
    } else if (reqStatus == 'intransit') {
      return 'In Transit';
    } else if (reqStatus == 'onhold') {
      return 'On Hold';
    } else if (reqStatus == 'submitted') {
      return 'Order Submitted';
    } else if (reqStatus == 'cancelled') {
      return 'Cancelled';
    }else{
      return "All";
    }
  };

  navigateToRouteInfo = item => {
    this.props.navigation.navigate('RouteInfo', {
      routeCd: item.item.routeCd,
      distributionCentre: item.item.distributionCentre,
      dcName: item.item.dcName,
    });
  };

  handleSelectionChange = selectedOption => {
    this.setState({
      optionSelected: selectedOption,
    });

    if (selectedOption == 'delivered') {
      this.filterDataBasedOnSelection('delivered');
    } else if (selectedOption == 'intransit') {
      this.filterDataBasedOnSelection('intransit');
    } else {
      if (this.state.listDataCopy.length != 0) {
        this.setState({
          listData: this.state.listDataCopy,
          showNoOrderImage: false,
        });
      } else {
        this.setState({
          listData: this.state.listDataCopy,
          showNoOrderImage: true,
        });
      }
    }
  };

  filterDataBasedOnSelection = optionSelected => {
    let idToRemove = optionSelected;

    let dataToSave = this.state.listDataCopy.filter(
      item => item.orderStatus == idToRemove,
    );

    if (dataToSave.length != 0) {
      this.setState({
        listData: dataToSave,
        showNoOrderImage: false,
      });
    } else {
      this.setState({
        showNoOrderImage: true,
      });
    }
  };

  navigateToHome = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View style={styles.fullScreen}>
        <View
          style={{
            height: hp('8%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => this.navigateToHome()}>
              <MaterialCommunityIcons
                name="arrow-left"
                color={'#00529F'}
                size={22}
              />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                left: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: '#00529F',
                  fontSize: fontSize.size12,
                  letterSpacing: -0.24,
                  textAlign: 'center',
                }}>
                {this.state.dcName}
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', right: wp('2%')}}>
            <DropDownPicker ref = {this.dropdownRef}
              items={[
                {
                  label: 'All',
                  value: 'all',
                  hidden: false,
                },
                {
                  label: 'Delivered',
                  value: 'delivered',
                },
                {
                  label: 'In Transit',
                  value: 'intransit',
                },
              ]}
              defaultValue={this.props.route.params.orderStatus}
              placeholder={this.state.initialPlaceHolder}
              placeholderStyle={{
                color: '#4F4F4F',
                fontFamily: 'Poppins-SemiBold',
                fontSize: fontSize.size10,
              }}
              containerStyle={{
                height: wp('9%'),
                width: wp('33%'),
              }}
              style={{
                backgroundColor: '#F4F8FA',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              labelStyle={{
                color: '#4F4F4F',
                fontFamily: 'Poppins-Regular',
                fontSize: fontSize.size11,
              }}
              dropDownMaxHeight={hp('20%')}
              activeItemStyle={{backgroundColor: '#DEF5FF'}}
              selectedLabelStyle={{
                fontSize: fontSize.size10,
                fontFamily: 'Poppins-SemiBold',
              }}
              arrowColor={'#00529F'}
              activeLabelStyle={{
                color: '#00529F',
                fontFamily: 'Poppins-SemiBold',
              }}
              dropDownStyle={{backgroundColor: '#F4F8FA'}}
              onChangeItem={item => this.handleSelectionChange(item.value)}
            />
          </View>
        </View>
        {this.state.showNoOrderImage && (
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('./../../../../assets/images/no-order.png')}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#00529F',
                  fontSize: fontSize.size14,
                  letterSpacing: -0.24,
                  textAlign: 'center',
                  paddingVertical: 15,
                }}>
                No Orders Available{' '}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#828282',
                  fontSize: fontSize.size9,
                  letterSpacing: -0.24,
                  textAlign: 'center',
                }}>
                There are no orders available for the DC that{'\n'} you have
                selected
              </Text>
              <View style={{paddingVertical: 10}}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderColor: '#00529F',
                    borderWidth: 1,
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: '#00529F',
                      fontSize: fontSize.size11,
                      letterSpacing: -0.24,
                      textAlign: 'center',
                      // paddingVertical: 15,
                    }}>
                    Track Again
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1}}></View>
          </View>
        )}
        {!this.state.showNoOrderImage && (
          <FlatList
            data={this.state.listData}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            renderItem={item => (
              <View
                style={{
                  borderWidth: 2,
                  borderColor: '#F4F8FA',
                  paddingTop: hp('2.5%'),
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        color: '#828282',
                        fontSize: fontSize.size14,
                        letterSpacing: -0.24,
                        textAlign: 'center',
                      }}>
                      Route {item.item.routeCd}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{width: wp('5.3%'), height: wp('5%')}}
                      source={this.statusImage(item.item.orderStatus)}
                    />
                    <View
                      style={{
                        justifyContent: 'center',
                        left: 5,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Medium',
                          color: this.statusText(item.item.orderStatus),
                          fontSize: fontSize.size14,
                          letterSpacing: -0.24,
                          textAlign: 'center',
                        }}>
                        {this.getDeliveryStatusText(item.item.orderStatus)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: hp('2%'),
                    // paddingHorizontal: 10,
                    justifyContent: 'space-around',
                  }}>
                  <View>
                    <Text style={styles.titleText}>Pallet Count</Text>
                    <Text style={styles.countText}>
                      {item.item.palletCount}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.titleText}>Total Units</Text>
                    <Text style={styles.countText}>{item.item.totalUnits}</Text>
                  </View>
                  <View>
                    <Text style={styles.titleText}>Stops</Text>
                    <Text style={styles.countText}>
                      {item.item.numberOfStops}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.titleText}>Est Delivery Date</Text>
                    <Text style={styles.countText}>
                      {item.item.estimatedDelivery}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => this.navigateToRouteInfo(item)}
                  style={{
                    backgroundColor: '#F4F8FA',
                    paddingVertical: hp('1%'),
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: '#00529F',
                      fontSize: fontSize.size12,
                      letterSpacing: -0.24,
                      textAlign: 'center',
                    }}>
                    View Route Info
                  </Text>
                </TouchableOpacity>
              </View>
            )}></FlatList>
        )}
      </View>
    );
  }
}
