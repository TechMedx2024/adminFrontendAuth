import Seo from '@/shared/layout-components/seo/seo';
import { useVerifySignupOTPMutation } from '@/shared/redux/services/auth';
import Image from 'next/image';
import React, { Fragment, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { basePath } from '@/next.config';
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const OTP = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const router = useRouter();
  const [verifySignupOTP] = useVerifySignupOTPMutation();
  const [initialValues, setInitialValues] = useState({ otp: '', email: '' });

  useEffect(() => {
    const storedEmail = Cookies.get('email');
    if (storedEmail) {
      setInitialValues((prevValues) => ({ ...prevValues, email: storedEmail }));
    } else {
      // If no email found in cookies, redirect to login page
      router.push("http://localhost:3000/");
    }
  }, [router]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {

      try {
        const response = await verifySignupOTP(values).unwrap();
        Cookies.set('accessToken', response.access_token, { expires: response.access_token_exp });
        Cookies.set('refreshToken', response.refresh_token, { expires: 5 });
        Cookies.set('is_auth', response.is_auth, { expires: 2 });
        if (response && response.data) {
          setSuccessMsg(response.data.message);
          setErrorMsg('');

          // Redirect after a brief delay to ensure the success message is shown
        }
        router.push("http://localhost:3000/components/dashboards/ecommerce/");
      } catch (err: any) {
        console.log("this is error: ", err);
        const { data } = err;
        const { message } = data || {};
        setErrorMsg(message);
        setSuccessMsg('');

      }
    }
  });

  return (
    <Fragment>
      <Seo title={'Signup'} />
      <div className="container">
        <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize text-defaulttextcolor">
          <div className="grid grid-cols-12">
            <div className="xxl:col-span-4 xl:col-span-2 lg:col-span-2 md:col-span-3 sm:col-span-2"></div>
            <div className="xxl:col-span-4 xl:col-span-2 lg:col-span-2 md:col-span-6 sm:col-span-8 col-span-12">
              <div className="box">
                <div className="box-body p-1">
                  <div className="flex justify-center">
                    <Image
                      src={`${process.env.NODE_ENV === 'production' ? basePath : ''}/assets/images/brand-logos/logo.jpg`}
                      alt="user-img"
                      className="mb-[-4rem] mt-[-1rem]"
                      width={200}
                      height={200}
                      priority
                    />
                  </div>
                  <p className="text-2xl font-semibold text-center">Sign Up</p>
                  <p className="text-gray-500 opacity-75 font-normal text-center">Welcome &amp; Join MedX by creating an account!</p>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12 gap-y-1">
                      <div className="col-span-12">
                        <label htmlFor="signup-otp" className="form-label">OTP</label>
                        <input
                          type="text"
                          className="form-control form-control-lg w-full rounded-md"
                          name="otp"
                          id="signup-otp"
                          placeholder="Enter 4-digit OTP"
                          value={formik.values.otp}
                          onChange={formik.handleChange}
                          required
                        />
                      </div>
                      <div className="col-span-12">
                        <button type="submit" className="ti-btn ti-btn-lg bg-[#B30018] text-white font-medium border-defaultborder/10 w-full" >
                          OTP Verification
                        </button>
                      </div>
                    </div>
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                    {successMsg && <div className="alert alert-success">{successMsg}</div>}
                  </form>
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

OTP.layout = 'Authenticationlayout';

export default OTP;
