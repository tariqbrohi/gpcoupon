import axios from "axios";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

type Context = {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  loading: boolean;
};

// createContext<Context>({
//   user: null,
//   setUser: () => null,
// });

export const Ctx = createContext<Context>({
  user: null,
  loading: true,
  setUser: () => null,
});

export default function Context({ children }: any) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_GPOINT_WALLET_URI}/v1/auth/userinfo`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setLoading(false);
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return <Ctx.Provider value={{ user, setUser, loading }}>{children}</Ctx.Provider>;
}
