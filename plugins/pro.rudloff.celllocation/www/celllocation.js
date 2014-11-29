var CellLocationLoader = function (require, exports, module) {
    var exec = require("cordova/exec");
    
    function CellLocation () {}
        
    CellLocation.prototype.get = function (successFunc, failFunc) {
        exec(successFunc, failFunc, "CellLocation","get",[]);
    };
    
    var cellLocation = new CellLocation();
    module.exports = cellLocation;
};

CellLocationLoader(require, exports, module);

cordova.define("cordova/plugin/CellLocation", CellLocationLoader);



