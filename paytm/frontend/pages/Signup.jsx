/* eslint-disable react/prop-types */

import { BottomWarning } from "../components/BottomWarning.jsx";
import { Button } from "../components/Button.jsx";
import { Heading } from "../components/Heading.jsx";
import { InputBox } from "../components/InputBox.jsx";
import { SubHeading } from "../components/SubHeading.jsx";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


/*
There are some more components to be added like after transfering converting the send amount component to transfer successfull component using Tailwind CSS
Add a Loading component for each page dashboard, signin, signup

When we signin add a navigate hook to dashboard page component using navigate().
*/

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const jsonData = {
    userName,
    firstName,
    secondName,
    password,
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setSecondName(e.target.value);
            }}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                console.log("Sending Data: ", jsonData);

                const response = await axios.post(
                  "http://localhost:3300/api/v1/user/signup",
                  JSON.stringify(jsonData),
                  {
                    withCredentials: true,
                    headers: {
                      "Content-Type": "application/json",
                      // "Content-Length": JSON.stringify(jsonData).length,
                    },
                  }
                );
                const token = response.data.token;
                console.log("Getting from backendtoken is: ", token);
                localStorage.setItem("token", token);
                navigate("/dashboard");
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
