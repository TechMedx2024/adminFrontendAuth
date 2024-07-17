'use client'
import { basePath } from "@/next.config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment, useState, ChangeEvent, FormEvent, useCallback } from "react";
import Cookies from "js-cookie";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [passwordshow1, setPasswordShow1] = useState(false);
  const [err, setError] = useState<string>("");
  const [data, setData] = useState<LoginForm>({ email: "", password: "" });
  const { email, password } = data;
  const router = useRouter();

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    setError("");
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordShow1((prevShow) => !prevShow);
  }, []);

  const login = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed.");
        return;
      }

      // Login successful, store email in cookies and navigate to dashboard
      Cookies.set('email', email, { expires: 7 }); // Store the email for 7 days
      router.push("http://localhost:3000/loginOtp/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again later.");
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
          <div className="grid grid-cols-12">
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
              <div className="box !p-[3rem]">
                <div className="flex justify-center">
                  <Image
                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/logo.jpg`}
                    alt="user-img"
                    className="mb-[-4rem]"
                    width={200}
                    height={200}
                    priority
                  />
                </div>
                <div className="box-body mt-0" role="tabpanel" id="pills-with-brand-color-01" aria-labelledby="pills-with-brand-color-item-1">
                  <p className="h5 font-semibold mb-2 text-center">Sign In</p>
                  <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">Welcome back to Medx!</p>
                  <div className="grid grid-cols-12 gap-y-4">
                    <div className="xl:col-span-12 col-span-12">
                      <label htmlFor="signin-email" className="form-label text-default">Email</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control form-control-lg w-full !rounded-md"
                        id="email"
                        onChange={changeHandler}
                        value={email}
                      />
                    </div>
                    <div className="xl:col-span-12 col-span-12 mb-2">
                      <label htmlFor="signin-email" className="form-label text-default">Password</label>
                      <div className="input-group">

                        <input
                          name="password"
                          type={passwordshow1 ? 'text' : "password"}
                          value={password}
                          onChange={changeHandler}
                          className="form-control form-control-lg !rounded-s-md"
                          id="signin-password"
                          placeholder="password"
                        />
                        <button
                          onClick={togglePasswordVisibility}
                          aria-label="button"
                          className="ti-btn ti-btn-light !rounded-s-none !mb-0"
                          type="button"
                          id="button-addon2"
                        >
                          <i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i>
                        </button>
                      </div>
                      <div className="mt-2">
                        <div className="form-check !ps-0">
                          <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                          <label className="form-check-label text-[#8c9097] dark:text-white/50 font-normal" htmlFor="defaultCheck1">
                            Remember password ?
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="xl:col-span-12 col-span-12 grid mt-2">
                      <button
                        onClick={login}
                        className="ti-btn ti-btn-primary !bg-[#B30018] !text-white !font-medium"
                      >
                        Sign In
                      </button>
                    </div>
                    {err && (
                      <div className="xl:col-span-12 col-span-12 mt-2">
                        <p className="text-red-500">{err}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(Login);
