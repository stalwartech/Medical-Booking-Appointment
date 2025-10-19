  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAEWuDKVz2FGRRggvHE_FoAcTBCBxMwiyE",
    authDomain: "medical-appointment-98ddc.firebaseapp.com",
    projectId: "medical-appointment-98ddc",
    storageBucket: "medical-appointment-98ddc.firebasestorage.app",
    messagingSenderId: "461623670875",
    appId: "1:461623670875:web:e517ca0b69eaee8a4ea77e"
  };


// Calling all the html tags 
let mailInp = document.getElementById("mailInp");
let passInp = document.getElementById("passInp");
let signupBtn = document.getElementById("signupBtn");
let notifyPara = document.getElementById("notify");


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let createUser = async () => {
    if(!mailInp.value){
        notifyPara.innerHTML = "Enter a correct mail";
        return
    }
    if(!passInp.value){
        notifyPara.innerHTML = "Enter password";
        return
    }

    try {
        const userDetails =  await createUserWithEmailAndPassword(auth, mailInp.value, passInp.value);  
        const userUid = userDetails.user;
        signupBtn.disabled = true;
        console.log(userUid);
        window.location.href = "../src/Redirect1.html"
        
    } 
    catch (error) {
        console.log(error);
    }
}

signupBtn.addEventListener("click", () => {
    createUser();
})


