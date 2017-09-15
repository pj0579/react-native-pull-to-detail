# react-native-pull-to-detail
pull-to-view-detail
# install   
yarn add react-native-pull-to-detail <br/>
#emmmmmm<br/>
android have some problem  flatlist will become the respender
![Alt text](https://github.com/pj0579/react-native-pull-to-detail/blob/master/set.png)
that mean onPanResponderTerminate will be called and onPanResponderRelease will not called
you can change sound code follow in PanResponder.js

    onResponderTerminate: function (e) {    setTimeout(()=>{
    clearInteractionHandle(interactionState, config.onPanResponderRelease, e, gestureState);
    PanResponder._initializeGestureState(gestureState);},100)},
      
this will better but also will have some problem = = 
if you have better way please tell me or pull requirest
# how to use
please read example.js 

![Alt text](https://github.com/pj0579/react-native-pull-to-detail/blob/master/android-demo.gif?raw=true)
![Alt text](https://github.com/pj0579/react-native-pull-to-detail/blob/master/ios-demo.gif?raw=true)
