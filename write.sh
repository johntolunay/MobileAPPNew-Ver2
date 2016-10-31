#!/bin/bash 
emulator -avd GAPI_Intel64_6.0_23 -partition-size 128 -no-boot-anim &
adb wait-for-device
adb shell stop
adb remount
adb push hosts /etc/hosts
adb shell start
