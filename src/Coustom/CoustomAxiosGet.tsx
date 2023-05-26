import axios, { AxiosError, AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { GetApiType } from "../types/GetApiType";
export const CoustomAxiosGet = (url: string, accessToken?: string) => {
  const [data, setData] = useState<GetApiType[]>([]);
  const [error, setError] = useState<unknown>();
  const getApi = async () => {
    try {
      //    let accessToken=localStorage.getItem("token")
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const responseData = await axios.get(url, config);
      console.log("fetch response", responseData);
      //   if (
      //     responseData.status !== 200 ||
      //     responseData.data.message === "failed"
      //   ) {
      //      setError(responseData);
      //   }

      setData(responseData.data);
    } catch (error: unknown) {
      const err = error as AxiosError;
      setError(err);
    }
  };
  useEffect(() => {
    getApi();
  }, [url]);
  return { data, error };
};
