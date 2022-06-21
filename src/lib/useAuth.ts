import { useContext } from "react";
import { Ctx } from "../components/Context";

export default function useAuth() {
  return useContext(Ctx);
}
