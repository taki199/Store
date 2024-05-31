"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaTwitter, FaRegEnvelope, FaRegUser } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { login, register } from '../../features/authSlice';
import { useAppDispatch } from '../../hooks/hooks';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  const handleRegister = () => {
    dispatch(register({ email, username, password }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          {/* Left Side - Sign In / Sign Up Form */}
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <Link href="/">
                <Image src="/laun1.png" alt="Logo" width={100} height={80} className="px-2" />
              </Link>
            </div>
            <div className="py-10">
              <h2 className={`text-3xl font-bold mb-2 ${isSignUp ? 'text-green-500' : 'text-green-500'}`}>
                {isSignUp ? 'Sign Up for Account' : 'Sign in to Account'}
              </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaFacebook className="text-blue-700 text-2xl" />
                </a>
                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaGoogle className="text-red-700 text-2xl" />
                </a>
                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaTwitter className="text-blue-400 text-2xl" />
                </a>
              </div>
              <p className="text-gray-400 my-3 mb-4">Or Use Your Email and password</p>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-500 m-2" />
                  <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {isSignUp && (
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <FaRegUser className="text-gray-500 m-2" />
                    <input type="text" name="username" placeholder="Username" className="bg-gray-100 outline-none text-sm flex-1" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                )}
                <div className="bg-gray-100 w-64 p-2 flex items-center">
                  <MdLockOutline className="text-gray-500 m-2" />
                  <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {!isSignUp && (
                  <div className="flex w-64 mb-5 justify-between mt-2">
                    <label className="flex items-center text-xs">
                      <input type="checkbox" name="remember me" className="mr-1" /> Remember me
                    </label>
                    <a href="#" className="text-xs hover:text-green-400">
                      Forgot Password?
                    </a>
                  </div>
                )}
                <button onClick={isSignUp ? handleRegister : handleLogin} className="border-2 border-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white mt-4">
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </div>
          </div>
          {/* Right Side - Welcome Message */}
          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">{isSignUp ? 'Welcome Back!' : 'Welcome Customer'}</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10 mt-4">
              {isSignUp
                ? 'To keep connected with us please login with your personal info'
                : 'Fill up personal information and start your journey'}
            </p>
            <button onClick={toggleSignUp} className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
