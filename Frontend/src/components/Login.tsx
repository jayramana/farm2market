import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFtm } from "../store/useFtm";

const Login = () => {
  const Navigate = useNavigate()
  const { id, setUser } = useFtm();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [errmsg, setErrmsg] = useState<string>("");

  const [nameErr, setNameErr] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passErr, setPassErr] = useState<boolean>(false);
  const [formErr, setFormerr] = useState<boolean>(false);

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const pwdRegex2 =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  useEffect(() => {
    const validation = () => {
      if (name.length > 0 && name.length < 3) setNameErr(true);
      else setNameErr(false);

      if (email.length > 1 && !emailRegex.test(email)) setEmailErr(true);
      else setEmailErr(false);

      if (pass.length > 0 && !pwdRegex2.test(pass)) setPassErr(true);
      else setPassErr(false);
    };
    validation();
  }, [name, email, pass]);

  const logSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (nameErr || emailErr || passErr || name.length === 0 || email.length <= 1 || pass.length === 0) {
        setFormerr(true);
        throw new Error("All fields must be filled");
      }
      const loginCheck = await axios.post("http://localhost:3000/api/f2m/user/check", { user_name: name, user_email: email, user_enpass: pass });
      if (loginCheck.data.success) {
        setUser(loginCheck.data.data.user_id);
        Navigate("/home");
      }
    } catch (err : any) {
      console.log(err.message);
    }
  };

  return (
    <main className="h-screen px-12 py-4">
      <form
        className="bg-gray-200 flex flex-col gap-4"
        onSubmit={(e) => logSubmit(e)}
      >
        <div className="flex gap-4">
          <label htmlFor="">Name</label>
          <div className="flex-col">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-solid border-black rounded-md "
            />
            <div>
              {nameErr ? <p className="text-red-600">Name Error</p> : null}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <label htmlFor="">Email</label>
          <div className="flex-col">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-solid border-black rounded-md "
            />
            {emailErr ? <p className="text-red-600">Email Error</p> : null}
          </div>
        </div>
        <div className="flex gap-4">
          <label htmlFor="">Password</label>
          <div className="flex-col">
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="border-2 border-solid border-black rounded-md "
            />
            {passErr ? <p className="text-red-600">Password Error</p> : null}
          </div>
        </div>
        {formErr ? (
          <p className="text-red-500">All fields must be filled</p>
        ) : null}
        <button type="submit" className="self-start">
          Submit
        </button>
      </form>
      <p>
        New Here ?{" "}
        <span className="underline hover:cursor-pointer" onClick={()=>Navigate("/register")}>Register</span> to
        access F2M
      </p>
    </main>
  );
};

export default Login;
