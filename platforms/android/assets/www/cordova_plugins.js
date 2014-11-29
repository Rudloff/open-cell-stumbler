cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/pro.rudloff.celllocation/www/celllocation.js",
        "id": "pro.rudloff.celllocation.CellLocation",
        "clobbers": [
            "cordova.plugins.cellLocation"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.background-mode/www/background-mode.js",
        "id": "de.appplant.cordova.plugin.background-mode.BackgroundMode",
        "clobbers": [
            "cordova.plugins.backgroundMode",
            "plugin.backgroundMode"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.geolocation": "0.3.10",
    "pro.rudloff.celllocation": "1.0.1",
    "de.appplant.cordova.plugin.background-mode": "0.6.0-dev",
    "org.apache.cordova.device": "0.2.13-dev"
}
// BOTTOM OF METADATA
});