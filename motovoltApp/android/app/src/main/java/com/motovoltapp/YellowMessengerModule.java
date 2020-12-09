package co.motovolt.motovoltapp;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

import com.example.ymwebview.BotEventListener;
import com.example.ymwebview.YMBotPlugin;
import com.example.ymwebview.models.BotEventsModel;

import android.util.Log;

public class YellowMessengerModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    YMBotPlugin mYMBotPlugin;
    HashMap<String, Object> mConfigurations;
    HashMap<String, Object> mPayloadData;
    String mConfigData;
    Boolean mPluginInitialized;

    YellowMessengerModule(ReactApplicationContext context) {
        super(context);
        context.addLifecycleEventListener(this);
        mPluginInitialized = false;
    }

    @Override
    public String getName() {
        return "YellowMessengerModule";
    }

    @ReactMethod
    public void initializeYM(String userID, String accessToken, String refreshToken, String mobileNumber,  String journeySlug, String userState) {
        mConfigurations = new HashMap<>();
        mPayloadData = new HashMap<>();
        //Initialize the bot
        mYMBotPlugin =  YMBotPlugin.getInstance();
        Log.d("YellowMessengerModule", "******************************This is invoked now");
        Log.d("YellowMessengerModule", "*****" + userID + ">>>" + accessToken + ">>>" + refreshToken + ">>>" + mobileNumber + ">>>" + journeySlug  + ">>>" + userState);

        //Configuration data
        String configData;
        //Payload attributes
        HashMap<String, Object> mPayloadData = new HashMap<>();
        //Important
        mPayloadData.put("platform","Android-App");

        mPayloadData.put("UserId",userID);
        mPayloadData.put("access-token",accessToken);
        mPayloadData.put("refresh-token",refreshToken);
        mPayloadData.put("mobile-number",mobileNumber);
        mPayloadData.put("journey-slug",journeySlug);
        mPayloadData.put("user-state",userState);
        //You can add other payload attributes in the same format.

        //Setting Config data.
        mConfigurations.put("botID", "1");
        mConfigurations.put("enableSpeech", "false");
        mConfigurations.put("enableHistory", "true");
        mConfigurations.put("actionBarColor", "blue");
        mConfigurations.put("statusBarColor", "blue");
        mConfigData = YMBotPlugin.mapToString(mConfigurations);
        try {
            mYMBotPlugin.init(mConfigData, new BotEventListener() {
                @Override
                public void onSuccess(BotEventsModel botEvent) {
                    Log.d("EventListener", "Event Recieved: " + botEvent.getCode());
                    switch (botEvent.getCode()) {
                        case "even-name-1":
                            break;
                        case "even-name-2":
                            break;
                        case "even-name-3":
                            break;
                    }
                }

                @Override
                public void onFailure(String error) {
                    Log.d("YMModule", error);
                }
            });
        }
        catch(Exception e){
            //this is really a catch all and we need to properly handle errors. Here is it is done to avoid duplicate creation error of the plugins.
            Log.d("YMModule", e.getMessage());

        }
    }

    @ReactMethod
    void invokeChatBot(){
        //Send Payload Data
        mYMBotPlugin.setPayload(mPayloadData);
        mYMBotPlugin.startChatBot(getCurrentActivity());
    }
    @Override
    public void onHostResume() {
        Log.i(getName(), "- onResume");
    }

    @Override
    public void onHostPause() {
        Log.i(getName(), "- onPauase");
    }

    @Override
    public void onHostDestroy() {
        Log.i(getName(), "- onDestroy");
    }
}