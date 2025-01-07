import axios from "axios";
import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Toaster, toast } from "sonner";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isDisabled, setIdDisabled] = useState(false);
  const [isAlertOn, setIsAlertOn] = useState(false);
  const [otp, setOtp] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOpen();

    const data = {
      email: email,
      password: password,
      name: username,
    };

    axios
      .post(import.meta.env.VITE_SERVER_URL + "/auth/register", data)
      .then((rsp) => {
        handleClose();
        setIdDisabled(true);
        toast.success("Registration success");
        setIsAlertOn(true);
      })
      .catch((e) => {
        toast.error("Already registered Email !");
        handleClose();
        setIsAlertOn(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster richColors position="top-center" />
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-md w-[450px]"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="username"
            disabled={isDisabled}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="email@.com"
            disabled={isDisabled}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*******"
            value={password}
            disabled={isDisabled}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md ${
            isDisabled == false ? "hover:bg-blue-600" : "bg-gray-400"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        >
          Sign In
        </button>

        {isAlertOn == true ? (
          <div className="mt-3">
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              {`OTP has been sent to ${email}.  `}
            </Alert>
          </div>
        ) : (
          ""
        )}

        {isAlertOn == true ? (
          <div className="grid grid-cols-3 mt-7  items-center gap-3">
            <div>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                placeholder="OTP"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            { otp!=""?
              <div>
                <button
                  type="submit"
                  disabled={isDisabled}
                  className="w-full bg-green-400 text-white py-2 px-4 rounded-md hover:bg-green-500
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Verify OTP
                </button>
              </div>:""
            }
            <div>
              <button
                type="submit"
                disabled={isDisabled}
                className="w-full bg-green-400 text-white py-2 px-4 rounded-md hover:bg-green-500
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Resend OTP
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
