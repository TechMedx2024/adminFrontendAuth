import Seo from '@/shared/layout-components/seo/seo';
import { useCreateUserMutation } from '@/shared/redux/services/auth';
import Link from 'next/link';
import Image from 'next/image';
import React, { Fragment, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { basePath } from '@/next.config';
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
};

const Signup = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [createUser] = useCreateUserMutation();
    const formik = useFormik({
        initialValues,
        onSubmit: async (values, action) => {
            setLoading(true)
            try {
                const response = await createUser(values).unwrap();
                if (response && response.data) {

                    setSuccessMsg(response.data.message);
                    setErrorMsg('');
                    action.resetForm();

                }
                setLoading(false)
                Cookies.set('email', values.email, { expires: 7 });
                router.push('http://localhost:3000/loginOtp');
            } catch (err: any) { // Cast 'err' to 'any' to avoid TypeScript errors
                console.log("this is error: ", err);
                const { data, status } = err;
                const { message, stack } = data || {}; // Destructure 'data' and provide a fallback empty object
                setErrorMsg(message);
                setSuccessMsg('');
                setLoading(false)
            }
        }
    });


    const [passwordShow1, setPasswordShow1] = useState(false);
    const [passwordShow2, setPasswordShow2] = useState(false);

    useEffect(() => {
        // Any effect you want to run on component mount
    }, []);

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
                                                <label htmlFor="signup-name" className="form-label">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg w-full rounded-md"
                                                    name="name"
                                                    id="signup-name"
                                                    placeholder="Your Name"
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-12">
                                                <label htmlFor="signup-email" className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg w-full rounded-md"
                                                    id="signup-email"
                                                    placeholder="Your Email"
                                                    name="email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-12">
                                                <label htmlFor="signup-phone" className="form-label">Phone</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg w-full rounded-md"
                                                    id="signup-phone"
                                                    placeholder="Your Phone number"
                                                    name="phone"
                                                    value={formik.values.phone}
                                                    onChange={formik.handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-12">
                                                <label htmlFor="signup-password" className="form-label">Password</label>
                                                <div className="input-group">
                                                    <input
                                                        type={passwordShow1 ? 'text' : 'password'}
                                                        className="form-control form-control-lg rounded-l-none"
                                                        id="signup-password"
                                                        placeholder="Password"
                                                        name="password"
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        className="ti-btn ti-btn-light rounded-r-none mb-0 basebtn"
                                                        onClick={() => setPasswordShow1(!passwordShow1)}
                                                        aria-label="Toggle password visibility"
                                                    >
                                                        <i className={`ri-eye-${passwordShow1 ? 'line' : 'off-line'} align-middle`}></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-span-12 mb-2">
                                                <label htmlFor="signup-password-confirm" className="form-label">Confirm Password</label>
                                                <div className="input-group">
                                                    <input
                                                        type={passwordShow2 ? 'text' : 'password'}
                                                        className="form-control form-control-lg rounded-l-none"
                                                        id="signup-password-confirm"
                                                        placeholder="Confirm Password"
                                                        name="password_confirmation"
                                                        value={formik.values.password_confirmation}
                                                        onChange={formik.handleChange}
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        className="ti-btn ti-btn-light rounded-r-none mb-0 basebtn"
                                                        onClick={() => setPasswordShow2(!passwordShow2)}
                                                        aria-label="Toggle password visibility"
                                                    >
                                                        <i className={`ri-eye-${passwordShow2 ? 'line' : 'off-line'} align-middle`}></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <button type="submit" className="ti-btn ti-btn-lg bg-[#B30018] text-white font-medium border-defaultborder/10 w-full" disabled={loading}>Create Account</button>
                                            </div>
                                        </div>
                                        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                                        {successMsg && <div className="alert alert-success">{successMsg}</div>}
                                    </form>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500 mt-4">Already have an account? <Link href="/components/authentication/sign-in/signin-basic/" className="text-[#B30018]">Sign In</Link></p>
                                    </div>
                                    <div className="text-center my-4 authentication-barrier">
                                        <span>OR</span>
                                    </div>
                                    <div className="btn-list text-center">
                                        <button type="button" className="ti-btn ti-btn-icon ti-btn-light me-1 basebtn" aria-label="Facebook login">
                                            <i className="ri-facebook-line font-bold text-dark opacity-75"></i>
                                        </button>
                                        <button type="button" className="ti-btn ti-btn-icon ti-btn-light me-1 basebtn" aria-label="Google login">
                                            <i className="ri-google-line font-bold text-dark opacity-75"></i>
                                        </button>
                                        <button type="button" className="ti-btn ti-btn-icon ti-btn-light basebtn" aria-label="Twitter login">
                                            <i className="ri-twitter-line font-bold text-dark opacity-75"></i>
                                        </button>
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

Signup.layout = 'Authenticationlayout';

export default Signup;
