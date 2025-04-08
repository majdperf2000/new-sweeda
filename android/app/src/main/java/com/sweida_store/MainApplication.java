package com.sweida_store.android; // استبدل باسم حزمة تطبيقك

import android.app.Application;
import android.content.res.Configuration;
import androidx.annotation.NonNull;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.community.fcm.FCMPlugin; // إذا كنت تستخدم FCM

import java.util.ArrayList;

public class MainApplication extends Application {

    // قائمة بكل إضافات Capacitor المطلوبة
    private ArrayList<Class<? extends Plugin>> getInitialPlugins() {
        ArrayList<Class<? extends Plugin>> plugins = new ArrayList<>();
        
        // الإضافات الأساسية
        plugins.add(com.getcapacitor.community.admob.AdMob.class); // مثال لإضافة AdMob
        
        // إضافة FCM إذا كنت تستخدم Push Notifications
        try {
            plugins.add(FCMPlugin.class);
        } catch (NoClassDefFoundError e) {
            // تجاهل إذا لم تكن الإضافة موجودة
        }

        return plugins;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        // تهيئة Capacitor
        BridgeActivity.init(this, getInitialPlugins());

        // تهيئة Firebase (إذا كنت تستخدمه)
        initFirebase();

        // تهيئة أدوات التحليل (Crashlytics, Analytics)
        initAnalyticsTools();

        // إعدادات إضافية للتطبيق
        AppConfig.initialize(this); // إذا كان لديك فئة تكوين خاصة
    }

    private void initFirebase() {
        try {
            // التحقق من وجود ملف google-services.json
            if (getResources().getIdentifier("google_services_json", "raw", getPackageName()) != 0) {
                FirebaseApp.initializeApp(this);
                FirebaseCrashlytics.getInstance().setCrashlyticsCollectionEnabled(!BuildConfig.DEBUG);
            }
        } catch (Exception e) {
            // تجاهل إذا لم تكن Firebase مثبتة
        }
    }

    private void initAnalyticsTools() {
        if (!BuildConfig.DEBUG) {
            // تهيئة أدوات التحليل للنسخة النهائية فقط
            // مثال: Sentry, Mixpanel, etc.
        }
    }

    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        // معالجة تغييرات التكوين (مثل تغيير اللغة)
        LocaleManager.setLocale(this); // إذا كنت تدعم تعدد اللغات
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        // معالجة حالات ذاكرة منخفضة
        Glide.get(this).clearMemory(); // مثال: مسح ذاكرة Glide
    }

    @Override
    public void onTrimMemory(int level) {
        super.onTrimMemory(level);
        // تحسين استخدام الذاكرة عند طلب النظام
        if (level >= TRIM_MEMORY_MODERATE) {
            Glide.get(this).clearMemory();
        }
    }

    // فئة مساعدة للتكوين (اختياري)
    public static class AppConfig {
        private static Application appContext;

        public static void initialize(Application application) {
            appContext = application;
            // تهيئة إضافية هنا
        }

        public static Application getAppContext() {
            return appContext;
        }
    }
}