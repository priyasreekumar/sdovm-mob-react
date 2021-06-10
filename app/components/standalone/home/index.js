import React, { Component } from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import HomeScreenAPIs from "./../../../../api/home";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import styles from "./index.style";
import fontSize from "./../../shared/font/fontSize";

const defaultSelectOption = { label: "Select", value: ""};

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.orderStatusController
    this.suppliersController
    this.storeController;
    this.divisionController
    this.dcController
    this.dcOrderStatusController

    this.state = {
      isStoreActive: true,
      storeList: [defaultSelectOption],
      divisionList: [defaultSelectOption],
      dcSelected: "",
      stores: [defaultSelectOption],
      suppliers: [defaultSelectOption],
      selectedSupplier: "",
      selectedDcName: "",
      selectedStoreDivison: "",
      selectedStoreName: "",
      orderStatus: [
        defaultSelectOption,
        {
          label: "In Transit",
          value: "intransit",
        },
        {
          label: "Order Submitted",
          value: "received",
        },
        {
          label: "Delivered",
          value: "delivered",
        },
        {
          label: "Cancelled",
          value: "cancelled",
        },
        {
          label: "On Hold",
          value: "onhold",
        },
      ],
      dcOrderStatus: [
        defaultSelectOption,
        {
          label: "In Transit",
          value: "intransit",
        },

        {
          label: "Delivered",
          value: "delivered",
        },
      ],
      orderStatusSelected: "",
      dcOrderStatusSelected: "",
      showDivisonError: false,
      showStoreError: false,
      showDcError: false,
      country: null,
      storePlaceHolder: "Select Store",
    };
  }

  componentDidMount() {
    this.getStoreList();
  }

  closeDropdown = () => {
    if(this.state.isStoreActive) {
      this.orderStatusController.close();
      this.suppliersController.close();
      this.storeController.close();
      this.divisionController.close();
    }else {
      this.dcController.close();
      this.dcOrderStatusController.close();
    }
  }

  openDropDown = (activeControllerName) => {
    [
    { name: "orderStatus", ctrl: this.orderStatusController },
    { name: "suppliers", ctrl: this.suppliersController },
    { name: "store", ctrl: this.storeController },
    { name: "division", ctrl: this.divisionController },
    { name: "dc", ctrl: this.dcController },
    { name: "dcOrderStatus", ctrl: this.dcOrderStatusController },
    ].filter((controller)=> controller.name !== activeControllerName && controller.ctrl && controller.ctrl.isOpen())
     .forEach((controller)=> controller.ctrl && controller.ctrl.close());
  }

   getStoreList = async () => {
    let storeList = await HomeScreenAPIs.getStoreDivision();

    let dcArray = [defaultSelectOption];
    let storeArray = [defaultSelectOption];

    for (let i in storeList.dcList) {
      dcArray.push({
        label: storeList.dcList[i].dcName,
        value: storeList.dcList[i].dcId,
      });
    }

    for (let i in storeList.divisionList) {
      storeArray.push({
        label: storeList.divisionList[i].divisionName,
        value: storeList.divisionList[i].divisionNumber,
      });
    }

    this.setState({
      storeList: storeArray,
      divisionList: dcArray,
    });
  };

  resetValidationErrors = () => {
    this.setState({
      showDcError: false,
      showDivisonError: false,
      showStoreError: false,
    });
  };

  resetFormValues = () => {
    this.setState({
      selectedStoreDivison: "",
      selectedStoreName: "",
      selectedStore: "",
      selectedSupplier:"",
      orderStatusSelected:"",
      dcSelected: "",
      selectedDcName: "",
      dcOrderStatusSelected: "",
      stores: [],
    });
  };

  switchTab = (status) => {
    this.setState({
      isStoreActive: status,
    });
  }

  activateStore = (status) => {
    this.resetValidationErrors();
    this.resetFormValues();
    this.switchTab(status);
  };

  getStoreAndSuppliers = async (divisionNumber) => {
    let storeList = [defaultSelectOption];
    let supplierList = [defaultSelectOption];
    if(divisionNumber) {
      let storeAndSupplier = await HomeScreenAPIs.getStoreAndSupplierOnDcNumber(
        divisionNumber
      );
      for (let i in storeAndSupplier.storeList) {
        storeList.push({
          label: storeAndSupplier.storeList[i],
          value: storeAndSupplier.storeList[i],
        });
      }
  
      for (let i in storeAndSupplier.supplierList) {
        supplierList.push({
          label:
            storeAndSupplier.supplierList[i].supNumber +
            " - " +
            storeAndSupplier.supplierList[i].supName,
          value: storeAndSupplier.supplierList[i].supNumber,
        });
      }
    }
    this.storeController.resetItems(storeList);
    this.storeController.reset();
    this.setState({
      stores: storeList,
      suppliers: supplierList,
    });
  };

  navigateToListScreen = () => {
    this.closeDropdown()
    if (this.state.isStoreActive) {
      if (!this.state.selectedStoreDivison) {
        this.setState({
          showDivisonError: true,
        });
      } else if (this.state.selectedStoreDivison.length != 0) {
        this.setState({
          showDivisonError: false,
        });
      }
      if (!this.state.selectedStore) {
        this.setState({
          showStoreError: true,
        });
      } else if (this.state.selectedStore.length != 0) {
        this.setState({
          showStoreError: false,
        });
      }
    } else {
      if (this.state.dcSelected.length == 0) {
        this.setState({
          showDcError: true,
        });
      } else if (this.state.dcSelected.length != 0) {
        this.setState({
          showDcError: false,
        });
      }
    }
    let navigationData;
    let screen;
    if (
      this.state.isStoreActive &&
      this.state.selectedStoreDivison &&
      this.state.selectedStore
    ) {
      navigationData = {
        divisionNumber: this.state.selectedStoreDivison,
        storeNumber: this.state.selectedStore,
        selectedStoreName: this.state.selectedStoreName,
        isSupplierSelected:
          this.state.selectedSupplier.length > 0,
        isOrderStatusSelected:
          this.state.orderStatusSelected.length > 0,
        supplierSelected: this.state.selectedSupplier,
        orderStatusSelected: this.state.orderStatusSelected,
      };
      screen = "StoreList";
    } else {
      if (!this.state.isStoreActive && this.state.dcSelected.length != 0) {
        navigationData = {
          dcNumber: this.state.dcSelected,
          dcName: this.state.selectedDcName,
          isDcOrderStatusSelected:
            this.state.dcOrderStatusSelected.length > 0,
          orderStatus: this.state.dcOrderStatusSelected,
        };
        screen = "List";
      }
    }
    if(navigationData && screen) {
      this.props.navigation.navigate(screen, navigationData);
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.closeDropdown}>
      <View style={styles.fullScreen}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text style={styles.headerText}>Track Order</Text>
        </View>
        <View
          style={{
            flex: 5.5,
            justifyContent: "space-between",
            backgroundColor: "#002058",
            borderRadius: 4,
          }}
        >
          <View style={{ flexDirection: "row", backgroundColor: "#002469" }}>
            <TouchableOpacity
              onPress={() => this.activateStore(true)}
              style={{
                padding: 11,
                backgroundColor: this.state.isStoreActive
                  ? "#002058"
                  : "#002469",
                borderBottomWidth: this.state.isStoreActive ? 2 : 0,
                borderBottomColor: "#009FE0",
              }}
            >
              <Text
                style={{
                  fontFamily: this.state.isStoreActive
                    ? "Poppins-Bold"
                    : "Poppins-Medium",
                  color: "#FFFFFF",
                  fontSize: fontSize.size12,
                  letterSpacing: -0.24,
                }}
              >
                Store
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.activateStore(false)}
              style={{
                padding: 11,
                backgroundColor: !this.state.isStoreActive
                  ? "#002058"
                  : "#002469",
                borderBottomWidth: !this.state.isStoreActive ? 2 : 0,
                borderBottomColor: "#009FE0",
              }}
            >
              <Text
                style={{
                  fontFamily: !this.state.isStoreActive
                    ? "Poppins-Bold"
                    : "Poppins-Medium",
                  color: "#FFFFFF",
                  fontSize: fontSize.size12,
                  letterSpacing: -0.24,
                }}
              >
                Distribution Center
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.isStoreActive && (
            <View
              style={{
                ...(Platform.OS !== "android" && {
                  zIndex: 100,
                }),
                flex: 1,
                justifyContent: "space-around",
                flexDirection: "column-reverse",
                paddingVertical: hp("3%"),
              }}
            >
              <View style={{ paddingHorizontal: 32 }}>
                <View>
                  <View>
                    <Text
                      style={{
                        fontFamily: "Poppins-SemiBold",
                        color: "#FFFFFF",
                        fontSize: fontSize.size12,
                        letterSpacing: -0.24,
                      }}
                    >
                      Order Status
                    </Text>
                  </View>
                  <View>
                    <DropDownPicker
                      items={this.state.orderStatus}
                      controller={(instance) => (this.orderStatusController = instance)}
                      onOpen={() => this.openDropDown("orderStatus")}
                      placeholder="Select Status"
                      placeholderStyle={{
                        color: "#FFFFFF",
                        fontFamily: "Poppins-Regular",
                        fontSize: fontSize.size11,
                      }}
                      containerStyle={{ height: hp("6%") }}
                      style={{ backgroundColor: "#003472" }}
                      itemStyle={{
                        justifyContent: "flex-start",
                        paddingLeft: 10,
                        paddingRight: 10
                      }}
                      labelStyle={{
                        color: "#FFFFFF",
                        fontFamily: "Poppins-Regular",
                        fontSize: fontSize.size11,
                      }}
                      dropDownMaxHeight={100}
                      activeItemStyle={{ 
                        backgroundColor: "#FFFFFF",
                        paddingLeft: 10,
                        paddingRight: 10
                      }}
                      selectedLabelStyle={{
                        fontSize: fontSize.size11,
                        fontFamily: "Poppins-SemiBold"
                      }}
                      arrowColor={"#FFFFFF"}
                      activeLabelStyle={{
                        color: "#00529F",
                        fontFamily: "Poppins-SemiBold",
                      }}
                      dropDownStyle={{ backgroundColor: "#003472" }}
                      onChangeItem={(item) =>
                        this.setState({
                          orderStatusSelected: item.value,
                        })
                      }
                    />
                  </View>
                </View>
              </View>
              <View style={{ paddingHorizontal: 32 }}>
                <View>
                  <View style={{}}>
                    <Text
                      style={{
                        fontFamily: "Poppins-SemiBold",
                        color: "#FFFFFF",
                        fontSize: fontSize.size12,
                        letterSpacing: -0.24,
                      }}
                    >
                      Supplier
                    </Text>
                  </View>
                  <DropDownPicker
                    items={this.state.suppliers}
                    controller={(instance) => (this.suppliersController = instance)}
                    onOpen={() => this.openDropDown("suppliers")}
                    placeholder="Select Supplier"
                    placeholderStyle={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins-Regular",
                      fontSize: fontSize.size11,
                    }}
                    dropDownMaxHeight={100}
                    containerStyle={{ height: hp("6%") }}
                    style={{ backgroundColor: "#003472" }}
                    itemStyle={{
                      justifyContent: "flex-start",
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                    labelStyle={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins-Regular",
                      fontSize: fontSize.size11,
                    }}
                    arrowColor={"#FFFFFF"}
                    activeItemStyle={{ 
                      backgroundColor: "#FFFFFF",
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                    selectedLabelStyle={{
                      fontSize: fontSize.size11,
                      fontFamily: "Poppins-SemiBold",
                    }}
                    activeLabelStyle={{
                      color: "#00529F",
                      fontFamily: "Poppins-SemiBold",
                    }}
                    dropDownStyle={{ backgroundColor: "#003472" }}
                    onChangeItem={(item) =>
                      this.setState({
                        selectedSupplier: item.value,
                      })
                    }
                  />
                </View>
              </View>
              <View style={{ paddingHorizontal: 32 }}>
                <View style={{ paddingVertical: hp("0.5%") }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontFamily: "Poppins-SemiBold",
                        color: "#FFFFFF",
                        fontSize: fontSize.size12,
                        letterSpacing: -0.24,
                      }}
                    >
                      Store
                    </Text>
                  </View>
                  <DropDownPicker
                    items={this.state.stores}
                    controller={(instance) => (this.storeController = instance)}
                    onOpen={() => this.openDropDown("store")}
                    placeholder="Select Store"
                    placeholderStyle={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins-Regular",
                      fontSize: fontSize.size11,
                    }}
                    containerStyle={{ height: hp("6%") }}
                    style={{
                      backgroundColor: "#003472",
                      borderColor:
                        this.state.showStoreError == true ? "#f34800" : "white",
                    }}
                    itemStyle={{
                      justifyContent: "flex-start",
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                    labelStyle={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins-Regular",
                      fontSize: fontSize.size11,
                    }}
                    dropDownMaxHeight={120}
                    activeItemStyle={{ 
                      backgroundColor: "#FFFFFF",
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                    selectedLabelStyle={{
                      fontSize: fontSize.size11,
                      fontFamily: "Poppins-SemiBold",
                    }}
                    arrowColor={"#FFFFFF"}
                    activeLabelStyle={{
                      color: "#00529F",
                      fontFamily: "Poppins-SemiBold",
                    }}
                    dropDownStyle={{ backgroundColor: "#003472" }}
                    defaultValue={this.state.selectedStore}
                    onChangeItem={(item) =>
                      this.setState({
                        selectedStore: item.value,
                        showStoreError: false,
                      })
                    }
                  />
                </View>
                {this.state.showStoreError && (
                  <Text
                    style={{
                      color: "#f34800",
                      fontSize: fontSize.size10,
                    }}
                  >
                    Please select a store
                  </Text>
                )}
              </View>
              <View style={{ paddingHorizontal: 32 }}>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontFamily: "Poppins-SemiBold",
                        color: "#FFFFFF",
                        fontSize: fontSize.size12,
                        letterSpacing: -0.24,
                      }}
                    >
                      Division
                    </Text>
                  </View>
                  <DropDownPicker
                    items={this.state.storeList}
                    controller={(instance) => (this.divisionController = instance)}
                    onOpen={() => this.openDropDown("division")}
                    showArrow={true}
                    placeholder="Select Division"
                    placeholderStyle={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins-Regular",
                      fontSize: fontSize.size11,
                    }}
                    dropDownMaxHeight={150}
                    containerStyle={{ height: hp("6%") }}
                    style={{
                      backgroundColor: "#003472",
                      borderColor:
                        this.state.showDivisonError == true
                          ? "#f34800"
                          : "white",
                    }}
                    itemStyle={{
                      justifyContent: "flex-start",
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                    labelStyle={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins-Regular",
                      fontSize: fontSize.size11,
                    }}
                    arrowColor={"#FFFFFF"}
                    activeItemStyle={{ 
                      backgroundColor: "#FFFFFF",
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                    selectedLabelStyle={{
                      fontSize: fontSize.size11,
                      fontFamily: "Poppins-SemiBold",
                    }}
                    activeLabelStyle={{
                      color: "#00529F",
                      fontFamily: "Poppins-SemiBold",
                    }}
                    dropDownStyle={{ backgroundColor: "#003472" }}
                    defaultValue={this.state.selectedStoreDivison}
                    onChangeItem={(item) => {
                      this.setState({
                        selectedStoreDivison: item.value,
                        selectedStoreName: item.label,
                        showDivisonError: false,
                      });
                      this.getStoreAndSuppliers(item.value);
                    }}
                  />
                </View>
                {this.state.showDivisonError && (
                  <Text
                    style={{
                      color: "#f34800",
                      fontSize: fontSize.size10,
                    }}
                  >
                    Please select a division
                  </Text>
                )}
              </View>
            </View>
          )}
          {!this.state.isStoreActive && (
            <View
              style={{
                ...(Platform.OS !== "android" && {
                  zIndex: 100,
                }),
                paddingHorizontal: 32,
              }}
            >
              <View>
                <View
                  style={{ paddingVertical: hp("0.7%"), flexDirection: "row" }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-SemiBold",
                      color: "#FFFFFF",
                      fontSize: fontSize.size12,
                      letterSpacing: -0.24,
                    }}
                  >
                    DC
                  </Text>
                  {/* <Text
                    style={{
                      color: '#f34800',
                      fontSize: fontSize.size12,
                      left: 1,
                    }}>
                    *
                  </Text> */}
                </View>
                <View>
                  <DropDownPicker
                    items={this.state.divisionList}
                    controller={(instance) => (this.dcController = instance)}
                    onOpen={() => this.openDropDown("dc")}
                    placeholder="Select DC"
                    placeholderStyle={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins-Regular",
                      fontSize: fontSize.size11,
                    }}
                    containerStyle={{ height: hp("6%") }}
                    style={{
                      backgroundColor: "#003472",
                      borderColor:
                        this.state.showDcError == true ? "#f34800" : "white",
                    }}
                    itemStyle={{
                      justifyContent: "flex-start",
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                    labelStyle={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins-Regular",
                      fontSize: fontSize.size11,
                    }}
                    dropDownMaxHeight={180}
                    activeItemStyle={{ 
                      backgroundColor: "#FFFFFF",
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                    selectedLabelStyle={{
                      fontSize: fontSize.size11,
                      fontFamily: "Poppins-SemiBold",
                    }}
                    arrowColor={"#FFFFFF"}
                    activeLabelStyle={{
                      color: "#00529F",
                      fontFamily: "Poppins-SemiBold",
                    }}
                    dropDownStyle={{ backgroundColor: "#003472" }}
                    value={this.state.dcSelected}
                    onChangeItem={(item) =>
                      this.setState({
                        dcSelected: item.value,
                        selectedDcName: item.label,
                        showDcError: false,
                      })
                    }
                  />
                </View>
              </View>
              {this.state.showDcError && (
                <Text
                  style={{
                    color: "#f34800",
                    fontSize: fontSize.size10,
                  }}
                >
                  Please select a DC
                </Text>
              )}
            </View>
          )}
          {!this.state.isStoreActive && (
            <View
              style={{
                ...(Platform.OS !== "android" && {
                  zIndex: 99,
                }),
                paddingHorizontal: 32,
              }}
            >
              <View>
                <View style={{ paddingVertical: hp("0.7%") }}>
                  <Text
                    style={{
                      fontFamily: "Poppins-SemiBold",
                      color: "#FFFFFF",
                      fontSize: fontSize.size12,
                      letterSpacing: -0.24,
                    }}
                  >
                    Order Status
                  </Text>
                </View>
                <View>
                  <DropDownPicker
                    items={this.state.dcOrderStatus}
                    controller={(instance) => (this.dcOrderStatusController = instance)}
                    onOpen={() => this.openDropDown("dcOrderStatus")}
                    placeholder="Select Status"
                    placeholderStyle={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins-Regular",
                      fontSize: fontSize.size11,
                    }}
                    containerStyle={{ height: hp("6%") }}
                    style={{ backgroundColor: "#003472" }}
                    itemStyle={{
                      justifyContent: "flex-start",
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                    labelStyle={{
                      color: "#FFFFFF",
                      fontFamily: "Poppins-Regular",
                      fontSize: fontSize.size11,
                    }}
                    dropDownMaxHeight={100}
                    activeItemStyle={{ 
                      backgroundColor: "#FFFFFF",
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                    selectedLabelStyle={{
                      fontSize: fontSize.size11,
                      fontFamily: "Poppins-SemiBold",
                    }}
                    arrowColor={"#FFFFFF"}
                    activeLabelStyle={{
                      color: "#00529F",
                      fontFamily: "Poppins-SemiBold",
                    }}
                    dropDownStyle={{ backgroundColor: "#003472" }}
                    value={this.state.dcOrderStatusSelected}
                    onChangeItem={(item) =>
                      this.setState({
                        dcOrderStatusSelected: item.value,
                      })
                    }
                  />
                </View>
              </View>
            </View>
          )}
          <View style={{ paddingHorizontal: 32, paddingVertical: hp("1%") }}>
            <TouchableOpacity
              onPress={() => this.navigateToListScreen()}
              style={{
                backgroundColor: "#FFFFFF",
                paddingVertical: hp("1%"),
                borderRadius: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  color: "#00529F",
                  fontSize: fontSize.size14,
                  letterSpacing: -0.24,
                }}
              >
                Track Order
              </Text>
            </TouchableOpacity>
          </View>
          <View></View>
          {!this.state.isStoreActive && (
            <View style={{ backgroundColor: "red" }}></View>
          )}
          {!this.state.isStoreActive && <View></View>}
          {!this.state.isStoreActive && <View></View>}
        </View>
        <View style={{ flex: 0.5 }}></View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default HomeComponent;
