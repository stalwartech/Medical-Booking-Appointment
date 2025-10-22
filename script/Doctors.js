import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  import {getFirestore, doc, getDoc, updateDoc, collection} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
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
  const DB = getFirestore(app);

// Geting all the document queries by ID
  const Doctor = document.getElementById("Doctor")
  const Patient = document.getElementById("Patient")
  const role = document.getElementById("role")
  const fName = document.getElementById("fName")

//   Side Menu Button 
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
        console.log(userData);
        
            if (userData.role == "Doctor") {
                Doctors.style.display = "none"
                Doctor.style.display = "block";
                role.textContent = "Doctor";
                fName.textContent = userData.fullName
                return
                }
            if (userData.role == "Patient" ) {
                Patient.style.display = "block";
                role.textContent = "Doctor";
                return
                }}

})}
      
        catch (error) {
            console.log(error.code);
        }
        finally{
            // Signout from the web
            logOut.addEventListener("click", async () => {
              signOut(auth);
              window.location.href = "../src/Login.html"
            })
        
            // Other side Menu buttons
            Overview.addEventListener("click", () => {
                window.location.href = "../src/Overview.html"
            })
            
            Appointments.addEventListener("click", () => {
            })
            Doctors.addEventListener("click", () => {
                window.location.href = "#"
            })
            History.addEventListener("click", () => {
              window.location.href = "../src/History.html"
            })
            Settings.addEventListener("click", () => {
              window.location.href = "../src/Settings.html"
            })
        }