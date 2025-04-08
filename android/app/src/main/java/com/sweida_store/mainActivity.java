package com.sweida_store.android; // استبدل باسم حزمة تطبيقك

import android.os.Bundle;
import android.webkit.WebView;
import androidx.appcompat.app.AppCompatActivity;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.community.fcm.FCMPlugin;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // تهيئة إضافية للنشاط
        initializeActivity();

        // تحميل إضافات Capacitor الإضافية
        registerAdditionalPlugins();

        // تهيئة WebView المتقدمة (إذا لزم الأمر)
        configureWebView();

        // تحميل التطبيق (يجب أن تكون هذه هي آخر عملية)
        load();
    }

    private void initializeActivity() {
        // إعدادات شريط الحالة (Status Bar)
        getWindow().setStatusBarColor(getResources().getColor(R.color.status_bar_color));

        // إعدادات شاشة التمهيد (Splash Screen)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            getSplashScreen().setOnExitAnimationListener(splashScreenView -> {
                splashScreenView.remove();
            });
        }
    }

    private void registerAdditionalPlugins() {
        // تسجيل إضافات Capacitor الإضافية
        ArrayList<Class<? extends Plugin>> additionalPlugins = new ArrayList<>();
        
        // مثال: إضافة FCM (Firebase Cloud Messaging)
        try {
            additionalPlugins.add(FCMPlugin.class);
        } catch (NoClassDefFoundError e) {
            // تجاهل إذا لم تكن الإضافة مثبتة
        }

        // إضافة أي إضافات مخصصة هنا
        // additionalPlugins.add(MyCustomPlugin.class);

        this.registerPlugins(additionalPlugins);
    }

    private void configureWebView() {
        // تكوين متقدم لـ WebView
        WebView webView = getBridge().getWebView();
        
        // تمكين وضع التطوير في Debug
        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        // تحسينات الأداء
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        webView.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
    }

    @Override
    protected void onResume() {
        super.onResume();
        // متابعة جلسات التحليل عند استئناف النشاط
        AnalyticsTracker.resumeSession(this);
    }

    @Override
    protected void onPause() {
        // إيقاف جلسات التحليل عند إيقاف النشاط
        AnalyticsTracker.pauseSession(this);
        super.onPause();
    }

    @Override
    public void onBackPressed() {
        // معالجة زر الرجوع للتحكم في التنقل داخل WebView
        if (getBridge().getWebView().canGoBack()) {
            getBridge().getWebView().goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        // معالجة نتائج صلاحيات الأذونات
        PermissionHandler.handleResult(this, requestCode, permissions, grantResults);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        // معالجة الروابط العميقة (Deep Links)
        if (intent != null && intent.getData() != null) {
            handleDeepLink(intent.getData());
        }
    }

    private void handleDeepLink(Uri data) {
        // معالجة الروابط الواردة
        String path = data.getPath();
        // أرسل الحدث إلى JavaScript
        getBridge().eval("window.dispatchEvent(new CustomEvent('deepLink', { detail: '" + path + "' }));");
    }

    // فئة مساعدة لمعالجة الأذونات (اختياري)
    public static class PermissionHandler {
        public static void handleResult(Activity activity, int requestCode, String[] permissions, int[] grantResults) {
            // معالجة مخصصة لطلبات الأذونات
        }
    }

    // فئة مساعدة لتتبع التحليلات (اختياري)
    public static class AnalyticsTracker {
        public static void resumeSession(Activity activity) {
            // بدء/استئناف جلسة التحليل
        }

        public static void pauseSession(Activity activity) {
            // إيقاف جلسة التحليل
        }
    }
}