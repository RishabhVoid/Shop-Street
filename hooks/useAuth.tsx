import { account } from "@/appwriteConfig";
import { useEffect, useState } from "react";
import { ID, Models } from "appwrite";
import ResponseWrapper, { ResponseWrapperType } from "@/utils/responseWrapper";

type StateType = {
  isLoading: boolean;
  user: Models.User<{}> | null;
  error: string;
};

const useAuth = () => {
  const [data, setData] = useState<StateType>({
    isLoading: false,
    user: null,
    error: ""
  });
  const [reloadAuthState, setReloadAuthState] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setData(prev => ({ ...prev, isLoading: true }));
      try {
        let user = await account.get();
        if (user?.$id?.length) {
          setData(prev => ({ ...prev, user }));
        };
      } catch (error: any) {
        setData(prev => ({ ...prev, error: error?.toString() }));
      };
      setData(prev => ({ ...prev, isLoading: false }));
    };
    getUser();
  }, [reloadAuthState]);


  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<ResponseWrapperType<null>> => {
    try {
      await account.create(ID.unique(), email, password, name);
      setReloadAuthState(prev => !prev);
      return ResponseWrapper.success(null, "", "");
    } catch (error: any) {
      return ResponseWrapper.failure(null, error?.toString(), "");
    };
  };

  const login = async (
    email: string,
    password: string
  ): Promise<ResponseWrapperType<null>> => {
    try {
      await account.createEmailPasswordSession(email, password);
      setReloadAuthState(prev => !prev);
      return ResponseWrapper.success(null, "", "");
    } catch (error: any) {
      return ResponseWrapper.failure(null, error?.toString(), "");
    };
  };

  const logOut = async (): Promise<ResponseWrapperType<null>> => {
    try {
      await account.deleteSession("current");
      setReloadAuthState(prev => !prev);
      return ResponseWrapper.success(null, "", "");
    } catch (error: any) {
      return ResponseWrapper.failure(null, error?.toString(), "");
    };
  };

  return {
    authState: data,
    register,
    login,
    logOut
  }
};

export default useAuth;
