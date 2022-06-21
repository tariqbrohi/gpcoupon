import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleLogin(req, res, {
        returnTo: "/admin/dashboard",
        authorizationParams: {
          audience: process.env.AUTH0_AUDIENCE,
          scope: "openid profile email offline_access login_counts",
        },
      });
    } catch (error: any) {
      res.status(error.status || 400).send({
        errors: [
          {
            message: error.message || "You are not authenticated.",
            extensions: { code: "UNAUTHENTICATED" },
          },
        ],
      });
    }
  },
});
