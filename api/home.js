const HomeScreenAPIs = {
  getStoreDivision: async function() {
    let dataToSend = require('./../json/divisions.json');

    return dataToSend;
    // return {
    //   divisionList: [
    //     {
    //       divisionNumber: '05',
    //       divisionName: 'DENVER',
    //     },
    //     {
    //       divisionNumber: '35',
    //       divisionName: 'EASTERN',
    //     },
    //     {
    //       divisionNumber: '24',
    //       divisionName: 'HAGGEN',
    //     },
    //   ],
    //   dcList: [
    //     {
    //       dcId: '30',
    //       dcName: 'Anchorage',
    //     },
    //     {
    //       dcId: '33',
    //       dcName: 'Auburn',
    //     },
    //     {
    //       dcId: '66',
    //       dcName: 'Boise',
    //     },
    //   ],
    // };
  },
  getStoreAndSupplierOnDcNumber: async function(divisionNum) {
    let dataToSend;

    if (divisionNum == '05') {
      dataToSend = require('./../json/dl05.json');
    } else if (divisionNum == '24') {
      dataToSend = require('./../json/dl24.json');
    } else if (divisionNum == '35') {
      dataToSend = require('./../json/dl35.json');
    }

    return dataToSend;
  },
  ordersForStore: async function(storeNum, divisionNum) {
    let dataToSend;

    if (storeNum == '0008' && divisionNum == '05') {
      dataToSend = require('./../json/dl-0008-05.json');
    } else if (storeNum == '0010' && divisionNum == '05') {
      dataToSend = require('./../json/dl-0010-05.json');
    } else if (storeNum == '3427' && divisionNum == '24') {
      dataToSend = require('./../json/dl-3427-24.json');
    } else if (storeNum == '3430' && divisionNum == '24') {
      dataToSend = require('./../json/dl-3430-24.json');
    } else if (storeNum == '9420' && divisionNum == '35') {
      dataToSend = require('./../json/dl-9420-35.json');
    } else if (storeNum == '9835' && divisionNum == '35') {
      dataToSend = require('./../json/dl-9835-35.json');
    }

    return dataToSend;
  },
  getDcDetails: async function(dcNumber) {
    let dataToSend;

    if (dcNumber == '30') {
      dataToSend = require('./../json/dc-30.json');
    } else if (dcNumber == '33') {
      dataToSend = require('./../json/dc-33.json');
    } else if (dcNumber == '66') {
      dataToSend = require('./../json/dc-66.json');
    }

    return dataToSend;
  },
  getDcRouteInfo: async function(route, dcNumber, dcName) {
    let dataToSend;

    if (route == '7001' && dcNumber == '66' && dcName == 'Boise') {
      dataToSend = require('./../json/dc-7001-66-Boise.json');
    } else if (route == '7003' && dcNumber == '66' && dcName == 'Boise') {
      dataToSend = require('./../json/dc-7003-66-Boise.json');
    } else if (route == '1001' && dcNumber == '33' && dcName == 'Auburn') {
      dataToSend = require('./../json/dc-1001-33-Auburn.json');
    } else if (route == '1023' && dcNumber == '33' && dcName == 'Auburn') {
      dataToSend = require('./../json/dc-1009-33-Auburn.json');
    }

    return dataToSend;
  },
  storeOrderDetails: async function(orderHeaderNum) {
    let dataToSend;

    if (orderHeaderNum == '52409971') {
      dataToSend = require('./../json/store-odr-52409971.json');
    } else if (orderHeaderNum == '52410176') {
      dataToSend = require('./../json/store-odr-52410176.json');
    } else if (orderHeaderNum == '52409969') {
      dataToSend = require('./../json/store-odr-52409969.json');
    } else if (orderHeaderNum == '52410116') {
      dataToSend = require('./../json/store-odr-52410116.json');
    } else if (orderHeaderNum == '52412219') {
      dataToSend = require('./../json/store-odr-52412219.json');
    } else if (orderHeaderNum == '52412238') {
      dataToSend = require('./../json/store-odr-52412238.json');
    } else if (orderHeaderNum == '52412215') {
      dataToSend = require('./../json/store-odr-52412215.json');
    } else if (orderHeaderNum == '52344571') {
      dataToSend = require('./../json/store-odr-52344571.json');
    } else if (orderHeaderNum == '52359735') {
      dataToSend = require('./../json/store-odr-52359735.json');
    } else if (orderHeaderNum == '52344609') {
      dataToSend = require('./../json/store-odr-52344609.json');
    } else if (orderHeaderNum == '52344565') {
      dataToSend = require('./../json/store-odr-52344565.json');
    } else if (orderHeaderNum == '52340424') {
      dataToSend = require('./../json/store-odr-52340424.json');
    }

    return dataToSend;
  },
  storeOrderException: async function(orderHeaderNum) {
    let dataToSend;

    if (orderHeaderNum == '52409971') {
      dataToSend = require('./../json/store-ordr-excp-52409971.json');
    } else if (orderHeaderNum == '52412238') {
      dataToSend = require('./../json/store-ordr-excp-52412238.json');
    } else if (orderHeaderNum == '52412249') {
      dataToSend = require('./../json/store-ordr-excp-52412249.json');
    } else if (orderHeaderNum == '52344571') {
      dataToSend = require('./../json/store-ordr-excp-52344571.json');
    } else if (orderHeaderNum == '52359735') {
      dataToSend = require('./../json/store-ordr-excp-52359735.json');
    } else if (orderHeaderNum == '52344609') {
      dataToSend = require('./../json/store-ordr-excp-52344609.json');
    } else if (orderHeaderNum == '52344565') {
      dataToSend = require('./../json/store-ordr-excp-52344565.json');
    } else if (orderHeaderNum == '52340424') {
      dataToSend = require('./../json/store-ordr-excp-52340424.json');
    }

    return dataToSend;
  },
  storeRouteInfo: async function(routeCd, dcName, distCentre) {
    let dataToSend;

    if (routeCd == '7316' && dcName == 'Denver' && distCentre == '05') {
      dataToSend = require('./../json/store-route-7316-05-Denver.json');
    } else if (routeCd == '7224' && dcName == 'Denver' && distCentre == '05') {
      dataToSend = require('./../json/store-route-7224-05-Denver.json');
    } else if (routeCd == '1314' && dcName == 'Denver' && distCentre == '05') {
      dataToSend = require('./../json/store-route-1314-05-Denver.json');
    } else if (routeCd == '7727' && dcName == 'Denver' && distCentre == '05') {
      dataToSend = require('./../json/store-route-7727-05-Denver.json');
    } else if (routeCd == '7730' && dcName == 'Denver' && distCentre == '05') {
      dataToSend = require('./../json/store-route-7730-05-Denver.json');
    } else if (routeCd == '7429' && dcName == 'Auburn' && distCentre == '33') {
      dataToSend = require('./../json/store-route-7429-33-Auburn.json');
    } else if (routeCd == '1010' && dcName == 'Auburn' && distCentre == '33') {
      dataToSend = require('./../json/store-route-1010-33-Auburn.json');
    } else if (routeCd == '1010' && dcName == 'Auburn' && distCentre == '24') {
      dataToSend = require('./../json/store-route-1010-24-Auburn.json');
    }

    return dataToSend;
  },
};

export default HomeScreenAPIs;
