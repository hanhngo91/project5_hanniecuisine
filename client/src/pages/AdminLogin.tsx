import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import axios from "axios";
import { setCookie } from "typescript-cookie";

function AdminLogin() {
  const [loginForm, setLoginForm] = useState({
    adminEmail: "",
    adminPassword: "",
  });

  const navigate = useNavigate();

  //Handle change input:
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  //Submit form:
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginForm.adminEmail === "" || loginForm.adminPassword === "") {
      return notification.error({
        message: "Please fill in all fields!",
      });
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/login",
        loginForm
      );
      if (response.data.message === "Email is incorrect!") {
        return notification.error({
          message: "Email is incorrect!",
        });
      } else if (response.data.message === "Password is incorrect!") {
        return notification.error({
          message: "Password is incorrect!",
        });
      } else {
        notification.success({
          message: "Welcome admin!",
        });
        setCookie("adminToken", response.data.token, {
          expires: 60 * 24, //1 day
        });
        navigate("/admin/home");
      }
    } catch (error: any) {
      console.log("Error when login to admin page-->", error);
      if (error.response.data.message == "adminEmail must be an email") {
        return notification.error({
          message: "Please enter valid email!",
        });
      }
    }
  };

  return (
    <div className="bg-[#121219] w-full h-[100vh] text-white">
      <div className="py-[1rem] px-[2rem]">
        <Link to="/">
          <img className="w-[25rem]" src="/logos/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-[2rem] mt-[3rem] text-3xl font-pacifico">Admin</div>
        <form onSubmit={handleSubmitForm}>
          <div className="mb-[2rem]">
            <input
              className="bg-[#202027] py-3 px-5 text-xl w-[20rem] outline-none rounded-full"
              type="text"
              placeholder="Email"
              name="adminEmail"
              onChange={handleChange}
            />
          </div>
          <div className="mb-[2rem]">
            <input
              className="bg-[#202027] py-3 px-5 text-xl w-[20rem] outline-none rounded-full"
              type="password"
              placeholder="Password"
              name="adminPassword"
              onChange={handleChange}
            />
          </div>
          <div className="mb-[2rem] flex justify-center items-center">
            <button className="admin-btn text-xl border-2 py-3 px-5 w-[20rem] border-[#202027] rounded-full font-gelasio">
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
