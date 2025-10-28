import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  import {getFirestore, doc, getDoc, addDoc, collection, serverTimestamp, query, where, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
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

  // Get the doctor ID from localStorage
const selectedDoctorId = localStorage.getItem("selectedDoctorId");

if (selectedDoctorId) {
  // Fetch the doctor info from Firestore
  const doctorRef = doc(DB, "users", selectedDoctorId);
  const doctorSnap = await getDoc(doctorRef);

  if (doctorSnap.exists()) {
    const doctorData = doctorSnap.data();

    // Create a section above the form to display doctor info
    const patientMain = document.getElementById("Patient");
    const doctorInfoDiv = document.createElement("div");
    doctorInfoDiv.className = "bg-blue-50 border border-blue-300 rounded-xl p-4 mb-6";
    doctorInfoDiv.innerHTML = `
      <div class="flex items-center gap-4">
        <img src="https://cdn.pixabay.com/photo/2024/09/03/15/21/ai-generated-9019520_640.png" class="w-20 h-20 rounded-xl object-cover">
        <div>
          <h3 class="text-xl font-semibold text-gray-800">${doctorData.fullName}</h3>
          <p class="text-gray-600">${doctorData.Specialty}</p>
          <p class="text-blue-600 font-medium">₦${doctorData.ConsultFee} / hr</p>
        </div>
      </div>
    `;
    patientMain.prepend(doctorInfoDiv);
    localStorage.removeItem("selectedDoctorId");
  } else {
    console.log("Doctor not found");
  }
}


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
  Appointments.classList.add("bg-blue-900", "p-3", "rounded-2xl", "text-white")
  const Doctors = document.getElementById("Doctors")
  const History = document.getElementById("History")
  const Settings = document.getElementById("Settings")

// Appointmenform 
const PatName = document.getElementById("PatName")
const PatMail = document.getElementById("PatMail")
const PatDOB = document.getElementById("PatDOB")
const appointDate = document.getElementById("appointDate");
const timeFrom = document.getElementById("timeFrom");
const timeTo = document.getElementById("timeTo");
const appointReason = document.getElementById("appointReason");
const createAppointmentBtn = document.getElementById("createAppointment");



onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const uid = user.uid;
  const userRef = doc(DB, "users", uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  if (!userData) return;

  fName.textContent = userData.fullName;
  role.textContent = userData.role;

  // If patient, show appointment form
  if (userData.role === "Patient") {
    Patient.style.display = "block";
    Appointments.style.display = "none"
    PatName.value = `${userData.FirstName} ${userData.LastName}`;
    PatMail.value = userData.Email;
    PatDOB.value = userData.DOB;

    // Create Appointment
    createAppointmentBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const appointment = {
        patientId: uid,
        doctorId: selectedDoctorId,
        date: appointDate.value,
        timeFrom: timeFrom.value,
        timeTo: timeTo.value,
        reason: appointReason.value,
        status: "pending",
        createdAt: serverTimestamp()
      };

      try {
        await addDoc(collection(DB, "appointments"), appointment);
        alert("Appointment request sent!");
        // Optionally redirect or clear form
        appointDate.value = "";
        timeFrom.value = "";
        timeTo.value = "";
        appointReason.value = "";
        window.location.href = "../src/History.html"
      } catch (err) {
        console.error("Error creating appointment:", err);
      }
    });
  }

  // If doctor, show appointments table
  if (userData.role === "Doctor") {
    Doctor.style.display = "block";
    Doctors.style.display = "none";
    const appointTable = Doctor.querySelector("tbody");
    appointTable.innerHTML = ""; // clear existing rows

    // Listen in real-time for appointments belonging to this doctor
    const q = query(collection(DB, "appointments"), where("doctorId", "==", uid));
    onSnapshot(q, async (snapshot) => {
      appointTable.innerHTML = "";
      snapshot.forEach(async (docSnap) => {
        const appt = docSnap.data();
        const patRef = doc(DB, "users", appt.patientId);
        const patSnap = await getDoc(patRef);
        const patData = patSnap.data();
        console.log(patData);
        

        const row = `
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 flex items-center gap-3">
              <img src="https://i.pravatar.cc/40?img=8" class="w-10 h-10 rounded-full" alt="">
              <div>
                <p class="font-semibold">${patData?.LastName || "Unknown"}</p>
                <p class="text-sm text-gray-500">${patData?.Email || ""}</p>
              </div>
            </td>
            <td class="px-2 py-4">${appt.date}</td>
            <td class="px-4 w-35">${appt.timeFrom}</td>
            <td class="px-4 w-35">${appt.timeTo}</td>
            <td class="px-2 py-4">${appt.reason}</td>
            <td class="px-6 py-4 text-center">
              <span class="px-3 py-1 rounded-full text-sm font-medium ${
                appt.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                appt.status === "approved" ? "bg-green-100 text-green-700" :
                "bg-red-100 text-red-700"
              }">${appt.status}</span>
            </td>
            <td class="px-6 py-4 text-center space-x-2">
              <button data-id="${docSnap.id}" class="approve bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium">Approve</button>
              <button data-id="${docSnap.id}" class="reject bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium">Reject</button>
            </td>
          </tr>
        `;
        appointTable.insertAdjacentHTML("beforeend", row);
      });
    });

    // Listen for approval/rejection
    document.addEventListener("click", async (e) => {
      if (e.target.classList.contains("approve") || e.target.classList.contains("reject")) {
        const id = e.target.dataset.id;
        const newStatus = e.target.classList.contains("approve") ? "approved" : "rejected";
        await updateDoc(doc(DB, "appointments", id), { status: newStatus });
      }
    });
  }
});

      
// 🔚 Sidebar Navigation
logOut.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "../src/Login.html";
});
Overview.addEventListener("click", () => (window.location.href = "../src/Overview.html"));
Appointments.addEventListener("click", () => (window.location.href = "#"));
Doctors.addEventListener("click", () => (window.location.href = "../src/Doctors.html"));
History.addEventListener("click", () => (window.location.href = "../src/History.html"));
Settings.addEventListener("click", () => (window.location.href = "../src/Settings.html"));