'use strict';


var workingHours =[];

for (var i = 6; i <= 19; i++){
  var storetime = (i < 12) ? i + ' am' : (i==12) ? i + ' pm' :  (i-12) + ' pm'; 
  this.workingHours.push(storetime); 
}

var salmonCookieStoreLocations = []; 
var salmonCookieTotalCount = 0; 
var locationDetailsTable = document.getElementById('location_details_table');


var locationDetailsInputForm = document.getElementById(
  'location_details_input_form'
);
var errorStatus = 'N';


function SalmonCookieLocationDetails(
  location,
  minimumCustomers,
  maximumCustomers,
  averageCookiesPerCustomer
) {
  this.location = location;
  this.minimumCustomers = minimumCustomers;
  this.maximumCustomers = maximumCustomers;
  this.averageCookiesPerCustomer = averageCookiesPerCustomer;
  this.averageCustomerHourlyArray = [];
  this.cookiesHourlyArray = [];
  this.totalCookiesLocation = 0;

  console.log(
    'Inside Constructor Function' +
      location +
      minimumCustomers +
      maximumCustomers +
      averageCookiesPerCustomer
  );

  
  this.generateRandomCustomersHourly = function(
    minimumCustomers,
    maximumCustomers
  ) {
    for (var i = 0; i < workingHours.length; i++) {
      var randomCustomer =
        Math.floor(Math.random() * (maximumCustomers - minimumCustomers)) +
        minimumCustomers;
      this.averageCustomerHourlyArray.push(randomCustomer);
      console.log(randomCustomer);
    }
  };


  this.generateCookiesHourly = function() {
    this.generateRandomCustomersHourly(minimumCustomers, maximumCustomers);
    for (var i = 0; i < workingHours.length; i++) {
      var CookiesPerHour = Math.ceil(
        this.averageCustomerHourlyArray[i] * this.averageCookiesPerCustomer
      );
      this.cookiesHourlyArray.push(CookiesPerHour);
      this.totalCookiesLocation += CookiesPerHour;
      console.log(workingHours[i] + ' ' + this.cookiesHourlyArray[i]);
    }
    console.log(this.totalCookiesLocation);
  };

 
  salmonCookieStoreLocations.push(this);
  console.log('Length : ' + salmonCookieStoreLocations.length);


  this.render = function() {
    this.generateCookiesHourly();
    var createTableForEachLocation = document.getElementById('salestable');

  
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
      } else {
        nameOfLocation = document.getElementById(locationName);
        var totalCountDataColumn = document.createElement('td');
        var totString = this.totalCookiesLocation;
        totalCountDataColumn.innerText = totString;
        nameOfLocation.appendChild(totalCountDataColumn);
      }
    }
  };
} 


function salmonCookieLocationInputFormData(event) {
  event.preventDefault();

  var locationNameForm = event.target.locationName.value;
  var minimumCustomersForm = event.target.minimumCustomers.value;
  var maximumCustomersForm = event.target.maximumCustomers.value;
  var averageCookieSalesForm = event.target.averageCookiesPerCustomer.value;


  var newStore = new SalmonCookieLocationDetails(
    locationNameForm,
    minimumCustomersForm,
    maximumCustomersForm,
    averageCookieSalesForm
  );


  validateDuplicateLocation(salmonCookieStoreLocations);
  validateSpecialCharacters(salmonCookieStoreLocations);
  validateMaxMin(salmonCookieStoreLocations);
  

  if (errorStatus === 'N') {
    newStore.render();
    createTable();
    createSalesFooter();
    locationDetailsInputForm.reset();
  }
}


function createTable() {
  var row;
  for (var i = 0; i < salmonCookieStoreLocations.length; i++) {
    row = document.createElement('tr');
    row.innerHTML =
      '<td>' +
      salmonCookieStoreLocations[i].location +
      '</td>' +
      '<td>' +
      salmonCookieStoreLocations[i].minimumCustomers +
      '</td>' +
      '<td>' +
      salmonCookieStoreLocations[i].maximumCustomers +
      '</td>' +
      '<td>' +
      salmonCookieStoreLocations[i].averageCookiesPerCustomer +
      '</td>';
    console.log('Create Table' + salmonCookieStoreLocations[i].location);
  }
  
}


function validateDuplicateLocation(salmonCookieStoreLocations) {
  errorStatus = 'N'; 
  var locationArrayLength = salmonCookieStoreLocations.length;
  if (locationArrayLength > 1) {
    try {
      for (var i = 0; i < locationArrayLength - 1; i++) {
        if (
          salmonCookieStoreLocations[locationArrayLength - 1].location ===
          salmonCookieStoreLocations[i].location
        ) {
          errorStatus = 'Y';
          salmonCookieStoreLocations.length =
            salmonCookieStoreLocations.length - 1; 
          throw salmonCookieStoreLocations[i].location +
            ' is a duplicate location.';
        }
      }
    } catch (e) {
      alert('Error :' + e);
    }
  }
}

function validateMaxMin(salmonCookieStoreLocations) {
  errorStatus = 'N'; 
  var locationArrayLength = salmonCookieStoreLocations.length;
  if (locationArrayLength > 1) {
    try {
      for (var i = 0; i < locationArrayLength - 1; i++) {
        if (
          parseint(salmonCookieStoreLocations[locationArrayLength - 1].minimumCustomers) <
          parseint(salmonCookieStoreLocations[i].maximumCustomers)
        ) {
          errorStatus = 'Y';
          salmonCookieStoreLocations.length =
            salmonCookieStoreLocations.length - 1; 
          throw 'Maximum number of customers shpuld be grater than minimum number';
        }
      }
    } catch (e) {
      alert('Error :' + e);
    }
  }
}

function validateSpecialCharacters(salmonCookieStoreLocations) {
  var pattern = new RegExp(/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/);
  var locationArrayLength = salmonCookieStoreLocations.length - 1;
  try {
    if (
      pattern.test(salmonCookieStoreLocations[locationArrayLength].location)
    ) {
      errorStatus = 'Y';
      salmonCookieStoreLocations.length = salmonCookieStoreLocations.length - 1; 
      throw 'Please only use standard alphanumerics';
    }
  } catch (e) {
    alert('Error :' + e);
  }
}


var createSalesHeader = function() {
 
  var mainLocationDetailsTable = document.getElementById(
    'salmonCookieSalesTable'
  );
  var table = document.createElement('table');
  mainLocationDetailsTable.appendChild(table);
  table.id = 'salestable';

  var insideMainLocationDetailsTable = document.getElementById('salestable');
  var newRow = document.createElement('tr');
  newRow.id = 'heading';
  insideMainLocationDetailsTable.appendChild(newRow);

  var headerLocation = document.getElementById('heading');
  var newTh = document.createElement('th');
  headerLocation.appendChild(newTh);


  for (var i = 0; i < workingHours.length; i++) {
    if (i < workingHours.length) {
      newTh = document.createElement('th');
      var newString = workingHours[i];
      newTh.innerText = newString;
      headerLocation.appendChild(newTh);
    }
  }


  var headerTotal = document.createElement('th');
  var salesTotalString = 'Total';
  headerTotal.innerText = salesTotalString;
  headerLocation.appendChild(headerTotal);
};


var calculateHourlySalesTotal = function() {
  salmonCookieTotalCount = 0;
  for (var i = 0; i < workingHours.length; i++) {
  
    var hourlyTotalSalesPerLocation = 0;
    for (var j = 0; j < salmonCookieStoreLocations.length; j++) {
      hourlyTotalSalesPerLocation +=
        salmonCookieStoreLocations[j].cookiesHourlyArray[i];
      console.log('Hourly Total' + hourlyTotalSalesPerLocation);
    }
    var footerColumnTotalValue = document.getElementById('footer');
    var columnValue = document.createElement('td');
    columnValue.innerText = hourlyTotalSalesPerLocation;
    footerColumnTotalValue.appendChild(columnValue);
    salmonCookieTotalCount += hourlyTotalSalesPerLocation;

    console.log(salmonCookieTotalCount);
  }
};


var createSalesFooter = function() {
  var insideTable = document.getElementById('salestable');
  let table = document.querySelector('table');
  var rowValue = document.createElement('tr');

  if (salmonCookieStoreLocations.length > 1) {
    console.log('Delete Hourly Row' + salmonCookieStoreLocations.length);
    table.deleteRow(salmonCookieStoreLocations.length);
  }
  rowValue.id = 'footer';
  insideTable.appendChild(rowValue);

  var footerLocation = document.getElementById('footer');
  var columnValue = document.createElement('td');
  columnValue.innerText = 'Hourly Totals';
  footerLocation.appendChild(columnValue);

  calculateHourlySalesTotal();

  var footerColumnTotalValue = document.createElement('td');
  footerColumnTotalValue.innerText = salmonCookieTotalCount;
  footerLocation.appendChild(footerColumnTotalValue);
};


createSalesHeader();


locationDetailsInputForm.addEventListener(
  'submit', salmonCookieLocationInputFormData);

