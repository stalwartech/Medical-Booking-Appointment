  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  import {getFirestore, doc, setDoc, updateDoc} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
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

    // Getting all document by ID 
    let doctorForm  = document.getElementById("doctorForm");
    let drName = document.getElementById("drName");
    let drMail = document.getElementById("drMail");
    let gender = document.getElementById("gender");
    let specialty = document.getElementById("specialty");
    let LicID = document.getElementById("LicID");
    let Experience = document.getElementById("Experience");
    let Fee = document.getElementById("Fee");
    let hospitalName = document.getElementById("hospitalName");
    let hospitalAdd = document.getElementById("hospitalAdd");
    let drBio = document.getElementById("drBio");
    let regBtn = document.getElementById("regBtn");


    doctorForm.addEventListener("click", (e) => {
        e.preventDefault()
    })

    regBtn.addEventListener("click", () => {
        const profile = {
            fullName: `Dr. ${drName.value}`,
            Email: drMail.value,
            Gender: gender.value,
            Specialty: specialty.value,
            LicenseID: LicID.value,
            Experience: Experience.value,
            ConsultFee: Fee.value,
            HospitalName: hospitalName.value,
            HospitalAddress: hospitalAdd.value,
            DoctorBio: drBio.value,
            DateCreated: `${new Date().getDay()} / ${new Date().getMonth()} / ${new Date().getFullYear()}`
        }
        onAuthStateChanged(auth, async (user) => {
            if(user){
                const uid = user.uid;
                console.log(uid);

            try {
                await updateDoc(doc(DB, "users", uid), profile);
                regBtn.disabled = true;
                window.location.href = "../src/Overview.html"
            } catch (error) {
                console.log(error.code);
            }
            }

        })
    })
