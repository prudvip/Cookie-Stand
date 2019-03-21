'use strict';

function cookieData(storeName,minCust,maxCust,avgCookieSale){
this.storeName = storeName;
this.minCust = minCust;
this.maxCust = maxCust;
this.avgCookieSale = avgCookieSale;
}
cookieData.prototype.getCustCount=function(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var firstandpike = new cookieData('1st and Pike',23,65,6.3);
var seatac = new cookieData('SeaTac Airport',3,24,1.2);
var seattlecenter = new cookieData('Seattle Center',11,38,3.7);
var capitolhill = new cookieData('Capitol Hill',20,38,2.3);
var alki = new cookieData('Alki',2,16,4.6);

var stores = [firstandpike, seatac, seattlecenter, capitolhill, alki];

var StoreList = document.getElementById('store-sales');
var numCust;
var numCookies;
var storetime;
var storeCount = 0;

while (storeCount < stores.length) {

  var totCookies = 0;

  var liEl = document.createElement('li');

  liEl.textContent = 'Store Name : ' + stores[storeCount].storeName;

  StoreList.appendChild(liEl);

  for (var i = 6; i <= 21; i++) {
    if (i < 12) {
      storetime = i + ' AM'
    }
    else if (i === 12) {
      storetime = i + ' PM'
    }
    else if (i > 12) {
      storetime = (i - 12) + ' PM'
    }


    var liEl = document.createElement('li');

    numCust = stores[storeCount].getCustCount(stores[storeCount].minCust, stores[storeCount].maxCust);
 
    numCookies = Math.ceil(numCust * stores[storeCount].avgCookieSale);

    liEl.textContent = storetime + ": " + numCookies + " Cookies";


    StoreList.appendChild(liEl);

    totCookies = totCookies + numCookies;
  }

  liEl.textContent = "Total : " + totCookies + " Cookies";
  StoreList.appendChild(liEl);

  storeCount = storeCount + 1;
}



