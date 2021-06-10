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
import asyncStorageFunction from './../../shared/lib/asyncStorage.lib';

import deliveredImg from './../../../../assets/images/delivered-check.png';
import inTransitImg from './../../../../assets/images/transit.png';
import cancelledImg from './../../../../assets/images/cancelled.png';
import onHoldImg from './../../../../assets/images/onHold.png';
import orderSubmittedImg from './../../../../assets/images/order-submitted.png';

import styles from './index.style';
import fontSize from './../../shared/font/fontSize';

export default class StoreListComponent extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      country: '',
      listData: [],
      listDataCopy: [],
      storeNumber: '',
      selectedStoreName: '',
      selectedOption: '',
      showNoOrderImage: false,
      defaultPlaceHolderText: this.getDeliveryStatusText(this.props.route.params.orderStatusSelected),
    };
  }
  componentWillUnmount() {
    // Remove the event listener
    this._unsubscribe();
  }
  componentDidMount() {   
    const storeNumber = this.props.route.params.storeNumber;
    const divisionNumber = this.props.route.params.divisionNumber;
    const selectedStoreName = this.props.route.params.selectedStoreName;
    const isSupplierSelected = this.props.route.params.isSupplierSelected;
    const isOrderStatusSelected = this.props.route.params.isOrderStatusSelected;
    const supplierSelected = this.props.route.params.supplierSelected;
    const orderStatusSelected = this.props.route.params.orderStatusSelected;

    this.setState({
      selectedStoreName: selectedStoreName,
      storeNumber: storeNumber,
    });

    this.setListData(
      storeNumber,
      divisionNumber,
      isSupplierSelected,
      isOrderStatusSelected,
      supplierSelected,
      orderStatusSelected,
    );
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener("focus", () => {      
     
    if(this.dropdownRef.current.isOpen){  
      this.dropdownRef.current.close();
     }
    });
  }

  setListData = async (
    storeNumber,
    divisionNumber,
    isSupplierSelected,
    isOrderStatusSelected,
    supplierSelected,
    orderStatusSelected,
  ) => {
    try {
      let data = await HomeScreenAPIs.ordersForStore(
        storeNumber,
        divisionNumber,
      );

      if (data.orderList.length != 0) {
        // filter logic goes here
        let dataToFilter = data.orderList;
        let filteredData;

        if (isSupplierSelected == true) {
          filteredData = dataToFilter.filter(e =>
            e.supplier.includes(supplierSelected),
          );

          if (isOrderStatusSelected == true) {
            let updatedData = filteredData.filter(e =>
              e.orderStatus.includes(orderStatusSelected),
            );

            let placeholder = '';

            if (orderStatusSelected == 'intransit') {
              placeholder = 'In Transit';
            } else if (orderStatusSelected == 'received') {
              placeholder = 'Order Submitted';
            } else if (orderStatusSelected == 'delivered') {
              placeholder = 'Delivered';
            } else if (orderStatusSelected == 'cancelled') {
              placeholder = 'Cancelled';
            } else if (orderStatusSelected == 'onhold') {
              placeholder = 'On Hold';
            }

            this.setState({
              listData: updatedData,
              showNoOrderImage: updatedData.length > 0 ? false : true,
              listDataCopy: data.orderList,
              defaultPlaceHolderText: placeholder,
            });
          } else {
            this.setState({
              listData: filteredData,
              showNoOrderImage: filteredData.length > 0 ? false : true,
              listDataCopy: data.orderList,
              defaultPlaceHolderText: 'All',
            });
          }
        }

        if (isSupplierSelected == false && isOrderStatusSelected == true) {
          let dataToFilter = data.orderList;

          let updatedData = dataToFilter.filter(e =>
            e.orderStatus.includes(orderStatusSelected),
          );

          let placeholder = '';

          if (orderStatusSelected == 'intransit') {
            placeholder = 'In Transit';
          } else if (orderStatusSelected == 'received') {
            placeholder = 'Order Submitted';
          } else if (orderStatusSelected == 'delivered') {
            placeholder = 'Delivered';
          } else if (orderStatusSelected == 'cancelled') {
            placeholder = 'Cancelled';
          } else if (orderStatusSelected == 'onhold') {
            placeholder = 'On Hold';
          }

          this.setState({
            listData: updatedData,
            showNoOrderImage: updatedData.length > 0 ? false : true,
            listDataCopy: data.orderList,
            defaultPlaceHolderText: placeholder,
          });
        }

        if (isOrderStatusSelected == false && isSupplierSelected == false) {
          this.setState({
            listData: data.orderList,
            listDataCopy: data.orderList,
            showNoOrderImage: false,
          });
        }
      } else {
        this.setState({
          listData: data.orderList,
          listDataCopy: data.orderList,
          showNoOrderImage: true,
          defaultPlaceHolderText: 'All',
        });
      }
    } catch (error) {
      this.setState({
        showNoOrderImage: true,
      });
    }
  };

  navigateToPreviousScreen = () => {
    this.props.navigation.goBack();
  };

  statusImage(reqStatus) {
    if (reqStatus == 'received') {
      return orderSubmittedImg;
    } else if (reqStatus == 'intransit') {
      return inTransitImg;
    } else if (reqStatus == 'On Hold') {
      return onHoldImg;
    } else if (reqStatus == 'Submitted') {
      return orderSubmittedImg;
    } else if (reqStatus == 'Cancelled') {
      return cancelledImg;
    } else if (reqStatus == 'delivered') {
      return deliveredImg;
    }
  }

  statusText(reqStatus) {
    if (reqStatus == 'received') {
      return '#00529F';
    } else if (reqStatus == 'In Transit') {
      return '#009FE0';
    } else if (reqStatus == 'On Hold') {
      return '#FF8E26';
    } else if (reqStatus == 'Submitted') {
      return '#00529F';
    } else if (reqStatus == 'Cancelled') {
      return '#FF4646';
    } else if (reqStatus == 'delivered') {
      return '#6FCF97';
    }
  }

  getDeliveryStatusText = reqStatus => {
    if (reqStatus == 'received') {
      return 'Order Submitted';
    } else if (reqStatus == 'intransit') {
      return 'In Transit';
    } else if (reqStatus == 'onhold') {
      return 'On Hold';
    } else if (reqStatus == 'submitted') {
      return 'Order Submitted';
    } else if (reqStatus == 'cancelled') {
      return 'Cancelled';
    } else if (reqStatus == 'delivered') {
      return 'Delivered';
    }else {
      return 'All'
    }
  };

  navigateToRouteInfo = async item => {
    await asyncStorageFunction.storeData('overHeadNum', item.orderHeaderNumber);
    await asyncStorageFunction.storeData('routeCd', item.routeCd);
    await asyncStorageFunction.storeData('dcName', item.dcName);
    await asyncStorageFunction.storeData('storeDivision', item.storeDivision);
    await asyncStorageFunction.storeData('orderDate', item.orderOnForPrint);
    await asyncStorageFunction.storeData('store', this.state.storeNumber);
    await asyncStorageFunction.storeData(
      'division',
      item.distributionCentre + ' - ' + this.state.selectedStoreName,
    );
    await asyncStorageFunction.storeData(
      'deliveryDate',
      item.estimatedDelivery,
    );
    await asyncStorageFunction.storeData(
      'supplier',
      item.supplier + ' - ' + item.supplierName,
    );

    if (item.showLocateTruck == false && item.excpFlag == 'N') {
      this.props.navigation.navigate('Details Only', {
        screen: 'Order Details',
      });
    } else if (item.showLocateTruck == false && item.excpFlag == 'Y') {
      this.props.navigation.navigate('Details And Exception', {
        screen: 'Order Details',
      });
    } else if (item.showLocateTruck == true && item.excpFlag == 'N') {
      this.props.navigation.navigate('Details And RouteInfo', {
        screen: 'Route Info',
      });
    } else if (item.showLocateTruck == true && item.excpFlag == 'Y') {
      this.props.navigation.navigate('Details');
    }
  };

  navigateToPreviousScreen = () => {
    this.props.navigation.goBack();
  };

  navigateToDetail = () => {
    this.props.navigation.navigate('Details');
  };

  handleSelectionChange = selectedOption => {
    this.setState({
      optionSelected: selectedOption,
    });

    if (selectedOption == 'delivered') {
      this.filterDataBasedOnSelection('delivered');
    } else if (selectedOption == 'intransit') {
      this.filterDataBasedOnSelection('intransit');
    } else if (selectedOption == 'received') {
      this.filterDataBasedOnSelection('received');
    } else if (selectedOption == 'cancelled') {
      this.filterDataBasedOnSelection('cancelled');
    } else if (selectedOption == 'onhold') {
      this.filterDataBasedOnSelection('onhold');
    } else if (selectedOption == 'all') {
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
          style={{...(Platform.OS !== 'android' && {
            zIndex: 100
        }),
            height: hp('8%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => this.navigateToPreviousScreen()}>
              <MaterialCommunityIcons
                name="arrow-left"
                color={'#00529F'}
                size={22}
              />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                left: wp('2%'),
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: '#00529F',
                  fontSize: fontSize.size11,
                  letterSpacing: -0.24,
                  textAlign: 'center',
                }}>
                {this.state.selectedStoreName +
                  ', Store: ' +
                  this.state.storeNumber}
              </Text>
            </View>
          </View>
          <View style={{
            justifyContent: 'center'}}>
            <DropDownPicker ref = {this.dropdownRef}
              items={[
                {
                  label: 'Order Submitted',
                  value: 'received',
                  hidden: false,
                },
                {
                  label: 'In Transit',
                  value: 'intransit',
                },
                {
                  label: 'Delivered',
                  value: 'delivered',
                },
                {
                  label: 'Cancelled',
                  value: 'cancelled',
                },
                {
                  label: 'On Hold',
                  value: 'onhold',
                },
                {
                  label: 'All',
                  value: 'all',
                },
              ]}
              defaultValue={this.props.route.params.orderStatusSelected}
              placeholder={this.state.defaultPlaceHolderText}
              placeholderStyle={{
                color: '#4F4F4F',
                fontFamily: 'Poppins-SemiBold',
                fontSize: fontSize.size10,
              }}
              containerStyle={{
                height: wp('9%'),
                width: wp('32%'),
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
              dropDownMaxHeight={hp('30%')}
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
                There are no orders available for the division{'\n'} and store
                that you have selected
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
                        // textAlign: 'center',
                        maxWidth: wp('40%'),
                      }}>
                      {item.item.supplier} - {item.item.supplierName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      // style={{width: wp('5.5%'), height: wp('5.5%')}}
                      source={this.statusImage(item.item.orderStatus)}
                    />
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        color: this.statusText(item.item.orderStatus),
                        fontSize: fontSize.size12,
                        letterSpacing: -0.24,
                        left: 5,
                      }}>
                      {this.getDeliveryStatusText(item.item.orderStatus)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: hp('3%'),
                    // paddingHorizontal: 10,
                    justifyContent: 'space-around',
                  }}>
                  <View>
                    <Text style={styles.titleText}>Qty Ordered</Text>
                    <Text style={styles.countText}>
                      {item.item.totalOrderQuantity == null
                        ? 'N/A'
                        : item.item.totalOrderQuantity}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.titleText}>Qty Shipped</Text>
                    <Text style={styles.countText}>
                      {item.item.totalShippedQuantity == null
                        ? 'N/A'
                        : item.item.totalShippedQuantity}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.titleText}>Route</Text>
                    <Text style={styles.countText}>
                      {item.item.routeCd == null ? 'N/A' : item.item.routeCd}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.titleText}>Pallet Count</Text>
                    <Text style={styles.countText}>
                      {item.item.palletCount}
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
                  onPress={() => this.navigateToRouteInfo(item.item)}
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
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>
            )}></FlatList>
        )}
      </View>
    );
  }
}
