import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot, getDocs,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc
} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAc8CBr-vh3p1mxgjIZcW47E_l8ii0RzAY",
  authDomain: "fir-9-testing-bd688.firebaseapp.com",
  projectId: "fir-9-testing-bd688",
  storageBucket: "fir-9-testing-bd688.appspot.com",
  messagingSenderId: "900880574997",
  appId: "1:900880574997:web:07ac4dc99f5bd75aa2fc1c",
  measurementId: "G-XESZBNQ878"
};

initializeApp(firebaseConfig)
const db = getFirestore()
const colRef = collection(db, 'users')

//queries
const q = query(colRef, orderBy('createdAt'))

//real tiem collection data


const number = document.querySelector('h2')
const teller = document.querySelector('.teller')

onSnapshot(colRef, (snapshot) => {
  let users = []
  snapshot.docs.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id })
  })
  console.log(users)
  users.forEach((item) => {
    if(item.number){
      number.innerHTML=item.number
    }
  })
})

//adding docs
const registerForm = document.querySelector('.register')
console.log(registerForm)
registerForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    username: registerForm.username.value,
    password: registerForm.password.value,
  })
    .then(() => {
      console.log(registerForm.username.value)
      registerForm.reset()
    })
})
const formWrapper = document.querySelector('.form-wrapper')
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  getDocs(colRef).then((snapshot) => {
    let users = []
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id })
    })
    users.forEach((item) => {
      if (item.username == loginForm.username.value && item.password === loginForm.password.value) {
        console.log('succes');
        formWrapper.classList.add('d-none');
        teller.classList.remove('d-none');
      }
    })
  })
})

const plusMinus =document.querySelector('.plusMinus')

plusMinus.addEventListener('click',(e)=>{
  const docRef = doc(db, 'users', 'numberid')
  
  //plus
  if(e.target.innerHTML=='UP'){
    updateDoc(docRef,{
      number: parseInt(number.innerHTML)+1
    })
  }

  if(e.target.innerHTML=='DOWN'){
    updateDoc(docRef,{
      number: parseInt(number.innerHTML)-1
    })
  }
})
console.log(number.innerHTML)
