import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import styles from '../register/Register.module.css';

export default function Register() {
    const { register, isLogged } = useAuth();

    if (isLogged) {
        return <Navigate to="/" />;
    }

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        repeatPassword: '',
        email: '',
        city: '',
    });

    const [formErrors, setFormErrors] = useState({
        username: '',
        password: '',
        repeatPassword: '',
        email: '',
        city: '',
    });

    const [registrationError, setRegistrationError] = useState('');

    const validEmail = /^[a-zA-Z0-9._-]{3,}@(gmail\.com|abv\.bg|mail\.bg)$/;

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'username':
                if (value.length < 3) {
                    error = 'Username must be at least 3 characters!';
                }
                break;
            case 'password':
                if (value.length < 8) {
                    error = 'Password must be at least 8 characters!';
                }
                break;
            case 'repeatPassword':
                if (value !== formData.password) {
                    error = 'Passwords do not match!';
                }
                break;
            case 'email':
                if (!validEmail.test(value)) {
                    error = 'Invalid email address!';
                }
                break;
            case 'city':
                if (value.length < 3) {
                    error = 'City must be at least 3 characters!';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        const error = validateField(name, value);
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        let errors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                errors[key] = error;
            }
        });

        if (Object.keys(errors).length === 0) {
            try {
                await register(
                    formData.username,
                    formData.password,
                    formData.repeatPassword,
                    formData.email,
                    formData.city
                );
                console.log('Registration successful');
            } catch (error) {
                console.error('Registration error:', error);

                // Extract the exact error message from the server response
                const errorMessage = error.response?.data?.error;
                if (errorMessage) {
                    setRegistrationError(errorMessage);
                } else {
                    setRegistrationError(`User with username [${formData.username}] or email [${formData.email}] already exists!`);
                }
            }
        } else {
            setFormErrors(errors);
        }
    };

    const isFormInvalid = Object.keys(formErrors).some(key => formErrors[key] !== '') ||
                          formData.username === '' ||
                          formData.password === '' ||
                          formData.repeatPassword === '' ||
                          formData.email === '' ||
                          formData.city === '';

    return (
        <article>
            <section className={styles['movie-detail']}>
                <p className='section-subtitle'>Register</p>
                <h2 className='h2 section-title'>
                    Please, enter your <strong>details</strong>
                </h2>
                <div className={styles['container-reg-log-edit']}>
                    <div className={styles['wrapper']}>
                        <form onSubmit={submitHandler}>
                            <h1>Register</h1>

                            <div className={styles['input-box']}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={onChangeHandler}
                                    required
                                />
                                <i className='bx bxs-user'></i>
                            </div>
                            {formErrors.username && <p className={styles['error']}>{formErrors.username}</p>}

                            <div className={styles['input-box']}>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={onChangeHandler}
                                    required
                                />
                                <i className='bx bxs-lock-alt'></i>
                            </div>
                            {formErrors.password && <p className={styles['error']}>{formErrors.password}</p>}

                            <div className={styles['input-box']}>
                                <input
                                    type="password"
                                    name="repeatPassword"
                                    placeholder="Repeat password"
                                    value={formData.repeatPassword}
                                    onChange={onChangeHandler}
                                    required
                                />
                                <i className='bx bxs-lock-alt'></i>
                            </div>
                            {formErrors.repeatPassword && <p className={styles['error']}>{formErrors.repeatPassword}</p>}

                            <div className={styles['input-box']}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={onChangeHandler}
                                    required
                                />
                                <i className='bx bx-mail-send'></i>
                            </div>
                            {formErrors.email && <p className={styles['error']}>{formErrors.email}</p>}

                            <div className={styles['input-box']}>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={onChangeHandler}
                                    required
                                />
                                <i className='bx bxs-map'></i>
                            </div>
                            {formErrors.city && <p className={styles['error']}>{formErrors.city}</p>}

                            {registrationError && <p className={styles['error']}>{registrationError}</p>}

                            <button
                                type="submit"
                                className={`${styles['btn']} ${isFormInvalid ? styles['btn-disabled'] : ''}`}
                                disabled={isFormInvalid}
                                style={{
                                    backgroundColor: isFormInvalid ? 'grey' : '',
                                    cursor: isFormInvalid ? 'not-allowed' : 'pointer',
                                    color: isFormInvalid ? 'white' : ''
                                }}
                            >
                                Register
                            </button>

                            <div className={styles['register-link']}>
                                <p>
                                    <strong>
                                        Already have an account? <Link to="/auth/login">Login</Link>
                                    </strong>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </article>
    );
}
