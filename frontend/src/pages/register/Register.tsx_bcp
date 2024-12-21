import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../Assets/css/styles.scss';
import { addClassNames } from '../../store/utils/functions';
import styles from './register.module.scss';
import { Link } from 'react-router-dom';

const api_url = import.meta.env.VITE_APP_API_URL;

enum STEP {
  SIGNUP,
  BILLING,
}

const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(STEP.SIGNUP);

  // sign up
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // billing
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvcError, setCvcError] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [nameOnCardError, setNameOnCardError] = useState('');
  const [billingAddressError, setBillingAddressError] = useState('');

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

  const validateBillingAddress = (address: string) => {
    if (!address) {
      setBillingAddressError('Billing address is required');
    } else {
      setBillingAddressError('');
    }
  };

  useEffect(() => {
    setIsFormValid(
      !emailError && !passwordError && !repeatPasswordError && !usernameError
    );
  }, [emailError, passwordError, repeatPasswordError, usernameError]);

  // Event handlers

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleRepeatPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRepeatPassword(value);
    validateRepeatPassword(value);
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
      .replace(/[\D]+/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .slice(0, 19);
    setCardNumber(value);
    validateCardNumber(value);
  };

  const handleExpiryDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    setNameOnCard(value);
    validateNameOnCard(value);
  };

  const handleBillingAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setBillingAddress(value);
    validateBillingAddress(value);
  };

  const handleSignUp = () => {
    if (!email || !password) {
      validateEmail(email);
      validatePassword(password);
      validateRepeatPassword('');
      validateUsername('');
      return;
    }

    localStorage.setItem('haniemail', email);
    localStorage.setItem('hanipassword', password);
    localStorage.setItem('haniusername', username);

    setStep(STEP.BILLING);
  };

  const handleBillingKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      handleBilling();
    }
  };

  const handleSignUpKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      handleSignUp();
    }
  };

  const handleBilling = () => {
    if (!cardNumber || !expiryDate || !cvc || !nameOnCard) {
      validateCardNumber(cardNumber);
      validateExpiryDate(expiryDate);
      validateCvc(cvc);
      validateNameOnCard(nameOnCard);
      return;
    }

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
        billingAddress,
        nameOnCard,
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

  const signUpForm = (
    <>
      <h2 className='text-white font-[500] text-[42px] m-[auto] w-[fit-content] gradient-text'>
        Sign Up
      </h2>
      <div style={{ maxWidth: '450px', width: '100%' }}>
        <div className={styles['OutWrapper']}>
          <div className={styles['inputWrapper']}>
            <input
              type='text'
              placeholder='Username'
              id='username'
              name='username'
              onChange={handleUsernameChange}
              value={username}
              onKeyDown={handleSignUpKeyDown}
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
              onKeyDown={handleSignUpKeyDown}
            />
          </div>
          <small className='text-[red]'>{emailError}</small>
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
              onKeyDown={handleSignUpKeyDown}
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
              onKeyDown={handleSignUpKeyDown}
            />
          </div>
          <small className='text-[red]'>{repeatPasswordError}</small>
        </div>
        <div className='flex items-center justify-center'>
          <button
            type="button"
            className={styles['btn']}
            style={{
              borderColor: '#14f59e',
              background: '#14f59e1f',
              color: '#14f59e',
            }}
            onClick={handleSignUp}
            disabled={!isFormValid}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSignUp();
              }
            }}
            >
            Continue
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
      </div>
    </>
  );

  const billing = (
    <div className='max-w-[400px]'>
      <h2 className='text-white font-[500] text-[42px] m-[auto] w-[fit-content] gradient-text'>
        Billing
      </h2>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='Card Number'
            id='cardNumber'
            name='cardNumber'
            value={cardNumber}
            onChange={handleCardNumberChange}
            onKeyDown={handleBillingKeyDown}
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
            onKeyDown={handleBillingKeyDown}
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
            onKeyDown={handleBillingKeyDown}
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
            onKeyDown={handleBillingKeyDown}
          />
        </div>
        <small className='text-[red]'>{nameOnCardError}</small>
      </div>
      <div className={styles['OutWrapper']}>
        <div className={styles['inputWrapper']}>
          <input
            type='text'
            placeholder='Billing Address'
            id='billingAddress'
            name='billingAddress'
            value={billingAddress}
            onChange={handleBillingAddressChange}
            onKeyDown={handleBillingKeyDown}
          />
        </div>
        <small className='text-[red]'>{billingAddressError}</small>
      </div>
      <div className='flex items-center justify-center'>
        <button
          className={styles['btn']}
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
              billingAddressError ||
              nameOnCardError
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
