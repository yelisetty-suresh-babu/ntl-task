import "./App.css";
import logo from "./random-logo.jpg";
import React, { useState } from "react";
// import Items from "./components/items";
import Product from "./components/product";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Modal, Box, Input, Button } from "@mui/material";

const firebaseConfig = {
  apiKey: "AIzaSyCaRjdCFq3P7FWPajqb7A3Xeuht7XsRYLE",
  authDomain: "task-70561.firebaseapp.com",
  projectId: "task-70561",
  storageBucket: "task-70561.appspot.com",
  messagingSenderId: "694053732199",
  appId: "1:694053732199:web:239d72d4c640783e91f9c2",
  measurementId: "G-4B4664PPPT",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

function App() {
  const [show, setShow] = useState(true);
  let [text, setText] = useState("");
  let [option, setOption] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [opensignIn, setopensignIn] = useState(false);
  const [signIned, setSigned] = useState(false);
  const handleClose = (e) => {
    // window.Modal.close()
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.temp_val.value === "") {
      setOption([]);
    } else {
      let temp = [];
      let n = Math.floor(Math.random() * 10);
      n += 6;
      for (let i = 1; i <= n; i++) {
        let url = `https://source.unsplash.com/random/${i * 100}x700/?${text}`;
        temp.push(<Product key={i} name={url} />);
      }
      // console.log(e.target.temp_val.value);
      setOption(temp);
    }
  };

  const signUp = (e) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        setShow(false);
        setSigned(true);

        setOpen(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.displayName);
        setUsername(user.displayName);
        setShow(false);
        setopensignIn(false);
        setSigned(true);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg outline-none  object-contain ">
          <form action="" className="flex flex-col items-center gap-y-4">
            <center>
              <img src={logo} className="h-8 object-contain" alt="" />
            </center>
            <Input
              placeholder="Username"
              type="text"
              value={username}
              className="w-full"
              onChange={(e) => setUsername(e.target.value)}
              name="username"
            />
            <Input
              className="w-full"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <Input
              placeholder="Password"
              type="password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="pass"
            />
            {/* <Button onClick={()=>{}}>Sign Up</Button> */}
            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={opensignIn}
        onClose={() => {
          setopensignIn(false);
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg outline-none  object-contain ">
          <form action="" className="flex flex-col items-center gap-y-4">
            <center>
              <img src={logo} className="h-12 object-contain" alt="" />
            </center>

            <Input
              className="w-full"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
            {/* <Button onClick={()=>{setShow(false)}}>Sign In</Button> */}
          </form>
        </Box>
      </Modal>

      {show ? (
        <div className="flex justify-center mt-[10%]">
          <div className=" bg-white w-[500px] h-[500px] rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-[10px]">
            <img src={logo} className="w-[350px] h-72" alt="temp text" />
            <button
              className="bg-blue-500 rounded-md h-7 text-white w-[100px] "
              onClick={() => setopensignIn(true)}
            >
              login
            </button>
            <hr />
            <button
              className="bg-blue-500 rounded-md h-7 text-white w-[100px]"
              onClick={() => setOpen(true)}
            >
              sign up
            </button>
          </div>
        </div>
      ) : null}

      {show ? null : (
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b-2 rounded-lg shadow-md">
            <img src={logo} className="w-32" alt="" />

            <div className="flex items-center gap-x-2">
              {signIned ? (
                <p className="font-bold text-xl mr-4">{username}</p>
              ) : null}
              <button
                className="bg-blue-600 rounded-md h-8 text-white w-[80px] mr-10"
                onClick={() => {
                  setShow(true);
                  setText("");
                }}
              >
                log out
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center m-10 gap-x-2"
          >
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="shadow-lg w-1/2 p-3 pl-5 text-lg rounded-lg "
              placeholder="   🔍  Enter the text"
              name="temp_val"
            />
          </form>
          <div className="grid grid-cols-4">{option.map((ele) => ele)}</div>
        </div>
      )}
    </div>
  );
}

export default App;

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCaRjdCFq3P7FWPajqb7A3Xeuht7XsRYLE",
//   authDomain: "task-70561.firebaseapp.com",
//   projectId: "task-70561",
//   storageBucket: "task-70561.appspot.com",
//   messagingSenderId: "694053732199",
//   appId: "1:694053732199:web:239d72d4c640783e91f9c2",
//   measurementId: "G-4B4664PPPT"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
