import React from "react";
import { Redirect } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { CoustomAxiosGet } from "../Coustom/CoustomAxiosGet";
interface HomePageProps {
  isAuthenticated: boolean;
}
const HomePage: React.FC<HomePageProps> = ({ isAuthenticated }) => {
  // check if user is authenticated then redirect to home page and if user not authenticate redirect to login page
  if (!isAuthenticated) {
    return <Redirect to="/Login" />;
  }
  let accessToken = localStorage.getItem("token");

  const { data, error } = CoustomAxiosGet(
    "http://localhost:4000/user/product",
    accessToken ?? "undefined"
  );
  console.log("getapidata", data);
  console.log("getapierror", error);
  const axiosError = error as AxiosError;
  // if(axiosError?.response?.status===401) alert("Invalid token. Please log in again.")
  //close
  return (
    <div className="flex items-center justify-center mt-60">
      <div className="">
        {axiosError?.response?.status === 401 ? (
          <div
            className="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4"
            role="alert"
          >
            <span className="font-bold">Danger</span> alert! Invalid token.
            Please log in again.
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
              <div className=" overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-4 border-gray-300">
                <thead>
                  <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">age</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">product</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">active</th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200 dark:divide-gray-700">
                  {
                    data.map((element)=>(
                      <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-gray-500">
                        {element.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-gray-500">
                      {element.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-gray-500">{element.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-gray-500">{element.date.toString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-gray-500">{element.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-gray-500">{element.active ? "true":"false"}</td>
                    </tr>
                    ))
                  }
                 
                </tbody>
                </table>
                </div>
              </div>
              </div>
            </div>
          
        )}
      </div>
    </div>
  );
};

export default HomePage;
