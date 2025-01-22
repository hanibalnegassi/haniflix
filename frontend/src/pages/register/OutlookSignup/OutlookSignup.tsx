import React, { useState } from 'react'
import "./OutlookSignup.css"
import styles from "../register.module.scss"

const OutlookSignup = ({ errors, email, setEmail, password, setPassword, formStep, closePopup, handleNext } : { errors:{}, email: string, setEmail: ({}) => void, password: string, setPassword: ({}) => void, formStep: number, closePopup: () => void, handleNext: () => void},) => {
  return (
    <div className={styles['popup-overlay']}>
      <div className={styles['popup']}>
        <button onClick={closePopup} className="p-4 absolute right-0 top-0 text-2xl leading-4">&times;</button>
        {formStep === 1 ? (
          <div className='p-8'>
            <img src="/microsoft-logo.webp" alt="yahoo" className='w-[150px] h-auto object-contain mb-5' />
            <div className='mb-5'>
              <h2 className='font-medium text-2xl'>Sign in</h2>
              <div className='text-sm'>to continue to Haniflix</div>
            </div>
            <div className='outlook-input-wrap mb-6'>
              <input autoFocus className='outlook-input' placeholder='' value={email} onChange={setEmail} />
              <label htmlFor="" className='outlook-input-label'>Enter your email</label>
            </div>
            {errors && errors.email && (
                <div className="text-xs text-google-error mt-[-5px] mb-2">{errors.email}</div>
            )}
            <button onClick={handleNext} className='bg-outlook-primary hover:bg-outlook-primary-500 text-white py-2 px-8 ml-auto block'>Next</button>
          </div>
        ):formStep === 2 ? (
          <div className='p-8'>
            <img src="/microsoft-logo.webp" alt="yahoo" className='w-[150px] h-auto object-contain mb-5' />
            <div className='mb-5'>
              <div className='text-sm mb-5'>{email}</div>
              <h2 className='font-medium text-2xl'>Enter password</h2>
              <div className='text-sm'>to continue to Haniflix</div>
            </div>
            <div className='outlook-input-wrap mb-6'>
              <input autoFocus className='outlook-input' placeholder='' value={password} onChange={setPassword} />
              <label htmlFor="" className='outlook-input-label'>Enter your password</label>
            </div>
            {errors && errors.password && (
                <div className="text-xs text-google-error mt-[-5px] mb-2">{errors.password}</div>
            )}
            <button onClick={handleNext} className='bg-outlook-primary hover:bg-outlook-primary-500 text-white py-2 px-8 ml-auto block'>Sign in</button>
          </div>
        ):<div>Something went wrong</div>}
      </div>
    </div>
  )
}

export default OutlookSignup