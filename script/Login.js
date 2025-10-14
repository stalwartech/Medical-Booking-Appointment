import {initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

  // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAEWuDKVz2FGRRggvHE_FoAcTBCBxMwiyE",
    authDomain: "medical-appointment-98ddc.firebaseapp.com",
    projectId: "medical-appointment-98ddc",
    storageBucket: "medical-appointment-98ddc.firebasestorage.app",
    messagingSenderId: "461623670875",
    appId: "1:461623670875:web:e517ca0b69eaee8a4ea77e"
  };


// Importing all the HTMl tags for usage 
let mailInp = document.getElementById("mailInp");
let passInp = document.getElementById("passInp");
let loginBtn = document.getElementById("loginBtn");
let notifyPara = document.getElementById("notify");
let myform = document.getElementById("myform");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Login Event
let loginUser = async () => {
    if(!mailInp.value){
        notifyPara.innerHTML = "Enter a correct mail";
        return
    }
    if(!passInp.value){
        notifyPara.innerHTML = "Enter password";
        return
    }
    try {
        const userDetails = await signInWithEmailAndPassword(auth, mailInp.value, passInp.value);
        const userUid = userDetails.user;
        loginBtn.disabled = true
        // console.log("Sign Up completed");
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log("This is a user", uid);
            } else {
                console.log("User is signed out");
                
            }
        })

        console.log(userUid);    
        window.location.href = "../src/Overview.html"    
    } catch (error) {
        console.log(error.code);
        // auth/network-request-failed
    }
}

// Adding event listener to the login button
loginBtn.addEventListener("click", () => {
    loginUser()
})

myform.addEventListener("click", (e) => {
    e.preventDefault();
})