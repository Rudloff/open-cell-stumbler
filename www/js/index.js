/*global cordova */
/*jslint browser: true, devel: true */
var cellLocation, lastPosition, scanning = false, updateCellInterval, locationWatch, togglescan;

function updateCell() {
    'use strict';
    cellLocation.get(function (result) {
        var cell = JSON.parse(result);
        console.log('Getting cell info: ' + cell.CID);
        document.getElementById('cellid').textContent = cell.CID;
        document.getElementById('mcc').textContent = cell.MCC;
        document.getElementById('mnc').textContent = cell.MNC;
        document.getElementById('lac').textContent = cell.LAC;
        document.getElementById('netname').textContent = cell.Name;
        document.getElementById('country').textContent = cell.Country;
    }, function () {
        console.log("error");
    });
}

function sendCell(cell, position) {
    'use strict';
    var oReq = new XMLHttpRequest(), url = 'http://opencellid.org/measure/add?key=' + apiKey + '&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&mcc=' + cell.MCC + '&mnc=' + cell.MNC + '&lac=' + cell.LAC + '&cellid=' + cell.CID + '&rating=' + position.coords.accuracy + '&speed=' + position.coords.speed + '&direction=' + position.coords.heading + '&measured_at=' +  position.timestamp;
    oReq.open('GET', url, true);
    console.log(url);
    oReq.send(null);
    oReq.onreadystatechange = function () {
        if (oReq.readyState === 4) {
            document.getElementById('sent').textContent += 1;
            console.log(oReq.responseText);
        }
    };
    document.getElementById('measured').textContent += 1;
}

function getCell(position) {
    'use strict';
    cellLocation.get(function (result) {
        sendCell(JSON.parse(result), position);
    }, function () {
        console.log("error");
    });
}

function updateLocation(position) {
    'use strict';
    console.log('Getting location: ' + position.coords.latitude + ', ' + position.coords.longitude);
    updateCell();
    document.getElementById('latitude').textContent = position.coords.latitude;
    document.getElementById('longitude').textContent = position.coords.longitude;
    getCell(position);
}

function noLocation(error) {
    'use strict';
    console.log(error.code);
    document.getElementById('latitude').textContent = error.message;
    document.getElementById('longitude').textContent = error.message;
}

function toggleScanning() {
    'use strict';
    if (scanning) {
        console.log('Stop scanning');
        navigator.geolocation.clearWatch(locationWatch);
        clearInterval(updateCellInterval);
        scanning = false;
        togglescan.textContent = 'Start';
        cordova.plugins.backgroundMode.disable();
    } else {
        console.log('Start scanning');
        updateCell();
        locationWatch = navigator.geolocation.watchPosition(updateLocation, noLocation, { enableHighAccuracy: true, maximumAge: 0 });
        updateCellInterval = setInterval(updateCell, 60000);
        scanning = true;
        togglescan.textContent = 'Stop';
        cordova.plugins.backgroundMode.enable();
        cordova.plugins.backgroundMode.configure({
            title:  'OpenCellStumbler',
            text:   'Scanning…'
        });
    }
}

function onDeviceReady() {
    'use strict';
    cellLocation = cordova.require("cordova/plugin/CellLocation");
    togglescan = document.getElementById('togglescan');
    togglescan.addEventListener('click', toggleScanning, false);
}

document.addEventListener("deviceready", onDeviceReady, false);
