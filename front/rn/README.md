== README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Node.js version
    v8.9.4
* npm version
    5.6.0
* react-native-cli 
    2.0.1
* System dependencies
  Android Studio
  Java SDK
  Android SDK
* Configuration
  - Configuration Linux Ubuntu 18.04
    - Install Android Studio
      - Download application
        https://dl.google.com/dl/android/studio/ide-zips/3.1.3.0/android-studio-ide-173.4819257-linux.zip
      - unzip aplication, entrer to directory and execute thi command
        ./studio.sh
        follow the instructions of the installation
      - in the Android Studio install sdk tools

    - Install this applications if not exist
      sudo apt-get install npm
      sudo npm install -g n
      sudo apt install adb
      sudo apt install android-sdk

    - Install react-native
      npm install --ignore-scripts 
      npm install react-native
      npm install
      
    - Install libraries
      Within the project execute this command
        react-native link 

    - Install others libraries if necesary
      npm install <name-library>

  - Configuration Windows

  - Configuration MacOS
    - Download Andoid Studio
      - Installs Android Studio

    - Install react-native
      - run this command in terminal "npm install -g react-native-cli"

    - Install libraries
     - in andoid studio select SDK Manager and selected version andoid to install

    - Install libraries
      Within the project execute this command
        react-native link 

    - Install others libraries if necesary
      npm install <name-library>





* Deployment instructions
