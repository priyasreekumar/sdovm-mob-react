import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Table, Row, Rows} from 'react-native-table-component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

import HomeScreenAPIs from './../../../../api/home';
import asyncStorageFunction from './../../shared/lib/asyncStorage.lib';

import styles from './index.style';
import fontSize from './../../shared/font/fontSize';

const isDataExist = (item, defaultValue="") =>  ((item === null || item === undefined) ? defaultValue: item);

export default class StoreOrderDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      tableHead: [
        'Inv Nbr',
        'Ordered On',
        'CIC #',
        'DSD UPC',
        'BR Item #',
        'Item Description',
        'Qty Ordered',
        'Qty Shipped',
      ],
      widthArr: [
        wp('15%'),
        wp('25%'),
        wp('20%'),
        wp('30%'),
        wp('20%'),
        wp('75%'),
        wp('45%'),
        wp('25%'),
      ],
      tableData: [],
      qtyOrdered: 0,
      qtyShipped: 0,
      dataToPrint: [],
    };
  }

  componentDidMount = async () => {
    let orderHeaderNumber = await asyncStorageFunction.retrieveData(
      'overHeadNum',
    );

    this.getStoreOrderDetails(orderHeaderNumber);
  };

  getStoreOrderDetails = async orderHeaderNumber => {
    let data = await HomeScreenAPIs.storeOrderDetails(orderHeaderNumber);

    let tableDataArray = [];
    let tempArray = [];
    let qtyOrdered = 0;
    let qtyShipped = 0;

    for (let i in data.orderDetailsList) {
      tempArray = [];

      tempArray.push(
        data.orderDetailsList[i].invoiceNumber,
        data.orderDetailsList[i].orderOn,
        data.orderDetailsList[i].corpItemCode,
        data.orderDetailsList[i].upcItem,
        data.orderDetailsList[i].itemID,
        this.styleItemDesc(data.orderDetailsList[i].itemDesc),
        data.orderDetailsList[i].quantityOrdered,
        data.orderDetailsList[i].shippedQuantity,
      );
      tableDataArray.push(tempArray);
    }

    for (let i in data.orderDetailsList) {
      qtyOrdered =
        qtyOrdered + parseInt(data.orderDetailsList[i].quantityOrdered);
      qtyShipped =
        qtyShipped + parseInt(data.orderDetailsList[i].shippedQuantity);
    }

    this.setState({
      tableData: tableDataArray,
      qtyOrdered: qtyOrdered,
      qtyShipped: qtyShipped >= 0 ? qtyShipped : 0,
      dataToPrint: data.orderDetailsList,
    });
  };

  styleItemDesc = data => {
    return <Text style={styles.descText}>{data}</Text>;
  };

  handlePrint = () => {
    this.printPDF();
  };

  closeDetailsScreen = () => {
    this.props.navigation.navigate('StoreList');
  };

  printPDF = async () => {
    var tabledata = this.createtable();
    let division = await asyncStorageFunction.retrieveData('division');
    let orderDate = await asyncStorageFunction.retrieveData('orderDate');
    let store = await asyncStorageFunction.retrieveData('store');
    let deliveryDate = await asyncStorageFunction.retrieveData('deliveryDate');
    let supplier = await asyncStorageFunction.retrieveData('supplier');

    const results = await RNHTMLtoPDF.convert({
      html: `<html>
              <head>
                <style>
                  table, th, td {
                    border: 0.1px solid grey;
                    border-collapse: collapse;
                  }
                </style>
              </head>
                <h1 style="text-align: center;">Order Details</h1>
                <div> 
                <span>
                  <label>Division: <b>${division}</b></label>
                </span>
                <span style="padding-left: 20px">
                  <label>Order Date: <b>${orderDate}</b></label>
                </span>
              </div> 
              <div>
                <span>
                  <label>Store: <b>${store}</b></label>
                </span>
                <span style="padding-left: 100px">
                  <label>Delivery Date: <b>${deliveryDate}</b></label>
                </span>
              </div> 
              <div>
                <span>
                  <label>Supplier : <b>${supplier}</b></label> 
                </span>
              </div>
              <div>
                <ul class="list-unstyled"></ul>
              </div>
            <table >
              <thead>
                <th>Inv Nbr</th>
                <th>Ordered On</th>
                <th>CIC #</th>
                <th>DST UPC</th>
                <th>BR Item#</th>
                <th>Item Description</th>
                <th>Qty<br />Ordered</th>
                <th>Qty<br /> Shipped</th>
              </thead>
              <tbody >
              ${tabledata}
              </tbody>
            </table>
          </html>`,

      fileName: 'test',
      base64: true,
    });
    await RNPrint.print({filePath: results.filePath});
  };

  createtable() {
    let dataToPrint = this.state.dataToPrint;
    var table = '';

    for (let i in dataToPrint) {
      table = table.concat(`<tr>
        <td style="border:0.5px solid grey; border-collapse:collapse;">${isDataExist(dataToPrint[i].invoiceNumber)}</td>
        <td style="border:0.5px solid grey; border-collapse:collapse;">${isDataExist(dataToPrint[i].orderOn)}</td>
        <td style="border:0.5px solid grey; border-collapse:collapse;">${isDataExist(dataToPrint[i].corpItemCode)}</td>
        <td style="border:0.5px solid grey; border-collapse:collapse;">${isDataExist(dataToPrint[i].upcItem)}</td>
        <td style="border:0.5px solid grey; border-collapse:collapse;">${isDataExist(dataToPrint[i].itemID)}</td>
        <td style="border:0.5px solid grey; border-collapse:collapse;">${isDataExist(dataToPrint[i].itemDesc)}</td>
        <td style="border:0.5px solid grey; border-collapse:collapse;">${isDataExist(dataToPrint[i].quantityOrdered, 0)}</td>
        <td style="border:0.5px solid grey; border-collapse:collapse;">${isDataExist(dataToPrint[i].shippedQuantity, 0)}</td>
      </tr>`);
    }
    table = table.concat(`<tr>
    <td style="border:0.5px solid grey; border-collapse:collapse;" colspan= "6">Total</td>
    
    <td style="border:0.5px solid grey; border-collapse:collapse;">${this.state.qtyOrdered}</td>
    <td style="border:0.5px solid grey; border-collapse:collapse;">${this.state.qtyShipped}</td>
  </tr>`);
    return table;
  }

  render() {
    const state = this.state;

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 0.8,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp('5%'),
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Regular',
                color: '#828282',
                fontSize: RFPercentage('1.8'),
                letterSpacing: -0.24,
              }}>
              Supplier Name
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-SemiBold',
                color: '#009FE0',
                fontSize: RFPercentage('2'),
                letterSpacing: -0.24,
              }}>
              Corp Trky
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Regular',
                color: '#828282',
                fontSize: RFPercentage('1.8'),
                letterSpacing: -0.24,
              }}>
              Store
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-SemiBold',
                color: '#009FE0',
                fontSize: RFPercentage('2'),
                letterSpacing: -0.24,
              }}>
              0010
            </Text>
          </View>
          {/* <View
            style={{
              width: wp('40%'),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <MaterialCommunityIcons
                name="chevron-left-circle-outline"
                color={'#00529F'}
                size={RFPercentage('6')}
              />
            </View>
            <View style={{paddingHorizontal: 2}}>
              <MaterialCommunityIcons
                name="checkbox-blank-circle"
                color={'#00529F'}
                size={RFPercentage('1.5')}
              />
            </View>
            <View style={{paddingHorizontal: 2}}>
              <MaterialCommunityIcons
                name="checkbox-blank-circle"
                color={'#E5E5E5'}
                size={RFPercentage('1.5')}
              />
            </View>
            <View>
              <MaterialCommunityIcons
                name="chevron-right-circle-outline"
                color={'#E5E5E5'}
                size={RFPercentage('6')}
              />
            </View>
          </View> */}
        </View>
        <View style={{flex: 6}}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderColor: '#F4F8FA'}}>
                <Row
                  data={state.tableHead}
                  widthArr={state.widthArr}
                  style={styles.head}
                  textStyle={styles.tableHeadText}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderColor: '#E5E5E5'}}>
                  <Rows
                    widthArr={this.state.widthArr}
                    data={this.state.tableData}
                    style={[
                      styles.row,
                      {
                        backgroundColor: '#ffffff',
                        borderColor: '#E5E5E5',
                        borderWidth: 1,
                      },
                    ]}
                    textStyle={styles.text}
                  />
                  {/* {this.state.tableData.map((dataRow, index) => (
                    <Row
                      key={index}
                      data={dataRow}
                      widthArr={this.state.widthArr}
                      style={[
                        styles.row,
                        index % 2 && {
                          backgroundColor: '#ffffff',
                          borderColor: '#E5E5E5',
                          borderWidth: 2,
                        },
                      ]}
                      textStyle={styles.text}
                    />
                  ))} */}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 0.8,
            backgroundColor: 'white',
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.19,
            shadowRadius: 6.30,
            elevation: 6,
            zIndex:100,
          }}>
          <View
            style={{
              width: wp('40%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: RFPercentage('2.3'),
                fontFamily: 'Poppins-SemiBold',
                color: '#292929',
              }}>
              Total
            </Text>
          </View>
          <View
            style={{
              width: wp('30%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: RFPercentage('2'),
                fontFamily: 'Poppins-Regular',
                color: '#292929',
              }}>
              Qty Ordered
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: RFPercentage('2.3'),
                fontFamily: 'Poppins-SemiBold',
                color: '#009FE0',
              }}>
              {this.state.qtyOrdered}
            </Text>
          </View>
          <View
            style={{
              width: wp('30%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: RFPercentage('2'),
                fontFamily: 'Poppins-Regular',
                color: '#292929',
              }}>
              Qty Shipped
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: RFPercentage('2.3'),
                fontFamily: 'Poppins-SemiBold',
                color: '#009FE0',
              }}>
              {this.state.qtyShipped}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: "center",
            paddingTop: wp('1%')
          }}>
          <View
            style={{
              width: wp('40%'),
            }}></View>
          <TouchableOpacity
            onPress={() => this.handlePrint()}
            style={{
              width: wp('30%'),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View>
              <Image
                source={require('./../../../../assets/images/print.png')}
              />
            </View>
            <View style={{paddingHorizontal: 8}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: wp('4%'),
                  fontFamily: 'Poppins-SemiBold',
                  color: '#828282',
                }}>
                Print
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.closeDetailsScreen()}
            style={{
              width: wp('30%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: wp('4%'),
                fontFamily: 'Poppins-SemiBold',
                color: '#828282',
              }}>
              X Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
