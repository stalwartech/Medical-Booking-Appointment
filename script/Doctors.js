import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  import {getFirestore, doc, getDoc, getDocs, updateDoc, collection} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
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
  const drCard = document.getElementById("drCard")
  const modal = document.getElementById("doctorModal");
  const close = document.getElementById("close");


  // Doctors info in the modal
  const drName = document.getElementById("drName");
  const drSpec = document.getElementById("drSpec");
  const drFee = document.getElementById("drFee");
  const drBio = document.getElementById("drBio");
  const drDetails = document.getElementById("drDetails");


//   Side Menu Button 
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
        const docSnap = await getDoc(userDoc);
        const docsSnap = await getDocs(userColRef)
        const userData = docSnap.data()
        // console.log(userData);
        
        docsSnap.forEach(drRole => {
          const user = { id: drRole.id, ...drRole.data() };
          const userID = drRole.id
          console.log(userID);
          
          if (user.role == "Doctor"){
            console.log(user);
            const name = user.fullName.split(" ");
           drCard.innerHTML += `
                      <div class="bg-gray-50 w-60 rounded-xl shadow-md hover:shadow-lg transition py-10 text-center mx-4">
                        <div class="flex">
                          <img src="https://cdn.pixabay.com/photo/2024/09/03/15/21/ai-generated-9019520_640.png" 
                              alt="Doctor" 
                              class="w-24 h-27 mx-auto rounded-2xl object-cover mb-3">
                          <div class="flex flex-col gap-2 pr-2">
                            <h3 class="font-semibold text-gray-800 flex justify-center items-center gap-2 mb-2">${name[0]} ${name[1]}</h3>
                            <p class="text-sm text-gray-500 mb-2 flex justify-center items-center gap-2">
                              <span class="material-symbols-outlined">stethoscope</span>${user.Specialty}
                            </p>
                            <p class="text-sm text-gray-500 mb-3 flex justify-center items-center gap-2">
                              <span class="material-symbols-outlined">loyalty</span>#${user.ConsultFee} / hr
                            </p>
                          </div>
                        </div>
                        <div class="flex gap-2 justify-center">
                          <button data-uid="${userID}" class="bookDoctor bg-blue-600 w-full text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition">Book</button>
                          <button data-uid="${userID}" class="drDetails bg-blue-200 w-full text-blue-500 text-sm px-4 py-2 rounded-lg hover:bg-blue-300 transition"> Details </button>
                        </div>
                      </div>`;                 
                    
                    
                    }});
                                // Handle Book button click
                  document.querySelectorAll(".bookDoctor").forEach((btn) => {
                    btn.addEventListener("click", (e) => {
                      const drId = e.currentTarget.dataset.uid;
                      // Save the selected doctor ID to localStorage
                      console.log(drId);
                      
                      localStorage.setItem("selectedDoctorId", drId);
                      // Redirect to the appointment page
                      window.location.href = "../src/Appointments.html";
                    });
                  });

                    
                    }

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

document.addEventListener("click", (e) => { if (e.target.classList.contains("drDetails")) { const uid = e.target.dataset.uid; getDetails(uid); } });



// Working with modal for  viewing the profile of  the doctor

  function openModal() {
    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
  }

close.addEventListener("click", () => {
  closeModal()
  })

async function getDetails(uid) {
  try {
    const doctorRef = doc(DB, "users", uid);
    const doctorSnap = await getDoc(doctorRef);

    if (doctorSnap.exists()) {
      const doctor = doctorSnap.data();

      // Populate modal fields
      drName.textContent = doctor.fullName || "No name";
      drSpec.textContent = doctor.Specialty || "No specialty";
      drFee.textContent = `₦${doctor.ConsultFee || "0"} Consultation Fee`;
      drBio.textContent = doctor.DoctorBio || "No bio available";

      openModal();
    } else {
      console.log("No such doctor!");
    }
  } catch (err) {
    console.error("Error fetching doctor details:", err);
  }
}




  // Close when clicking outside modal content
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });































































































































// Load doctors dynamically
// async function loadDoctors() {
//   try {
//     const querySnapshot = await getDocs(collection(DB, "users"));
//     doctorsContainer.innerHTML = ""; // Clear old content

//     querySnapshot.forEach((docSnap) => {
//       const data = docSnap.data();
//       if (data.role === "Doctor") {
//         const card = document.createElement("div");
//         card.className = "bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition p-4 text-center";

//         card.innerHTML = `
//           <img src="${data.photoURL || '../Images/Logo-removebg-preview.png'}"   alt="${data.fullName}"       class="w-24 h-24 mx-auto rounded-full object-cover mb-3">
//           <h3 class="text-lg font-semibold text-gray-800">${data.fullName}</h3>
//           <p class="text-sm text-gray-500 mb-3">${data.specialization || "General Practitioner"}</p>
//           <button data-id="${docSnap.id}" data-name="${data.fullName}"  class="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"> View Profile </button>
//         `;

//         doctorsContainer.appendChild(card);
//       }
//     });

//     // Add click event to each "View Profile" button
//     document.querySelectorAll("button[data-id]").forEach((btn) => {
//       btn.addEventListener("click", (e) => {
//         const drName = e.target.dataset.name;
//         const drId = e.target.dataset.id;

//         // Store doctor info in session storage for appointment page
//         sessionStorage.setItem("selectedDoctorName", drName);
//         sessionStorage.setItem("selectedDoctorId", drId);

//         // Redirect to appointment form page
//         window.location.href = "../Pages/Appointment.html";
//       });
//     });
//   } catch (error) {
//     console.error("Error loading doctors:", error);
//   }

// }

// loadDoctors();









