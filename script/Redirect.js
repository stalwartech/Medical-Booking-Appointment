  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  import {getFirestore, doc, collection, getDocs, setDoc} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
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


// Submit button 
let submit = document.getElementById("submit");

//Full Name 
let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let DOB = document.getElementById("DOB");

// Gender and  Phone Number 
let gender = document.getElementById("gender")
let phoneNumber = document.getElementById("fName");

// Email and NHIS
let mail = document.getElementById("mail")
let NHISID = document.getElementById("NHISID")

// Address
let Address = document.getElementById("Address")
let City = document.getElementById("City")
let State = document.getElementById("State")

// Emergency Contact
let EName = document.getElementById("EName")
let EPhone = document.getElementById("EPhone");

// Medical Form 
let gene = document.getElementById("gene");
let bGroup = document.getElementById("bGroup");
let Height = document.getElementById("Height");
let Weight = document.getElementById("Weight");
let BMI = document.getElementById("BMI");
let regDate = document.getElementById("regDate");
// let age = document.getElementById("age");

// Medical History 
let medicalHistory = document.getElementById("medicalHistory");

submit.addEventListener("click",  () => {
// Storing my values inside an object name profile
const profile = {
          firstName: fName.value,
          lastName: lName.value,
          DOB: DOB.value,
          gender: gender.value,
          phoneNumber: phoneNumber.value,
          Email: mail.value,
          NHISID: NHISID.value,
          Address: Address.value,
          City: City.value,
          State: State.value,
          EName: EName.value,
          EPhone: EPhone.value,
          medicalHistory: medicalHistory.value,
          Genetic: gene.value,
          bloodGroup: bGroup.value,
          Height: Height.value,
          Weight: Weight.value,
          BMI: Height.value * Weight.value,
          Reg_Date: new Date(),
          BMI: Weight.value / (Weight.value*Weight.value),
      }
//This get the value of the current user who signed up
onAuthStateChanged(auth, async(user)=>{
    if(user){
      const uid = user.uid;
      try {
           await setDoc(doc(DB,"users", uid), profile)
           submit.disabled = true;          
           window.location.href = "../src/Overview.html"
      } catch (error) {
        console.log(error.code);
      }
    }
    else{
      console.log("User does not exist");      
  }
})
})

// My form 
let myform = document.getElementById("myform")
myform.addEventListener("click", (e) => {
    e.preventDefault()
})