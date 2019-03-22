'use strict';


var workingHours =[];

for (var i = 6; i <= 19; i++){
  var storetime = (i < 12) ? i + ' am' : (i==12) ? i + ' pm' :  (i-12) + ' pm'; 
  this.workingHours.push(storetime); 
}

var salmonCookieStoreLocations = []; 
var salmonCookieTotalCount = 0; 

function CookieLocationDetails(location, minimumCustomers, maximumCustomers, averageCookiesPerCustomer) {
    this.location = location;
    this.minimumCustomers = minimumCustomers;
    this.maximumCustomers = maximumCustomers;
    this.averageCookiesPerCustomer = averageCookiesPerCustomer;
    this.averageCustomerHourlyArray = [];
    this.cookiesHourlyArray = [];
    this.totalCookiesLocation = 0;

    
    this.generateRandomCustomersHourly = function (minimumCustomers, maximumCustomers) {
        for (var i = 0; i < workingHours.length; i++) {
            var randomCustomer = Math.floor(Math.random() * (maximumCustomers - minimumCustomers)) + minimumCustomers;
            this.averageCustomerHourlyArray.push(randomCustomer);
        }
    };


    this.generateCookiesHourly = function () {
        this.generateRandomCustomersHourly(minimumCustomers, maximumCustomers);
        for (var i = 0; i < workingHours.length; i++) {
            var CookiesPerHour = Math.ceil(this.averageCustomerHourlyArray[i] * this.averageCookiesPerCustomer);
            this.cookiesHourlyArray.push(CookiesPerHour);
            this.totalCookiesLocation += CookiesPerHour;
            console.log(workingHours[i] + ' ' + this.cookiesHourlyArray[i]);
        }
        console.log(this.totalCookiesLocation);
    };

   
    salmonCookieStoreLocations.push(this);

   
    this.render = function () {
        this.generateCookiesHourly();
        var createTableForEachLocation = document.getElementById('table');

       
        var newRowValue = document.createElement('tr');
        var locationName = this.location;
        newRowValue.id = locationName;
        newRowValue.innerText = locationName;
        createTableForEachLocation.appendChild(newRowValue);
       

        for (var j = 0; j <= this.cookiesHourlyArray.length; j++) {
            if (j < this.cookiesHourlyArray.length) {
                var nameOfLocation = document.getElementById(locationName);
                var newColumnValue = document.createElement('td');
                var columnValue = this.cookiesHourlyArray[j];
                newColumnValue.innerText = columnValue;
                nameOfLocation.appendChild(newColumnValue);
            }
            else {
                var nameOfLocation = document.getElementById(locationName);
                var totalCountDataColumn = document.createElement('td');
                var totString = this.totalCookiesLocation;
                totalCountDataColumn.innerText = totString;
                nameOfLocation.appendChild(totalCountDataColumn);
            }
        }
    };
}; 
var pikePlaceStore = new CookieLocationDetails('1st and Pike', 23, 65, 6.3);
var seatacAirportStore = new CookieLocationDetails('Seatac Airport', 3, 24, 1.2);
var seattleCenterStore = new CookieLocationDetails('Seattle Center', 11, 38, 3.7);
var capitolHillStore = new CookieLocationDetails('Capitol Hill', 20, 38, 2.3);
var alkiStore = new CookieLocationDetails('Alki', 2, 16, 4.6);


var createSalesHeader = function () {
  
    var mainLocationDetailsTable = document.getElementById('salmonCookieSalesTable');
    var table = document.createElement('table');
    mainLocationDetailsTable.appendChild(table);
    table.id = 'table';
    

    var insideMainLocationDetailsTable = document.getElementById('table');
    var newRow = document.createElement('tr');
    newRow.id = 'heading';
    insideMainLocationDetailsTable.appendChild(newRow);

    var headerLocation = document.getElementById('heading');
    var newTh = document.createElement('th');
    headerLocation.appendChild(newTh);

   
    for (var i = 0; i < workingHours.length; i++) {
        if (i < workingHours.length) {
            var newTh = document.createElement('th');
            var newString = workingHours[i];
            newTh.innerText = newString;
            headerLocation.appendChild(newTh);
        }
    }

    
    var headerTotal = document.createElement('th');
    var salesTotalString = 'Daily Location Total';
    headerTotal.innerText = salesTotalString;
    headerLocation.appendChild(headerTotal);
};


var calculateHourlySalesTotal = function () {
    for (var i = 0; i < workingHours.length; i++) {
        
        var hourlyTotalSalesPerLocation = 0;
        for (var j = 0; j < salmonCookieStoreLocations.length; j++) {
            hourlyTotalSalesPerLocation += salmonCookieStoreLocations[j].cookiesHourlyArray[i];
            console.log("Hourly Total" + hourlyTotalSalesPerLocation);
        }
        var footerColumnTotalValue = document.getElementById('footer');
        var columnValue = document.createElement('td');
        columnValue.innerText = hourlyTotalSalesPerLocation;
        footerColumnTotalValue.appendChild(columnValue);
        salmonCookieTotalCount += hourlyTotalSalesPerLocation;
      
        console.log(salmonCookieTotalCount);
    }
};


var createSalesFooter = function () {

    var insideTable = document.getElementById('table');
    var rowValue = document.createElement('tr');
    rowValue.id = 'footer';
    insideTable.appendChild(rowValue);

    var footerLocation = document.getElementById('footer');
    var columnValue = document.createElement('td');
    columnValue.innerText = 'Totals';
    footerLocation.appendChild(columnValue);

   
    calculateHourlySalesTotal();

    var footerColumnTotalValue = document.createElement('td');
    footerColumnTotalValue.innerText = salmonCookieTotalCount;
    footerLocation.appendChild(footerColumnTotalValue);
};


createSalesHeader();

for (var i = 0; i < salmonCookieStoreLocations.length; i++) {
    salmonCookieStoreLocations[i].render();
}


createSalesFooter();
