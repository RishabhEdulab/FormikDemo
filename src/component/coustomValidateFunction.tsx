import React from "react";
import { useFormik } from "formik";

import { formValueTypes } from "../types/formValuesType";
const CoustomValidateFunction = () => {
// validationSchema:yup.object({
//   name:yup.string().max(15,"'Must be 15 characters or less'").required("name is required"),
//   email:yup.string().email("invalid email address").required("email is required"),
//   password:yup.string().required("password is required").max(6,"'Must be 6 characters or less'"),
//   age:yup.number().required("age is required"),
//   date:yup.date().required("date is required")
// })
// onSubmit:(values)=>{
// console.log(values)
// }

// const onSubmit=(values:{})=>{
//   console.log(values)
// }



  const formIk=useFormik<formValueTypes>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      age: 0,
      date: new Date(),
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate:values=>{
      let errors:Partial<formValueTypes>={}
      if(!values.name){
        errors.name='name is Required'
      }else if(values.name.length<2){
        errors.name='Must be 4 characters or less'
      }
      if (!values.email) {
        errors.email = 'email Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if(!values.password){
        errors.password='password Required'
      }else if(values.password.length<8){
        errors.password ='Must be 8 characters or less'
      }
      if(!values.age){
        errors.age='age Required'
      }
      if(!values.date){
        errors.date='date Required'
      }
      return errors
    }
  })
 


  return (
    <form onSubmit={formIk.handleSubmit}>
      <div className="grid w-full grid-cols-12 gap-2 bg-white px-4 py-5 sm:p-6">
        <div className="col-span-12 my-4">
          <input
            type="text"
            className="mx-12 p-2 w-2/12 rounded border-blue-500 hover:border-blue-950 bg-blue-950 text-white"
            placeholder="enter a name"
           name="name"
            onChange={formIk.handleChange}
            onBlur={formIk.handleBlur}
            value={formIk.values.name}
          ></input>
          {formIk.touched.name && formIk.errors.name ? (<div className="text-red-600">{formIk.errors.name}</div>) : null} 
          <input
            type="email"
            className="mx-12 p-2 w-2/12 rounded border-blue-500 hover:border-blue-950 bg-blue-950  text-white"
            placeholder="enter a email"
            name="email"
            onChange={formIk.handleChange}
            value={formIk.values.email}
             onBlur={formIk.handleBlur}
          ></input>
          {formIk.touched.email && formIk.errors.email ? (<div className="text-red-600">{formIk.errors.email}</div>) : null}
        </div>
        <div className="col-span-12">
          <input
            type="password"
            className="mx-12 p-2 w-2/12 rounded border-blue-500 hover:border-blue-950 bg-blue-950  text-white"
            placeholder="enter a password"
            name="password"
            onChange={formIk.handleChange}
            value={formIk.values.password}
             onBlur={formIk.handleBlur}
          ></input>
 {formIk.touched.password && formIk.errors.password ? (<div className="text-red-600">{formIk.errors.password}</div>) : null}
          <input
            type="text"
            name="age"
            className="mx-12 p-2 w-2/12 rounded border-blue-500 hover:border-blue-950 bg-blue-950  text-white"
            placeholder="enter a age"
           
            onChange={formIk.handleChange}
            value={formIk.values.age}
            onBlur={formIk.handleBlur}
          ></input>
          {formIk.touched.age && formIk.errors.age ? (<div className="text-red-600">{formIk.errors.age}</div>) : null}
        </div>
        <div className="col-span-12">
          <input
            type="date"
            className="mx-12 p-2 w-3/12 rounded border-blue-500 hover:border-blue-950 bg-blue-950  text-white"
           name="date"
          
            onChange={formIk.handleChange}
            value={formIk.values.date.toString()}
             onBlur={formIk.handleBlur}
          ></input>
{formIk.touched.date && formIk.errors && formIk.errors.date  ? (<div>"date is required"</div>) : null}
          {/* <input
            type="text"
            className="mx-12 p-2 w-2/12 rounded border-blue-500 hover:border-blue-950 bg-blue-950"
            placeholder="enter a age"
            value={formIk.values.age}
            onChange={formIk.handleChange}
            onBlur={formIk.handleBlur}
          ></input> */}
        </div>
      </div>
      <div className="">
        <button className="capitalize bg-blue-950 w-2/12 p-2 text-white hover:bg-blue-900 transition delay-150 duration-300 ease-in-out rounded">submit</button>
      </div>
    </form>
  );
};

export default CoustomValidateFunction;
