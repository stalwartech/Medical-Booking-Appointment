  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  import {getFirestore, setDoc, updateDoc, doc} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
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
  let Occupation = document.getElementById("Occupation");

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const DB = getFirestore(app);
  

  let createUser = async () => {
      if(!mailInp.value){
          notifyPara.innerHTML = "Enter a correct mail";
        return
    }
    if(!passInp.value){
        notifyPara.innerHTML = "Enter password";
        return
    }
    if (Occupation.value == "Default") {
        notifyPara.innerHTML = "Select a role";
        return
    }

    try {
        const userDetails =  await createUserWithEmailAndPassword(auth, mailInp.value, passInp.value);  
        const userUid = userDetails.user;
        const register = await setDoc(doc(DB, "users", userUid.uid), {"role":Occupation.value})
        console.log(Occupation.value);
        signupBtn.disabled = true;

        if (Occupation.value == "Patient") {
            window.location.href = "../src/PatientForm.html"
            return
        }
        if (Occupation.value == "Doctor") {
            window.location.href = "../src/DoctorForm.html"
            return
        }
        console.log(userUid);

    } 
    catch (error) {
        console.log(error);
    }
}

signupBtn.addEventListener("click", () => {
    createUser();
})


