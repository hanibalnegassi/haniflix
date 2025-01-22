import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../Assets/css/styles.scss';
import { addClassNames } from '../../store/utils/functions';
import styles from './register.module.scss';
import { Link } from 'react-router-dom';
import OutlookLogo from "../../Assets/Images/Outlook-logo.png"
import AOL from "../../Assets/Images/AOL-logo.png";
import YahooLogo from "../../Assets/Images/Yahoo-logo.png";
import OutlookBlueLogo from "../../Assets/Images/Outlook-blue-logo.png";

// Importing Signup Components
import GoogleSignup from './GoogleSignup/GoogleSignup';
import YahooSignup from './YahooSignup/YahooSignup';
import OutlookSignup from './OutlookSignup/OutlookSignup';
import AOLSignup from './AOLSignup/AOLSignup';

const api_url = import.meta.env.VITE_APP_API_URL;

enum STEP {
  SIGNUP,
  BILLING,
}



const providerLogos = {
  google: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",
  yahoo: YahooLogo,
  outlook: OutlookBlueLogo,
  aol: AOL
};
const Register = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(null);
  const [step, setStep] = useState(STEP.SIGNUP);
  const [formStep, setFormStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // sign up

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  // date of birth
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');

  // billing
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvcError, setCvcError] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [nameOnCardError, setNameOnCardError] = useState('');
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [addressLineError, setAddressLineError] = useState('');
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [province, setProvince] = useState('');
  const [provinceError, setProvinceError] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  // Validators

  const validateUsername = (value) => {
    if (!value) {
      setUsernameError('Username is required');
    } else if (value.length < 6) {
      setUsernameError('Username must be at least 6 characters long');
    } else {
      setUsernameError('');
    }
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError('Email address is required');
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError('Password is required');
    } else if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const validateRepeatPassword = (value) => {
    if (!value) {
      setRepeatPasswordError('Repeat Password is required');
    } else if (value !== password) {
      setRepeatPasswordError('Passwords do not match');
    } else {
      setRepeatPasswordError('');
    }
  };

  const validateCardNumber = (cardNumber: string) => {
    if (!cardNumber) {
      setCardNumberError('Card Number is required');
    } else if (cardNumber.length !== 19) {
      setCardNumberError('Card Number is invalid');
    } else {
      setCardNumberError('');
    }
  };

  const validateExpiryDate = (expiryDate: string) => {
    if (!expiryDate) {
      setExpiryDateError('Expiry date is required');
    }
    if (expiryDate.length !== 5) {
      setExpiryDateError('Expiry date is invalid');
    } else {
      const [month, year] = expiryDate
        .split('/')
        .map((item) => parseInt(item, 10));
      if (month < 1 || month > 12) {
        setExpiryDateError('Expiry date is invalid');
      } else if (new Date(year + 2000, month, 1) < new Date()) {
        setExpiryDateError('Expiry date is expired');
      } else {
        setExpiryDateError('');
      }
    }
  };

  const validateCvc = (cvc: string) => {
    if (!cvc) {
      setCvcError('CVC is required');
    }
    if (cvc.length !== 3) {
      setCvcError('CVC is invalid');
    } else {
      setCvcError('');
    }
  };

  const validateNameOnCard = (nameOnCard: string) => {
    if (!nameOnCard) {
      setNameOnCardError('Name On Card is required');
    } else {
      setNameOnCardError('');
    }
  };

  const validateCountry = (country: string) => {
    if (!country) {
      setCountryError('Country is required');
    } else {
      setCountryError('');
    }
  };

  const validateCity = (city: string) => {
    if (!city) {
      setCityError('City is required');
    } else {
      setCityError('');
    }
  };

  const validateAddressLine = (addressLine: string) => {
    if (!addressLine) {
      setAddressLineError('Address Line is required');
    } else {
      setAddressLineError('');
    }
  };

  const validateProvince = (province: string) => {
    if (!province) {
      setProvinceError('State/Province is required');
    } else {
      setProvinceError('');
    }
  };

  const validateZipCode = (zipCode: string) => {
    if (!zipCode) {
      setZipCodeError('Zip Code/Postal Code is required');
    } else {
      setZipCodeError('');
    }
  };
  const validatePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) {
      setPhoneNumberError('Phone Number is required');
    } else {
      setPhoneNumberError('');
    }
  };

  const validateDateOfBirth = (birth: string) => {
    if (!birth) {
      setDateOfBirthError("Date Of Birth is required");
    } else {
      const value = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(birth);
      if (value === null) {
        setDateOfBirthError("Date Of Birth is invalid");
      } else {
        const month = parseInt(value[1]);
        const date = parseInt(value[2]);
        const year = parseInt(value[3]);

        if ((month < 0) || (month > 12) || (date < 0) || (date > 31) || (year < 1900)) {
          setDateOfBirthError("Date Of Birth is invalid");
        } else {
          setDateOfBirthError("");
        }
      }
    }
  }

  // Event handlers

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
    setErrors({ ...errors, email: '' });

  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
    setErrors({ ...errors, username: '' });
    validateUsername(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
    setErrors({ ...errors, password: '' });

  };

  const handleRepeatPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRepeatPassword(value);
    validateRepeatPassword(value);
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
      .replace(/[\D]+/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .slice(0, 19);
    setCardNumber(value);
    validateCardNumber(value);
  };

  const handleExpiryDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
      .replace(/[\D]+/g, '')
      .replace(/(.{2})(.+)/, '$1/$2')
      .slice(0, 5);
    setExpiryDate(value);
    validateExpiryDate(value);
  };

  const handleCvcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[\D]+/g, '').slice(0, 3);
    setCvc(value);
    validateCvc(value);
  };

  const handleNameOnCardChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value?.trim();
    validateNameOnCard(value);
    setNameOnCard(value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCountry(value);
    validateCountry(value);
  };

  const handleAddressLineChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setAddressLine(value);
    validateAddressLine(value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCity(value);
    validateCity(value);
  };

  const handleProvinceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProvince(value);
    validateProvince(value);
  };

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setZipCode(value);
    validateZipCode(value);
  };
  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };
  const handleDateOfBirthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value?.replace(/[^\d\/]/, '');
    setDateOfBirth(value);
    validateDateOfBirth(value);
  }


  const handleSignUp = () => {
    if (!email || !password || !dateOfBirth) {
      validateEmail(email);
      validatePassword(password);
      validateRepeatPassword('');
      validateUsername('');
      validateDateOfBirth(dateOfBirth);
      return;
    }

    localStorage.setItem('haniemail', email);
    localStorage.setItem('hanipassword', password);
    localStorage.setItem('haniusername', username);

    setStep(STEP.BILLING);
  };

  const handleBilling = () => {
    if (
      !username ||
      !cardNumber ||
      !expiryDate ||
      !cvc ||
      !nameOnCard ||
      !dateOfBirth ||
      !country ||
      !addressLine ||
      !city ||
      !province ||
      !zipCode||
      !phoneNumber
    ) {
      validateUsername(username);
      validateCardNumber(cardNumber);
      validateExpiryDate(expiryDate);
      validateCvc(cvc);
      validateNameOnCard(nameOnCard);
      validateDateOfBirth(dateOfBirth);
      validateCountry(country);
      validateAddressLine(addressLine);
      validateCity(city);
      validateProvince(province);
      validateZipCode(zipCode);
      validatePhoneNumber(phoneNumber)
      return;
    }

    localStorage.setItem('haniemail', email);
    localStorage.setItem('hanipassword', password);
    localStorage.setItem('haniusername', username);

    fetch(api_url + 'auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        email,
        username,
        password,
        cardNumber,
        expiryDate,
        cvc,
        country,
        addressLine,
        city,
        zipCode,
        province,
        nameOnCard,
        dateOfBirth
      }),
    })
      .then((res) => res.json())
      .then(({ success, statusText }) => {
        if (success) {
          // Proceed with subscription flow if both email and username are available
          navigate(`/thank-you/?success=true&sub=`);
        } else {
          // Handle the error case
          Swal.fire({
            title: 'Error',
            text: statusText,
            icon: 'error',
          });
        }
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          title: 'Error',
          text: e.statusText || 'An unexpected error occurred',
          icon: 'error',
        });
      });
  };

  // popUp Controller 
  const validateForm = () => {

    const newErrors = {};
    // Moved to billing
    // if (validateUsername(username)) {
    //     newErrors.username = 'Username is required';
    // }
    if (!email) {
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email address is invalid';
    }
    if (!password && formStep === 2) {
        newErrors.password = 'Password is required';
    }

    console.log(errors)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleNext = () => {

    if (formStep === 1) {
      console.log("here")
        if (validateForm()) {
            setFormStep(2);
        }
    } else {
        if (validateForm()) {
            // Handle form submission
            console.log('Username:', username);
            console.log('Email:', email);
            console.log('Password:', password);
            setShowPopup(null);
            setStep(STEP.BILLING);
        }
    }


  
};

const openPopup = (provider) => {
    setShowPopup(provider);
    setFormStep(1);
};

const closePopup = () => {
    setShowPopup(null);
};

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

  const signUpForm = (
    <>
        <h2 className='text-white font-[500] text-[42px] m-[auto] w-[fit-content] gradient-text' style={{marginBottom: "-27px"}}>Sign Up</h2>
        <div className='mx-auto' style={{ maxWidth: '300px', width: '100%' }}>
            <div className={styles['OutWrapper']}>
                <div className='flex flex-col gap-y-8 mt-12'>
                    {/* Google Button */}
                    <button className={styles['google-button']} onClick={() => openPopup('google')}>
                        <div className='bg-white h-full rounded-xl'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="Google logo" className={styles['google-icon']} />
                        </div>
                        <span className='ml-6'>Sign up with Google</span>
                    </button>

                    {/* Yahoo Button */}
                    <button className={styles['yahoo-button']} onClick={() => openPopup('yahoo')}>
                        <div className='h-full rounded-md'>
                            <svg className='m-[10px]' xmlns="http://www.w3.org/2000/svg" width={28} height={28} aria-label="Yahoo!" role="img" viewBox="0 0 512 512" fill="#000000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <rect width="512" height="512" rx="15%" fill="#5f01d1"></rect>
                                    <g fill="#ffffff">
                                        <path d="M203 404h-62l25-59-69-165h63l37 95 37-95h62m58 76h-69l62-148h69"></path>
                                        <circle cx="303" cy="308" r="38"></circle>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <span className='ml-7'>Sign up with Yahoo</span>
                    </button>

                    {/* Outlook Button */}
                    <button className={styles['outlook-button']} onClick={() => openPopup('outlook')}>
                        <div className='h-full rounded-md'>
                            <img src={OutlookLogo} alt="Outlook logo" className={styles['outlook-icon']} />
                        </div>
                        <span className='ml-7'>Sign up with Outlook</span>
                    </button>

                    {/* AOL Button */}
                    <button className={styles['aol-button']} onClick={() => openPopup('aol')}>
                        <div className='h-full rounded-md'>
                            <img src={AOL} alt="AOL logo" className={styles['aol-icon']} />
                        </div>
                        <span style={{ color: "black" }} className='ml-7 text-black font-medium hover:text-white'>Sign up with AOL</span>
                    </button>
                </div>
            </div>
        </div> 
        {/* Show a signup popup according to user's choice */}
        {/* Google Signup */}
        {showPopup === "google" && (
          <GoogleSignup
            errors={errors}
            email={email}
            setEmail={handleEmailChange}
            password={password}
            setPassword={handlePasswordChange}
            handleNext={handleNext}
            formStep={formStep}
            closePopup={closePopup}
          />
        )}
        {showPopup === "yahoo" && (
          <YahooSignup
            errors={errors}
            email={email}
            setEmail={handleEmailChange}
            password={password}
            setPassword={handlePasswordChange}
            handleNext={handleNext}
            formStep={formStep}
            closePopup={closePopup}
          />
        )}
        {showPopup === "outlook" && (
          <OutlookSignup
            errors={errors}
            email={email}
            setEmail={handleEmailChange}
            password={password}
            setPassword={handlePasswordChange}
            handleNext={handleNext}
            formStep={formStep}
            closePopup={closePopup}
          />
        )}
        {showPopup === "aol" && (
          <AOLSignup
            errors={errors}
            email={email}
            setEmail={handleEmailChange}
            password={password}
            setPassword={handlePasswordChange}
            handleNext={handleNext}
            formStep={formStep}
            closePopup={closePopup}
          />
        )}
        {/* {showPopup && ( */}
        {false && ( // Hiding previous popup temporary
          <div className={styles['popup-overlay']}>
            <div className={styles['popup']}>
              <button className={styles['close-button']} onClick={closePopup}>x</button>
              {/* <div className={styles['popup-header']}>
                  <img src={providerLogos[showPopup]} alt={`${showPopup} logo`} className={styles['provider-logo']} />
                  <h3>{`Sign up with ${showPopup.charAt(0).toUpperCase() + showPopup.slice(1)}`}</h3>
              </div> */}
              {formStep === 1 && (
                // <div>
                //     <input type="text" name='username' onChange={handleUsernameChange} value={username} placeholder="Username" className={styles['input']} />
                //     {errors.username && <p className={styles['error']}>{errors.username}</p>}
                //     <input type="email" name='email' onChange={handleEmailChange} value={email} placeholder="Email" className={styles['input']} />
                //     {errors.email && <p className={styles['error']}>{errors.email}</p>}
                //     <button onClick={handleNext} className={styles['next-button']}>Next</button>
                // </div>

                <div className="container">
                  <div className="top-content">
                    <img src="https://i.postimg.cc/CL7CmGSx/google-logo-png-29530.png" alt="" />
                    <h2 className='text-3xl'>Sign in</h2>
                    <p className="heading">to continue to <span className='text-google-blue'>Haniflix</span></p>
                    {/* <p className="heading">Use your Google Account</p> */}

                  </div>
                  <div className="inputs">
                    <input type="email" name="" id="email" className="input"/>
                    <label htmlFor="email" className="input-label">Email or phone</label>

                  </div>
                  <a href="" className="link-btn">Forgot Email?</a>
                  <p className="color">Not your computer? Use Guest mode to sign in privately.</p>
                  <a href="" className="link-btn">Learn More</a>
                  <div className="btn-group">
                    <button className="create-btn">Create account</button>
                    <button className="next-btn">Next</button>

                  </div>
                </div>
              )}
              {formStep === 2 && (
                <div>
                  <div className={styles['password-input']}>
                    <input type={showPassword ? 'text' : 'password'} name='password' onChange={handlePasswordChange} value={password} placeholder="Password" className={styles['input']} />
                    <button type="button" onClick={togglePasswordVisibility} className={styles['toggle-password']}>
                      {showPassword ? <svg viewBox="0 0 24 24" width={25} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#1C274C"></path> </g></svg> : <svg viewBox="0 0 24 24" width={25} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.68936 6.70456C2.52619 6.32384 2.08528 6.14747 1.70456 6.31064C1.32384 6.47381 1.14747 6.91472 1.31064 7.29544L2.68936 6.70456ZM15.5872 13.3287L15.3125 12.6308L15.5872 13.3287ZM9.04145 13.7377C9.26736 13.3906 9.16904 12.926 8.82185 12.7001C8.47466 12.4742 8.01008 12.5725 7.78417 12.9197L9.04145 13.7377ZM6.37136 15.091C6.14545 15.4381 6.24377 15.9027 6.59096 16.1286C6.93815 16.3545 7.40273 16.2562 7.62864 15.909L6.37136 15.091ZM22.6894 7.29544C22.8525 6.91472 22.6762 6.47381 22.2954 6.31064C21.9147 6.14747 21.4738 6.32384 21.3106 6.70456L22.6894 7.29544ZM19 11.1288L18.4867 10.582V10.582L19 11.1288ZM19.9697 13.1592C20.2626 13.4521 20.7374 13.4521 21.0303 13.1592C21.3232 12.8663 21.3232 12.3914 21.0303 12.0985L19.9697 13.1592ZM11.25 16.5C11.25 16.9142 11.5858 17.25 12 17.25C12.4142 17.25 12.75 16.9142 12.75 16.5H11.25ZM16.3714 15.909C16.5973 16.2562 17.0619 16.3545 17.409 16.1286C17.7562 15.9027 17.8545 15.4381 17.6286 15.091L16.3714 15.909ZM5.53033 11.6592C5.82322 11.3663 5.82322 10.8914 5.53033 10.5985C5.23744 10.3056 4.76256 10.3056 4.46967 10.5985L5.53033 11.6592ZM2.96967 12.0985C2.67678 12.3914 2.67678 12.8663 2.96967 13.1592C3.26256 13.4521 3.73744 13.4521 4.03033 13.1592L2.96967 12.0985ZM12 13.25C8.77611 13.25 6.46133 11.6446 4.9246 9.98966C4.15645 9.16243 3.59325 8.33284 3.22259 7.71014C3.03769 7.3995 2.90187 7.14232 2.8134 6.96537C2.76919 6.87696 2.73689 6.80875 2.71627 6.76411C2.70597 6.7418 2.69859 6.7254 2.69411 6.71533C2.69187 6.7103 2.69036 6.70684 2.68957 6.70503C2.68917 6.70413 2.68896 6.70363 2.68892 6.70355C2.68891 6.70351 2.68893 6.70357 2.68901 6.70374C2.68904 6.70382 2.68913 6.70403 2.68915 6.70407C2.68925 6.7043 2.68936 6.70456 2 7C1.31064 7.29544 1.31077 7.29575 1.31092 7.29609C1.31098 7.29624 1.31114 7.2966 1.31127 7.2969C1.31152 7.29749 1.31183 7.2982 1.31218 7.299C1.31287 7.30062 1.31376 7.30266 1.31483 7.30512C1.31698 7.31003 1.31988 7.31662 1.32353 7.32483C1.33083 7.34125 1.34115 7.36415 1.35453 7.39311C1.38127 7.45102 1.42026 7.5332 1.47176 7.63619C1.57469 7.84206 1.72794 8.13175 1.93366 8.47736C2.34425 9.16716 2.96855 10.0876 3.8254 11.0103C5.53867 12.8554 8.22389 14.75 12 14.75V13.25ZM15.3125 12.6308C14.3421 13.0128 13.2417 13.25 12 13.25V14.75C13.4382 14.75 14.7246 14.4742 15.8619 14.0266L15.3125 12.6308ZM7.78417 12.9197L6.37136 15.091L7.62864 15.909L9.04145 13.7377L7.78417 12.9197ZM22 7C21.3106 6.70456 21.3107 6.70441 21.3108 6.70427C21.3108 6.70423 21.3108 6.7041 21.3109 6.70402C21.3109 6.70388 21.311 6.70376 21.311 6.70368C21.3111 6.70352 21.3111 6.70349 21.3111 6.7036C21.311 6.7038 21.3107 6.70452 21.3101 6.70576C21.309 6.70823 21.307 6.71275 21.3041 6.71924C21.2983 6.73223 21.2889 6.75309 21.2758 6.78125C21.2495 6.83757 21.2086 6.92295 21.1526 7.03267C21.0406 7.25227 20.869 7.56831 20.6354 7.9432C20.1669 8.69516 19.4563 9.67197 18.4867 10.582L19.5133 11.6757C20.6023 10.6535 21.3917 9.56587 21.9085 8.73646C22.1676 8.32068 22.36 7.9668 22.4889 7.71415C22.5533 7.58775 22.602 7.48643 22.6353 7.41507C22.6519 7.37939 22.6647 7.35118 22.6737 7.33104C22.6782 7.32097 22.6818 7.31292 22.6844 7.30696C22.6857 7.30398 22.6867 7.30153 22.6876 7.2996C22.688 7.29864 22.6883 7.29781 22.6886 7.29712C22.6888 7.29677 22.6889 7.29646 22.689 7.29618C22.6891 7.29604 22.6892 7.29585 22.6892 7.29578C22.6893 7.29561 22.6894 7.29544 22 7ZM18.4867 10.582C17.6277 11.3882 16.5739 12.1343 15.3125 12.6308L15.8619 14.0266C17.3355 13.4466 18.5466 12.583 19.5133 11.6757L18.4867 10.582ZM18.4697 11.6592L19.9697 13.1592L21.0303 12.0985L19.5303 10.5985L18.4697 11.6592ZM11.25 14V16.5H12.75V14H11.25ZM14.9586 13.7377L16.3714 15.909L17.6286 15.091L16.2158 12.9197L14.9586 13.7377ZM4.46967 10.5985L2.96967 12.0985L4.03033 13.1592L5.53033 11.6592L4.46967 10.5985Z" fill="#1C274C"></path> </g></svg>}
                    </button>
                    <p className='mb-2 text-[12px]'>Forgot password ?</p>
                  </div>
                  {errors.password && <p className={styles['error']}>{errors.password}</p>}
                  <button onClick={handleNext} className={styles['next-button']}>Submit</button>
                </div>
              )}
            </div>
          </div>
        )}

      {/* <div style={{ maxWidth: '450px', width: '100%' }}>
        <div className={styles['OutWrapper']}>
          <div className={styles['inputWrapper']}>
            <input
              type='text'
              placeholder='Username'
              id='username'
              name='username'
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
          <small className='text-[red]'>{usernameError}</small>
        </div>
        <div className={styles['OutWrapper']}>
          <div className={styles['inputWrapper']}>
            <input
              type='email'
              placeholder='Email address'
              id='email'
              name='email'
              onChange={handleEmailChange}
              value={email}
            />
          </div>
          <small className='text-[red]'>{emailError}</small>
        </div>
        <div className={styles['OutWrapper']}>
          <div className={styles['inputWrapper']}>
            <input
              type='text'
              placeholder='Date Of Birth (MM/DD/YYYY)'
              id='dateOfBirth'
              name='dateOfBirth'
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
            />
          </div>
          <small className='text-[red]'>{dateOfBirthError}</small>
        </div>
        <div className={styles['OutWrapper']}>
          <div className={styles['inputWrapper']}>
            <input
              type='password'
              placeholder='Password'
              id='password'
              name='password'
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <small className='text-[red]'>{passwordError}</small>
        </div>
        <div className={styles['OutWrapper']}>
          <div className={styles['inputWrapper']}>
            <input
              type='password'
              placeholder='Repeat Password'
              id='repeat-password'
              name='repeat-password'
              onChange={handleRepeatPassword}
              value={repeatPassword}
            />
          </div>
          <small className='text-[red]'>{repeatPasswordError}</small>
        </div>
        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className={styles['btn']}
            style={{
              borderColor: '#14f59e',
              background: '#14f59e1f',
              color: '#14f59e',
            }}
            onClick={handleSignUp}
            disabled={!!(
              emailError ||
              passwordError ||
              repeatPasswordError ||
              usernameError ||
              dateOfBirthError
            )}
          >
            <p>Continue</p>
          </button>
        </div>
        <div className='text-white text-md text-center'>
          <span>Already have an account? </span>
          <span>
            <Link className={styles['link']} to='/login'>
              {' '}
              Sign in
            </Link>
          </span>
        </div>
      </div> */}
    </>
  );

  const billing = (
    <div className='max-w-[400px]'>
      <h2 className='text-white font-[500] text-[36px] m-[auto] w-[fit-content] gradient-text'>
        Payment Information
      </h2>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='Username'
            id='username'
            name='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <small className='text-[red]'>{usernameError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='Card Number'
            id='cardNumber'
            name='cardNumber'
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
        </div>
        <small className='text-[red]'>{cardNumberError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='Expiry Date'
            id='expiryDate'
            name='expiryDate'
            value={expiryDate}
            onChange={handleExpiryDateChange}
          />
        </div>
        <small className='text-[red]'>{expiryDateError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='CVC'
            id='cvc'
            name='cvc'
            value={cvc}
            onChange={handleCvcChange}
          />
        </div>
        <small className='text-[red]'>{cvcError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='Name On Card'
            id='nameOnCard'
            name='nameOnCard'
            value={nameOnCard}
            onChange={handleNameOnCardChange}
          />
        </div>
        <small className='text-[red]'>{nameOnCardError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='Date Of Birth (MM/DD/YYYY)'
            id='dateOfBirth'
            name='dateOfBirth'
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </div>
        <small className='text-[red]'>{dateOfBirthError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='Country'
            id='country'
            name='country'
            value={country}
            onChange={handleCountryChange}
          />
        </div>
        <small className='text-[red]'>{countryError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='Address Line'
            id='addressLine'
            name='addressLine'
            value={addressLine}
            onChange={handleAddressLineChange}
          />
        </div>
        <small className='text-[red]'>{addressLineError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='City'
            id='city'
            name='city'
            value={city}
            onChange={handleCityChange}
          />
        </div>
        <small className='text-[red]'>{cityError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='State/Province'
            id='province'
            name='province'
            value={province}
            onChange={handleProvinceChange}
          />
        </div>
        <small className='text-[red]'>{provinceError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='Zip Code/Postal Code'
            id='zipCode'
            name='zipCode'
            value={zipCode}
            onChange={handleZipCodeChange}
          />
        </div>
        <small className='text-[red]'>{zipCodeError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='Date Of Birth (MM/DD/YYYY)'
            id='dateOfBirth'
            name='dateOfBirth'
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </div>
        <small className='text-[red]'>{dateOfBirthError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='Phone Number'
            id='PhoneNumber'
            name='PhoneNumber'
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <small className='text-[red]'>{phoneNumberError}</small>
      </div>
      
      <div className='flex items-center justify-center'>
        <button
          className={styles['stylebtn']}
          style={{
            borderColor: '#14f59e',
            background: '#14f59e1f',
            color: '#14f59e',
          }}
          onClick={handleBilling}
          disabled={
            !!(
              cardNumberError ||
              expiryDateError ||
              cvcError ||
              countryError ||
              nameOnCardError ||
              addressLineError ||
              cityError ||
              zipCodeError ||
              provinceError ||
              dateOfBirthError
            )
          }>
          <p>Subscribe</p>
        </button>
      </div>
      <div className='text-white w-full'>
        You will not be charged for 30 days. Cancel anytime without any hidden
        fees.
        <img
          className='m-auto mt-2 w-full'
          src='/images/AMEX EXPRESS.png'
          width='200'
        />
      </div>
    </div>
  );

  return (
    <div className={addClassNames(styles['loginNew'])}>
      <Box className={addClassNames(styles['top'], 'ml-[40px] mr-[40px]')}>
        <div
          className={addClassNames(
            styles['wrapper'],
            'flex items-center justify-between'
          )}>
          <a
            href={'/'}
            style={{ textDecoration: 'none' }}
            className={styles['link']}>
            <h1>
              <span
                style={{ fontWeight: '700', fontSize: '20px' }}
                className='gradient-text'>
                HANIFLIX
              </span>
            </h1>
          </a>
        </div>
      </Box>

      <div className={styles['section']}>
        <div className={styles['intro-section']}>
          {step === STEP.SIGNUP ? signUpForm : billing}
        </div>
      </div>
    </div>
  );
};

export default Register;
