expo-gradle-ext-vars
==============================================================================

[![](https://dl.dropboxusercontent.com/s/nm4s5ltlug63vv8/logo-150-print.png?dl=1)](https://www.transistorsoft.com)

By [**Transistor Software**](http://transistorsoft.com), creators of [**React Native Background Geolocation**](http://www.transistorsoft.com/shop/products/react-native-background-geolocation)

------------------------------------------------------------------------------

A simple *Expo Config Plugin* for appending Android `ext` vars to the `android/build.gradle`.

*/android/build.gradle*

```diff
import org.apache.tools.ant.taskdefs.condition.Os

// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    ext {
+// @generated begin expo-gradle-ext-vars - expo prebuild (DO NOT MODIFY) sync-8c85b9ad3863726565f7eff0645ac3f5c56ce733
+        googlePlayServicesLocationVersion = "20.0.0"
+        appCompatVersion = "1.4.2"
+        removeBackgroundGeolocationDebugSoundsInRelease = false
+// @generated end expo-gradle-ext-vars
        buildToolsVersion = findProperty('android.buildToolsVersion') ?: '31.0.0'
        minSdkVersion = Integer.parseInt(findProperty('android.minSdkVersion') ?: '21')
        compileSdkVersion = Integer.parseInt(findProperty('android.compileSdkVersion') ?: '31')
        targetSdkVersion = Integer.parseInt(findProperty('android.targetSdkVersion') ?: '31')
        if (findProperty('android.kotlinVersion')) {
            kotlinVersion = findProperty('android.kotlinVersion')
        }
        frescoVersion = findProperty('expo.frescoVersion') ?: '2.5.0'

        if (System.properties['os.arch'] == 'aarch64') {
            // For M1 Users we need to use the NDK 24 which added support for aarch64
            ndkVersion = '24.0.8215888'
        } else {
            // Otherwise we default to the side-by-side NDK version from AGP.
            ndkVersion = '21.4.7075529'
        }
    }

 }
 ```
