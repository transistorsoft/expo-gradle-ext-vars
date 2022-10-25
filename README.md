expo-gradle-ext-vars
==============================================================================

[![](https://dl.dropboxusercontent.com/s/nm4s5ltlug63vv8/logo-150-print.png?dl=1)](https://www.transistorsoft.com)

By [**Transistor Software**](http://transistorsoft.com), creators of [**React Native Background Geolocation**](http://www.transistorsoft.com/shop/products/react-native-background-geolocation)

------------------------------------------------------------------------------

A simple *Expo Config Plugin* for appending Android `ext` vars to the `android/build.gradle`.  `ext` vars are a common Android method for configuring [project-wide, global configuration properties](https://developer.android.com/studio/build/gradle-tips#configure-project-wide-properties) which can be shared by other plugins in order to avoid dependency conflicts.

A common usage of `ext` vars is to align *Google* / *AndroidX* dependency version across different plugins using the same dependencies.  For example:

```gradle
dependencies {
    implementation "androidx.appcompat:appcompat:${rootProject.ext.appCompatVersion}"
    implementation "com.google.android.gms:play-services-location:${rootProject.ext.playServicesLocationVersion}"
}
```

## Example Result: `android/build.gradle`

```diff
import org.apache.tools.ant.taskdefs.condition.Os

// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    ext {
+       // @generated begin expo-gradle-ext-vars - expo prebuild (DO NOT MODIFY) sync-8c85b9ad3863726565f7eff0645ac3f5c56ce733
+       googlePlayServicesLocationVersion = "20.0.0"
+       appCompatVersion = "1.4.2"
+       // @generated end expo-gradle-ext-vars

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

## Installation

```bash
npx expo install expo-gradle-ext-vars
```

## Usage

Add the following block to your *Expo* app's __`app.json`__.

:warning: The variables below are only an example.  You should only provide variables as prescribed by some other plugin you're installing.

```json
{
  "expo": {
    "plugins": [
      [
        "expo-gradle-ext-vars", {
          "googlePlayServicesLocationVersion": "20.0.0",
          "appCompatVersion": "1.4.2"
        }
      ]
    ]
 }
```

After adding the plugin, run:

```bash
npx expo prebuild
```

