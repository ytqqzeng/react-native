package com.nipaibao.config;

import com.nipaibao.BuildConfig;

public class Config {
	public static final long ONE_HOUR_MS = 60 * 60 * 1000;
	public static final long ONE_DAY_MS = 24 * ONE_HOUR_MS;

	public static final String SERVER_URL = "http://47.99.93.72/shop/";
	public static final String GET_FILE_PARAMS = "eop/upload/getFile.do?fileName=";
	public static final String SPLASH_PARAMS = GET_FILE_PARAMS + "splash.dat";
}
