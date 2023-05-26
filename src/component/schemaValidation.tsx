import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { schemaFormTypes } from "../types/schemaValidation";
import { Link } from "react-router-dom";
const SchemaValidation = () => {
  const formIk = useFormik<schemaFormTypes>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: null,
      date: null,
      fileUpload: null,
      selectProgramming: "",
      gender: "",
      languageCheckbox: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .max(30, "Must be greater than two characters")

        .required("Name is required")
        .test("is-string", "Name must be a string", (value) =>
          isNaN(Number(value))
        )
        .min(4, "Must be four character"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Must be at least 8 characters")
        .required("Password is required"),
      age: yup
        .number()
        .required("Age is required")
        .integer("Age must be integer")
        .positive("Age must be positive")
        .typeError("Age must be an integer"),
      date: yup.date().required("Date is required"),
      fileUpload: yup
        .mixed()
        .required("File upload is required")
        .test(
          "fileType",
          "File Must Be of type : jpg, jpeg, png, gif, or pdf",
          (value) => {
            if (!value) return true;
            const file = value as File; // Type assertion
            const supportedFormats = [
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/gif",
              "application/pdf",
            ];
            return supportedFormats.includes(file.type);
          }
        )
        .test("fileSize", "File size should be less than 5MB", (value) => {
          const file = value as File; // Type assertion
          const maxFileSize = 5 * 1024 * 1024;
          if (!value) return true;
          return file.size <= maxFileSize;
        }),
      selectProgramming: yup.string().required("Please select programming"),
      gender: yup.string().required("Please select gender"),
      languageCheckbox: yup
        .array()
        .of(yup.string())
        .min(1, "Please select at least one option"),
    }),
  });
  const notAllowTypeString = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // Regular expression to match numeric values
    const numericRegex = /^[0-9\b]+$/;

    if (!numericRegex.test(keyValue)) {
      event.preventDefault();
    }
  };
  const notAllowTypeNumber = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // Regular expression to match non-numeric values
    const nonNumericRegex = /^[A-Za-z\b]+$/;

    if (!nonNumericRegex.test(keyValue)) {
      event.preventDefault();
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="block max-w-xl rounded-lg  bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <form onSubmit={formIk.handleSubmit}>
          {/* <!--First name input--> */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative mb-6">
              <input
                type="text"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                onKeyPress={notAllowTypeNumber}
                {...formIk.getFieldProps("name")}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Please Enter Name
              </label>
              {/* Error message */}
              {formIk.errors.name && (
                <p className="text-red-500 text-sm">{formIk.errors.name}</p>
              )}
            </div>
            <div className="relative mb-6">
              <input
                type="text"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                {...formIk.getFieldProps("email")}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Please Enter Email
              </label>
              {formIk.touched.email && formIk.errors.email ? (
                <span className="text-red-600">{formIk.errors.email}</span>
              ) : null}
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                {...formIk.getFieldProps("password")}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Please Enter Password
              </label>
              {formIk.touched.password && formIk.errors.password ? (
                <span className="text-red-600">{formIk.errors.password}</span>
              ) : null}
            </div>
            <div className="relative mb-6">
              <input
                type="text"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                onKeyPress={notAllowTypeString}
                {...formIk.getFieldProps("age")}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Please Enter Age
              </label>
              {formIk.touched.age && formIk.errors.age ? (
                <div className="text-red-600">{formIk.errors.age}</div>
              ) : null}
            </div>
            <div className="relative mb-6">
              <input
                type="date"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                {...formIk.getFieldProps("date")}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Please Enter Date
              </label>
              {formIk.touched.date && formIk.errors && formIk.errors.date ? (
                <div className="text-red-600">{formIk.errors.date}</div>
              ) : null}
            </div>
            <div className="relative mb-6">
              <input
                type="file"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                onChange={(event) => {
                  formIk.setFieldValue(
                    "fileUpload",
                    event.currentTarget.files
                      ? event.currentTarget.files[0]
                      : null
                  );
                  formIk.setFieldError("fileUpload", ""); // Reset the error message
                }}
                onBlur={formIk.handleBlur}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Upload
              </label>
              {formIk.touched.fileUpload &&
              formIk.errors &&
              formIk.errors.fileUpload ? (
                <div className="text-red-600">{formIk.errors.fileUpload}</div>
              ) : (
                <div> </div>
              )}
            </div>
            <div className="relative mb-6">
              <select
                name="selectProgramming"
                onChange={formIk.handleChange}
                onBlur={formIk.handleBlur}
                value={formIk.values.selectProgramming}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option>css</option>
                <option>javaScript</option>
                <option>react</option>
                <option>node js</option>
                <option>express</option>
                <option>mongoose</option>
              </select>

              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Please Select
              </label>
              {formIk.touched.selectProgramming &&
              formIk.errors &&
              formIk.errors.selectProgramming ? (
                <div className="text-red-600">
                  {formIk.errors.selectProgramming}
                </div>
              ) : null}
            </div>
            <div className="flex justify-around">
              <div className="">
                <input
                  type="radio"
                  name="gender"
                  className="mx-1 my-3 text-2xl"
                  onChange={formIk.handleChange}
                  onBlur={formIk.handleBlur}
                  value="male"
                ></input>

                <label>Male</label>
              </div>
              <div className="">
                <input
                  type="radio"
                  name="gender"
                  className="mx-1 my-3 text-2xl"
                  onChange={formIk.handleChange}
                  onBlur={formIk.handleBlur}
                  value="FeMale"
                ></input>

                <label>FeMale</label>
                {formIk.errors.gender ? (
                  <div className="text-red-600 -ml-28">
                    {formIk.errors.gender}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-around mb-5">
              <div>
                <input
                  type="checkbox"
                  name="languageCheckbox"
                  className="mx-1 text-2xl"
                  onChange={formIk.handleChange}
                  onBlur={formIk.handleBlur}
                  value="java"
                  // checked={formIk.values.languageCheckbox.includes("java")}
                ></input>

                <label htmlFor="java">Java</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="languageCheckbox"
                  className="mx-1  text-2xl"
                  onChange={formIk.handleChange}
                  onBlur={formIk.handleBlur}
                  // checked={formIk.values.languageCheckbox.includes("pythan")}
                  value="pythan"
                ></input>

                <label>pythan</label>
                {formIk.touched.languageCheckbox &&
                  formIk.errors.languageCheckbox && (
                    <div className="text-red-600 -ml-28">
                      {formIk.errors.languageCheckbox}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center my-3">
            <button
              type="submit"
              className=" text-center bg-pink-500 rounded w-full py-3 px-6 uppercase transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            >
              SignUp
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <p>
            Already Account ?
            <Link to="/Login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchemaValidation;
