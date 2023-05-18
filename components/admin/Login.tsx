import React, { useState } from "react";
import { LogoIcon } from "../base/Icons";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "../base/Button";
import Alert from "../base/Alert";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient();
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<any>("");

  async function login() {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      setShowAlert(true);
    }
    setLoading(false);
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex mb-5">
          <LogoIcon width="24px" height="24px" className="text-blue-500" />
          <h2 className="ml-2 text-lg font-semibold text-gray-900">
            Anonymous message manager
          </h2>
        </div>

        <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <section className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="you@mail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500  block w-full p-2.5 "
                  required
                />
              </div>
              <Button
                text={loading ? "Logging in..." : "Login"}
                variant={loading ? "disabled" : "submit"}
                onClick={() => login()}
              />
            </section>
          </div>
        </div>
      </div>
      {showAlert && <Alert error={error} />}
    </section>
  );
}

export default Login;
