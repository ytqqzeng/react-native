package com.nipaibao;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.beefe.picker.PickerViewPackage;
import com.theweflex.react.WeChatPackage;
import cn.reactnative.httpcache.HttpCachePackage;
import com.imagepicker.ImagePickerPackage;
//import com.github.yamill.orientation.OrientationPackage;
//import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.imagepicker.ImagePickerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new PickerViewPackage(),
            new WeChatPackage(),
            new HttpCachePackage(),
            new ImagePickerPackage(),
//            new OrientationPackage(),
//            new SplashScreenReactPackage(),
                    new ReactVideoPackage()

                    
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
