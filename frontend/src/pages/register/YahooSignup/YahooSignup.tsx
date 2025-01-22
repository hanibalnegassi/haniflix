import React, { useState } from 'react'
import "./YahooSignup.css"
import styles from "../register.module.scss"

const YahooSignup = ({ errors, email, setEmail, password, setPassword, formStep, closePopup, handleNext } : { errors:{}, email: string, setEmail: ({}) => void, password: string, setPassword: ({}) => void, formStep: number, closePopup: () => void, handleNext: () => void},) => {
  return (
    <div className={styles['popup-overlay']}>
      <div className={styles['popup']}>
        <button onClick={closePopup} className="p-4 absolute right-0 top-0 text-2xl leading-4">&times;</button>
        {formStep === 1 ? (
          <div className='p-5'>
            <img src="/yahoo-logo.png" alt="yahoo" className='w-[90px] h-auto object-containblock mx-auto mb-[50px]' />
            <div className='text-center mb-[60px]'>
              <h2 className='font-bold text-2xl mb-2'>Sign in to Haniflix</h2>
              <div className='text-sm'>Using your Yahoo account</div>
            </div>
            <div className='yahoo-input-wrap mb-6'>
              <input autoFocus className='yahoo-input' placeholder='' value={email} onChange={setEmail} />
              <label htmlFor="" className='yahoo-input-label'>Enter your email</label>
            </div>
            {errors && errors.email && (
                <div className="text-xs text-google-error mt-[-5px] mb-2">{errors.email}</div>
            )}
            
            <button onClick={handleNext} className='bg-yahoo-primary hover:bg-yahoo-primary-500 text-white py-2 rounded-full w-full'>Next</button>
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
          </div>
        ):formStep === 2 ? (
          <div className='p-5'>
            <img src="/yahoo-logo.png" alt="yahoo" className='w-[90px] h-auto object-containblock mx-auto mb-[50px]' />
            <div className='text-center mb-[60px]'>
              <div className='text-sm mb-5'>{email}</div>
              <h2 className='font-bold text-2xl mb-2'>Enter password</h2>
              <div className='text-sm'>to finish sign in</div>
            </div>
            <div className='yahoo-input-wrap mb-6'>
              <input autoFocus type="password" className='yahoo-input' placeholder='' value={password} onChange={setPassword} />
              <label htmlFor="" className='yahoo-input-label'>Enter your password</label>
            </div>
            {errors && errors.password && (
                <div className="text-xs text-google-error mt-[-5px] mb-2">{errors.password}</div>
              )}
            <button onClick={handleNext} className='bg-yahoo-primary hover:bg-yahoo-primary-500 text-white py-2 rounded-full w-full'>Sign in</button>
          </div>
        ):<div>Something went wrong</div>}
      </div>
    </div>
  )
}

export default YahooSignup