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

  // All document quesries 
  let fName = document.getElementById("fName")
  let username = document.getElementById("Username");
  let age = document.getElementById("age");
  let gene = document.getElementById("gene");
  let NHISID = document.getElementById("NHISID");
  let gender = document.getElementById("gender");
  let bGroup = document.getElementById("bGroup")
  let Weight = document.getElementById("Weight")
  let Height = document.getElementById("Height")
  let BMI = document.getElementById("BMI")
  let Userrole = document.getElementById("Userrole")
  let role = document.getElementById("role")
  let patientProfile = document.getElementById("patientProfile");
  let drProfile = document.getElementById("drProfile");
  
  // Getting all element for side menus
  const logOut = document.getElementById("signOut");
  const Overview = document.getElementById("Overview");
  const Appointments = document.getElementById("Appointments")
  const Doctors = document.getElementById("Doctors")
  const History = document.getElementById("History")
  const Settings = document.getElementById("Settings")



try {
  onAuthStateChanged(auth, async (user) => {
  if(user){
    const uid = user.uid;
    const userColRef =  collection(DB, "users")
    const userDoc = doc(userColRef, uid);
    const docSnap = await getDoc(userDoc)
    const userData = docSnap.data()
    console.log(userData.role); // What is the role

    if (userData.role == "Patient") { 
      drProfile.style.display = "none"
      username.innerHTML = `<b>${userData.FirstName}</b>`;
      fName.innerHTML = `<b>${userData.FirstName}</b>`
      age.textContent = (new Date().getFullYear())-(userData.DOB.slice(0,4));
      gene.textContent = userData.Genetic;
      NHISID.textContent = userData.NHISID;
      gender.textContent = userData.Gender;
      bGroup.textContent = userData.BloodGroup;
      role.textContent = "Doctor";
      Weight.textContent = userData.Weight;
      Height.textContent = userData.Height;
      Userrole.textContent = userData.role;
      BMI.textContent = (userData.Weight/(userData.Height *userData.Height)).toFixed(2)   
      return
    }
    if (userData.role == "Doctor") { 
      console.log(userData);
      
      Doctors.style.display = "none"
      patientProfile.style.display = "none"
      username.innerHTML = `<b>${userData.fullName}</b>`;
      fName.innerHTML = `<b>${userData.fullName.slice(0)}</b>`;
      role.textContent = "Patients"
      spec.textContent = userData.Specialty;
      LicID.textContent = userData.LicenseID;
      gend.textContent = userData.Gender;
      xp.textContent = userData.Experience;
      fee.textContent = userData.ConsultFee;
      hosName.textContent = userData.HospitalName;
      Address.textContent = userData.HospitalAddress;
      return
    }


  }
 })
} 
catch (error) {
  console.log(error.code);}

finally{
    // Signout from the web
    logOut.addEventListener("click", async () => {
      signOut(auth);
      window.location.href = "../src/Login.html"
    })

    // Other side Menu buttons
    Overview.addEventListener("click", () => {
      window.location.href = "#"
    })

    Appointments.addEventListener("click", () => {
      window.location.href = "../src/Appointments.html"
    })
    Doctors.addEventListener("click", () => {
      window.location.href = "../src/Doctors.html"
    })
    History.addEventListener("click", () => {
      window.location.href = "../src/History.html"
    })
    Settings.addEventListener("click", () => {
      window.location.href = "../src/Settings.html"
    })
}




// Getting queries for all the html data 





