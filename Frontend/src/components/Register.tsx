import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [num, setNum] = useState<string>("");
  const [loc, setLoc] = useState<string>("");
  // const [errmsg, setErrmsg] = useState<string>("");

  const [nameErr, setNameErr] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passErr, setPassErr] = useState<boolean>(false);
  const [phoneErr, setPhoneerr] = useState<boolean>(false);
  const [formErr, setFormerr] = useState<boolean>(false);

  const Navigate = useNavigate()

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const pwdRegex2 =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const mobileRegex = /^[789]\d{9}$/;


  useEffect(() => {
    const validation = () => {
      if (name.length > 0 && name.length < 3) setNameErr(true);
      else setNameErr(false);

      if (email.length > 1 && !emailRegex.test(email)) setEmailErr(true);
      else setEmailErr(false);

      if (pass.length > 0 && !pwdRegex2.test(pass)) setPassErr(true);
      else setPassErr(false);

      if (num.length > 0 && !mobileRegex.test(num)) setPhoneerr(true);
      else setPhoneerr(false);
    };
    validation();
  }, [name, email, pass,num]);

  const logSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (
        nameErr ||
        emailErr ||
        passErr ||
        phoneErr ||
        name.length === 0 ||
        email.length <= 1 ||
        pass.length === 0
      ) {
        setFormerr(true);
        throw new Error("All fields must be filled");
      }
      const str_to_numb = parseInt(num);
      const new_User = await axios.post("http://localhost:3000/api/f2m/user/create", { user_name: name, user_email: email, user_enpass: pass, user_role: role, user_phone: str_to_numb, user_loc : loc })
      console.log(new_User);
      console.log(name, email, pass, role, num, loc);
      Navigate("/login");
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
        <div className="flex gap-4">
          <label htmlFor="">Role</label>
          <select name="" id="" onChange={(e) => setRole(e.target.value)}>
            <option value=""></option>
            <option value="farmer">Farmer</option>
            <option value="consumer">Consumer</option>
            <option value="retailer">Retailer</option>
          </select>
        </div>
        <div className="flex gap-4">
          <label htmlFor="">Phone No.</label>
          <div className="flex-col">
            <input
              type="number"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              className="border-2 border-solid border-black rounded-md "
            />
            {phoneErr ? <p className="text-red-600">Phone Error</p> : null}
          </div>
        </div>
        <div className="flex gap-4">
          <label htmlFor="">Location</label>
          <div className="flex-col">
            <input
              type="text"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              className="border-2 border-solid border-black rounded-md "
            />
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
        Already have an Account ?{" "}
        <span className="underline hover:cursor-pointer">Login</span> to
        regain access
      </p>
    </main>
  );
};

export default Register;
