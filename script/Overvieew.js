  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  import {getFirestore, doc, collection, getDoc, getDocs, setDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const DB = getFirestore(app)


try {
  onAuthStateChanged(auth, async (user) => {
  if(user){
    const uid = await user.uid;
    console.log(`You are logged in {uid}`, uid);
    //All lthe html query data
    let username = document.getElementById("username");
    username.innerText = uid;

    // let fName = document.getElementById("fName")
    // let fName = document.getElementById()
    // let fName = document.getElementById()
    // let fName = document.getElementById()
    // let fName = document.getElementById()
    // let fName = document.getElementById()
    // let fName = document.getElementById()
    // let fName = document.getElementById()
    // let fName = document.getElementById()
    // let fName = document.getElementById()
    // let fName = document.getElementById()
    // let fName = document.getElementById()
  }
  else{
    console.log("User does not exist");
  }})
} catch (error) {
  console.log(error.code);  
}
finally{
  // Signout from the web
    const logOut = document.getElementById("signOut");
    logOut.addEventListener("click", async () => {
      signOut(auth);
      window.location.href = "../src/Login.html"
    })
}




// Getting queries for all the html data 





