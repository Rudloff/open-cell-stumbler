package pro.rudloff.cordova.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;

import android.content.Context;
import android.telephony.TelephonyManager;
import android.accounts.Account;
import android.accounts.AccountManager;
import android.telephony.gsm.GsmCellLocation;


public class CellLocation extends CordovaPlugin {

    private String getCell(TelephonyManager tm) {
        String str = "";
        GsmCellLocation cell = (GsmCellLocation)tm.getCellLocation();
        
        str = "{ " + 
                "\"CID\": \"" + cell.getCid() + "\"," +
                "\"LAC\": \"" + cell.getLac() + "\"," +
                "\"Name\": \"" + tm.getNetworkOperatorName() + "\"," +
                "\"Country\": \"" + tm.getNetworkCountryIso() + "\"," +
                "\"MCC\": \"" + tm.getNetworkOperator().substring(0, 3) + "\"," +
                "\"MNC\": \"" + tm.getNetworkOperator().substring(3) + "\""
        + " }"; 

        return str;
    }

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        try {
            if (action.equals("get")) {
                TelephonyManager tm = (TelephonyManager) this.cordova.getActivity().getSystemService(Context.TELEPHONY_SERVICE);

                String result = getCell(tm);
                if (result != null) {
                    callbackContext.success(result);
                    return true;
                }
            }
            callbackContext.error("Invalid action");
            return false;
        } catch (Exception e) {
            String s = "Exception: " + e.getMessage();

            System.err.println(s);
            callbackContext.error(s);

            return false;
        }
    }
}
