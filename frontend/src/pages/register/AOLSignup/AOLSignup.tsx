import React, { useState } from 'react'
import "./AOLSignup.css"
import styles from "../register.module.scss"

const AOLSignup = ({ errors, email, setEmail, password, setPassword, formStep, closePopup, handleNext } : { errors:{}, email: string, setEmail: ({}) => void, password: string, setPassword: ({}) => void, formStep: number, closePopup: () => void, handleNext: () => void},) => {
  return (
    <div className={styles['popup-overlay']}>
      <div className={styles['popup']}>
        <button onClick={closePopup} className="p-4 absolute right-0 top-0 text-2xl leading-4">&times;</button>
        {formStep === 1 ? (
          <div className='p-5'>
            <img src="/aol-logo.png" alt="aol" className='w-[90px] h-auto object-containblock mx-auto mb-[50px]' />
            <div className='text-center mb-[60px]'>
              <h2 className='font-bold text-2xl mb-2'>Sign in</h2>
              <div className='text-sm'>to continue to Haniflix</div>
            </div>
            <div className='aol-input-wrap mb-6'>
              <input autoFocus className='aol-input' placeholder='' value={email} onChange={setEmail} />
              <label htmlFor="" className='aol-input-label'>Enter your email</label>
            </div>
            {errors && errors.email && (
                <div className="text-xs text-google-error mt-[-5px] mb-2">{errors.email}</div>
            )}
            <button onClick={handleNext} className='bg-aol-primary hover:bg-aol-primary-300 text-white py-2 rounded w-full'>Next</button>
          </div>
        ):formStep === 2 ? (
          <div className='p-5'>
            <img src="/aol-logo.png" alt="aol" className='w-[90px] h-auto object-containblock mx-auto mb-[50px]' />
            <div className='text-center mb-[60px]'>
              <div className='text-sm mb-5'>{email}</div>
              <h2 className='font-bold text-2xl mb-2'>Enter password</h2>
              <div className='text-sm'>to finish sign in</div>
            </div>
            <div className='aol-input-wrap mb-6'>
              <input autoFocus type="password" className='aol-input' placeholder='' value={password} onChange={setPassword} />
              <label htmlFor="" className='aol-input-label'>Enter your password</label>
            </div>
            {errors && errors.password && (
                <div className="text-xs text-google-error mt-[-5px] mb-2">{errors.password}</div>
              )}
            <button onClick={handleNext} className='bg-aol-primary hover:bg-aol-primary-300 text-white py-2 rounded w-full'>Sign in</button>
          </div>
        ):<div>Something went wrong</div>}
      </div>
    </div>
  )
}

export default AOLSignup