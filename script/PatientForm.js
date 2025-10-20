  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  import {getFirestore, doc,updateDoc, setDoc} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
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

// Getting all document  by ID
let submit = document.getElementById("submit");
let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let DOB = document.getElementById("DOB");
let gender = document.getElementById("gender")
let phoneNumber = document.getElementById("fName");
let mail = document.getElementById("mail")
let NHISID = document.getElementById("NHISID")
let Address = document.getElementById("Address")
let City = document.getElementById("City")
let State = document.getElementById("State")
let EName = document.getElementById("EName")
let EPhone = document.getElementById("EPhone");
let gene = document.getElementById("gene");
let bGroup = document.getElementById("bGroup");
let Height = document.getElementById("Height");
let Weight = document.getElementById("Weight");
let medicalHistory = document.getElementById("medicalHistory");

submit.addEventListener("click",  () => {
// Storing my values inside an object name profile
const profile = {
          FirstName: fName.value,
          LastName: lName.value,
          DOB: DOB.value,
          Gender: gender.value,
          PhoneNumber: phoneNumber.value,
          Email: mail.value,
          NHISID: NHISID.value,
          Address: Address.value,
          City: City.value,
          State: State.value,
          EName: EName.value,
          EPhone: EPhone.value,
          MedicalHistory: medicalHistory.value,
          Genetic: gene.value,
          BloodGroup: bGroup.value,
          Height: Height.value,
          Weight: Weight.value,
          DateCreated: `${new Date().getDay()} / ${new Date().getMonth()} / ${new Date().getFullYear()}`,
          BMI: Weight.value / (Weight.value*Weight.value),
      }
//This get the value of the current user who signed up
onAuthStateChanged(auth, async(user)=>{
    if(user){
      const uid = user.uid;
      try {
           await updateDoc(doc(DB,"users", uid), profile)
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