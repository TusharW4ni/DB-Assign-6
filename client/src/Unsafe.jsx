import { useState, useEffect } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Unsafe() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState([]);
  const [changePass, setChangePass] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const loginSubmit = () => async (e) => {
    e.preventDefault();
    console.log("username", username);
    console.log("password", password);
    try {
      const res = await axios.post("http://localhost:7070/unsafe/login", {
        username,
        password,
      });
      console.log("res", res.data);
      setRes(res.data);
      if (res.data.length === 0) {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error in POST /unsafe/login", error);
    }
    setUsername("");
    setPassword("");
  };

  const updatePass = () => async (e) => {
    e.preventDefault();
    console.log("username", username);
    console.log("oldpass", oldPass);
    console.log("newpass", newPass);
    try {
      const res = await axios.post("http://localhost:7070/unsafe/update", {
        username,
        oldpass: oldPass,
        newpass: newPass,
      });
      console.log("res", res.data);
      if (res.data.affectedRows === 0) {
        toast.error("Invalid Credentials");
      } else {
        toast.success("Password Updated");
      }
    } catch (error) {
      console.error("Error in POST /unsafe/update", error);
    }
  };

  const closeResults = () => () => {
    setRes([]);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-900 text-white space-x-10">
      <ToastContainer />
      {!changePass ? (
        <form className="flex flex-col" onSubmit={loginSubmit()}>
          <label htmlFor="username" className="text-xl">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black outline-none rounded border-2 hover:border-blue-300 focus:border-blue-700 focus:bg-blue-100 p-2 mb-10"
          />
          <label htmlFor="password" className="text-xl">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            className="text-black outline-none rounded border-2 hover:border-blue-300 focus:border-blue-700 focus:bg-blue-100 p-2 mb-10"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
      ) : (
        <form className="flex flex-col" onSubmit={updatePass()}>
          <label htmlFor="username" className="text-xl">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black outline-none rounded border-2 hover:border-blue-300 focus:border-blue-700 focus:bg-blue-100 p-2 mb-10"
          />
          <label htmlFor="oldpass" className="text-xl">
            Old Password
          </label>
          <input
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            id="oldpass"
            type="password"
            className="text-black outline-none rounded border-2 hover:border-blue-300 focus:border-blue-700 focus:bg-blue-100 p-2 mb-10"
          />
          <label htmlFor="newpass" className="text-xl">
            New Password
          </label>
          <input
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            id="newpass"
            type="password"
            className="text-black outline-none rounded border-2 hover:border-blue-300 focus:border-blue-700 focus:bg-blue-100 p-2 mb-10"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Update
          </button>
        </form>
      )}
      {res.length > 0 && !changePass && (
        <div className="flex flex-col border-2 bg-gray-100 p-2 text-black rounded h-1/2 w-1/3 space-y-1 overflow-auto">
          <div className="w-full flex justify-end">
            <button
              className="rounded p-2 border border-gray-300 hover:border-gray-900 hover:bg-gray-100 text-gray-300 hover:text-gray-900 cursor-pointer"
              onClick={closeResults()}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          {res.map((row) => (
            <div
              key={row.ssn}
              className="flex justify-center items-center bg-gray-300 w-full h-full rounded"
            >
              <div>
                <p className="font-bold">Username</p>
                <p>{row.username}</p>
                <p className="font-bold">Password</p>
                <p>{row.password}</p>
                <p className="font-bold">SSN</p>
                <p>{row.ssn}</p>
                <p className="font-bold">Salary</p>
                <p>{row.salary}</p>
                <button
                  className="border p-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                  onClick={() => {
                    setChangePass(true);
                    setUsername(row.username);
                  }}
                >
                  Change Password
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
