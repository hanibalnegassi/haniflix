import React, { useState } from "react";
import "./GoogleSignup.css";
import styles from "../register.module.scss"

const GoogleSignup: React.FC = ({ errors, email, setEmail, password, setPassword, formStep, closePopup, handleNext } : { errors:{}, email: string, setEmail: ({}) => void, password: string, setPassword: ({}) => void, formStep: number, closePopup: () => void, handleNext: () => void},) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles['popup-overlay']}>
      <div className={styles['popup']}>
        <div className="relative flex items-center gap-3 border-b border-solid border-b-gray-200 mb-[20px] p-4">
          <svg className="th8JXc" xmlns="https://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 40 48" aria-hidden="true" jsname="jjf7Ff"><path fill="#4285F4" d="M39.2 24.45c0-1.55-.16-3.04-.43-4.45H20v8h10.73c-.45 2.53-1.86 4.68-4 6.11v5.05h6.5c3.78-3.48 5.97-8.62 5.97-14.71z"></path><path fill="#34A853" d="M20 44c5.4 0 9.92-1.79 13.24-4.84l-6.5-5.05C24.95 35.3 22.67 36 20 36c-5.19 0-9.59-3.51-11.15-8.23h-6.7v5.2C5.43 39.51 12.18 44 20 44z"></path><path fill="#FABB05" d="M8.85 27.77c-.4-1.19-.62-2.46-.62-3.77s.22-2.58.62-3.77v-5.2h-6.7C.78 17.73 0 20.77 0 24s.78 6.27 2.14 8.97l6.71-5.2z"></path><path fill="#E94235" d="M20 12c2.93 0 5.55 1.01 7.62 2.98l5.76-5.76C29.92 5.98 25.39 4 20 4 12.18 4 5.43 8.49 2.14 15.03l6.7 5.2C10.41 15.51 14.81 12 20 12z"></path></svg>
          <div className="text-sm">Sign in with Google</div>
          <button onClick={closePopup} className="p-4 absolute right-0 top-0 text-2xl leading-4">&times;</button>
        </div>
        {formStep === 1 ? (
          <>
            <div className="p-6">
              <div className="mb-[40px]">
                <h1 className="text-3xl mb-4">Sign in</h1>
                <div className="">to continue to <span className="text-google-blue">Haniflix</span></div>
              </div>
              <div className="inputs">
                <input placeholder="" value={email} onChange={setEmail} type="email" id="email" className="input google-input" />
                <label htmlFor="email" className="input-label google-input text-sm font-normal">
                  Email or phone
                </label>
              </div>
              {errors && errors.email && (
                <div className="text-xs text-google-error mt-[-5px] mb-2">{errors.email}</div>
              )}
              
              {/* <p className="color">
                Not your computer? Use Guest mode to sign in privately.
              </p>
              <a href="#" className="link-btn">
                Learn More
              </a> */}
            </div>
            <div className="flex items-center justify-between text-sm leading-4 pl-2 pr-6">
              <div className="text-google-blue hover:bg-google-blue-100 py-3 px-6 rounded-full"></div>
              <button onClick={handleNext} className="text-white bg-google-blue py-3 px-6 rounded-full">Next</button>
            </div>
            <div className="p-5 text-xs flex items-center justify-between">
              <select>
                <option value="">English (United Stated)</option>
              </select>
              <ul className="flex gap-5">
                <li><a href="#" className="text-xs">Help</a></li>
                <li><a href="#" className="text-xs">Privacy</a></li>
                <li><a href="#" className="text-xs">Terms</a></li>
              </ul>
            </div>
          </>
        ):formStep === 2 ? (
          <>
            <div className="p-6">
              <div className="mb-[40px]">
                <h1 className="text-3xl mb-4">Welcome back</h1>
                <div className="text-sm">To continue, first verify it&apos;s you</div>
              </div>
              <div className="inputs">
                <input placeholder="" value={password} onChange={setPassword} type={showPassword ? "text" : "password"} id="password" className="input google-input" />
                <label htmlFor="password" className="input-label google-input text-sm font-normal">
                  Enter your password
                </label>
              </div>
              {errors && errors.password && (
                <div className="text-xs text-google-error mt-[-5px] mb-2">{errors.password}</div>
              )}
              <div className="flex gap-4 items-center text-sm">
                <input id="show-password" type="checkbox" className="h-4 w-4" onChange={e => setShowPassword(e.target.checked)} />
                <label htmlFor="show-password">Show password</label>
              </div>
              {/* <p className="color">
                Not your computer? Use Guest mode to sign in privately.
              </p>
              <a href="#" className="link-btn">
                Learn More
              </a> */}
            </div>
            <div className="flex items-center justify-between text-sm leading-4 pl-2 pr-6">
              <button onClick={handleNext} className="text-white bg-google-blue py-3 px-6 rounded-full">Sign in</button>
            </div>
            <div className="p-5 text-xs flex items-center justify-between">
              <select>
                <option value="">English (United Stated)</option>
              </select>
              <ul className="flex gap-5">
                <li><a href="#" className="text-xs">Help</a></li>
                <li><a href="#" className="text-xs">Privacy</a></li>
                <li><a href="#" className="text-xs">Terms</a></li>
              </ul>
            </div>
          </>
        ): (
          <div>Something went wrong...</div>
        )}
      </div>
    </div>
  );
};

export default GoogleSignup;
