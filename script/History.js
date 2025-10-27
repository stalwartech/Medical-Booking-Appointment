import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  import {getFirestore, doc, getDoc, updateDoc, collection, getDocs, query, where} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
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
  if (!user) return;
  const uid = user.uid;

  const userDoc = doc(DB, "users", uid);
  const docSnap = await getDoc(userDoc);
  const userData = docSnap.data();

  console.log("Logged-in user data:", userData);

  const appointmentsRef = collection(DB, "appointments");
  let q;

  // Determine user type and query appointments
  if (userData.role === "Doctor") {
    q = query(appointmentsRef, where("doctorId", "==", uid));
    role.textContent = "Doctor";
    fName.textContent = userData.fullName;
  } else if (userData.role === "Patient") {
    q = query(appointmentsRef, where("patientId", "==", uid));
    role.textContent = "Patient";
    fName.textContent = userData.fullName;
  } else {
    console.log("Unknown role:", userData.role);
    return;
  }

  // Fetch and display history
  const querySnapshot = await getDocs(q);
  const tableBody = document.getElementById("historyTable");

  if (!tableBody) {
    console.error("Missing table body element with id='historyTable'");
    return;
  }

  if (querySnapshot.empty) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-5 text-gray-500">No appointment history found.</td>
      </tr>`;
  } else {
    tableBody.innerHTML = ""; // Clear before inserting

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      console.log(data);
      
      const statusColor =
        data.status === "Approved"
          ? "bg-green-100 text-green-700"
          : data.status === "Rejected"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700";

      tableBody.innerHTML += `
        <tr class="hover:bg-gray-50 transition">
        <td class="px-4 py-2">${data.patientName || "-"}</td>
        <td class="px-4 py-2">${data.date || "-"}</td>
        <td class="px-4 py-2">${data.timeFrom || "-"}</td>
          <td class="px-4 py-2">${data.timeTo || "-"}</td>
          <td class="px-4 py-2">
            <span class="px-3 py-1 rounded-full text-sm font-semibold ${statusColor}">
              ${data.status || "Pending"}
            </span>
          </td>
          <td class="px-4 py-2">${data.reason || "-"}</td>
        </tr>`;
    });
  }
});
}
      
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
                window.location.href = "../src/Appointments.html"
            })
            Doctors.addEventListener("click", () => {
              window.location.href = "../src/Doctors.html"
            })
            History.addEventListener("click", () => {
              window.location.href = "#"
            })
            Settings.addEventListener("click", () => {
              window.location.href = "../src/Settings.html"
            })
        }