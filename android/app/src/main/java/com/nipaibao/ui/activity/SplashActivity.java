package com.nipaibao.ui.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.nipaibao.R;
import com.nipaibao.config.Config;
import com.squareup.picasso.Callback;
import com.squareup.picasso.Picasso;

import java.util.Timer;
import java.util.TimerTask;

public class SplashActivity extends Activity {
    private boolean mHasGoneToNext = false;
    private boolean mLoadSuccess = false;

    private final long SPLASH_TIME = 2000;
    private final long LOAD_TIME = 600;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        showSplashImage();
    }

    private void gotoNext(Class<?> cls) {
        if (cls.equals(MainActivity.class) && mHasGoneToNext) {
            return;
        }
        Intent intent = new Intent(this, cls);
        startActivity(intent);
        mHasGoneToNext = true;
        finish();
    }

    private void showSplashImage() {
        final Timer timer = new Timer();
        ImageView splash = (ImageView) findViewById(R.id.splash);
        splash.setVisibility(View.VISIBLE);
        //check if there is cache, if is, show splash, else load and into main
        Picasso.with(this).load(Config.SERVER_URL + Config.SPLASH_PARAMS)
               .into(splash, new Callback() {
                    @Override
                    public void onSuccess() {
                        if (!mHasGoneToNext) {
                            timer.cancel();
                            mLoadSuccess = true;
                            new Timer().schedule(new TimerTask() {
                                @Override
                                public void run() {
                                    gotoNext(MainActivity.class);
                                }
                            }, SPLASH_TIME);
                        }
                    }

                    @Override
                    public void onError() {
                        if (!mHasGoneToNext) {
                            timer.cancel();
                            gotoNext(MainActivity.class);
                        }
                    }
                });
        if (!mLoadSuccess) {
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    if (!mHasGoneToNext) {
                        gotoNext(MainActivity.class);
                    }
                }
            }, LOAD_TIME);
        }
    }
}
