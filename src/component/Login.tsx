import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Logintypes } from "../types/LoginTypes";
import * as yup from "yup";
import { Link,Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { json } from "stream/consumers";
import { stringify } from "querystring";
interface loginPageProps{
  isAuthenticated:boolean,
  setIsAuthenticated:(isAuthenticated:boolean) => void
}
const Login = ({isAuthenticated,setIsAuthenticated}:loginPageProps) => {
  const history=useHistory()
  const formik = useFormik<Logintypes>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      //   console.log(values);
      const postResponse = await axios.post(
        "http://localhost:4000/user/Login",
        values
      );
      console.log("post response", postResponse);
      if (
        postResponse.data.httpstatus !== 200 ||
        postResponse.data.status !== "success"
      ) {
        return alert("Invalid Login");
      }
      localStorage.setItem("login", postResponse.data);
      localStorage.setItem("token", postResponse.data.auth);
      
      // await new Promise<void>((resolve) => {
        setIsAuthenticated(true); // Update state
      //   resolve();
      // });
      console.log( "submit value isauthenticate",isAuthenticated)
    
    },
    validationSchema: yup.object({
      email: yup.string().required("Email Is Required").email("Invalid Email"),
      password: yup.string().required("Password Is Required"),
    }),
  });
  useEffect(()=>{
    if(isAuthenticated){
      console.log("hook value ",isAuthenticated)
      return  history.push("/home")
    //  return  <Redirect to="/Home" />
     }
    
  },[isAuthenticated])
  return (
    
    <div className="flex items-center justify-center">
      <div className="block max-w-xl rounded-lg  bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="relative mb-6">
              <input
                type="email"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Please Enter Name
              </label>
              {/* Error message */}
              {formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Please Enter Email
              </label>
              {formik.touched.password && formik.errors.password ? (
                <span className="text-red-600">{formik.errors.password}</span>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-center my-3">
            <button
              type="submit"
              className=" text-center bg-pink-500 rounded w-full py-3 px-6 uppercase transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            
            >
              SignIn
            </button>
          </div>
          <div className="flex items-center justify-center">
            <p>
              DoNot Have Account?
              <Link to="/" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
