const firebase= require('firebase');
const jQuery= require('jquery');
import {configFirebase} from './config';

firebase.initializeApp(configFirebase);
export let menuData="";
const firebaseDb = firebase.database().ref('/Menu');

  function getMenu()
  {        
        const mostViewedPosts = firebase.database().ref('Navigation/');
   
        mostViewedPosts.on("value", function(snapshot) {
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        console.log(1);
  }

  function getFoodMenu()
  {  
    firebaseDb.once('value', function(snap){
        menuData= snap.val();
        //console.log(`firebase file :: ${menuData}`);
    });
  }



  export { getMenu,getFoodMenu};

  
  