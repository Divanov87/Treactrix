import { Link, Navigate } from 'react-router-dom';

import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

import styles from '../register/Register.module.css';


export default function Login() {

    const { login, isLogged } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    if (isLogged) {
        return <Navigate to="/" />
    }

    const passShowHandler = () => {
        setShowPassword(prevState => !prevState);
    };

    const [formData, setFormData] = useState({
        username_email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        username_email: '',
        password: '',
    });

    const [loginError, setLoginError] = useState('');

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'username_email':
                if (value.length < 3) {
                    error = 'Username/Email must be at least 3 characters!';
                }
                break;
            case 'password':
                if (value.length < 8) {
                    error = 'Password must be at least 8 characters!';
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
                await login(formData.username_email, formData.password);

                console.log('Login successful');
            } catch (error) {
                console.error('Login error:', error);
                if (error instanceof Error) {
                    setLoginError('Invalid username/email or password!');
                } else if (typeof error === 'object' && error.error) {
                    setLoginError(error.error);
                } else {
                    setLoginError('Something went wrong. Please try again.');
                }
            }
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <article>
            <section className={styles['movie-detail']}>
                <p className='section-subtitle'>Login</p>
                <h2 className='h2 section-title'>
                    Please, enter your <strong>details</strong>
                </h2>
                <div className={styles['container-reg-log-edit']}>
                    <div className={styles['wrapper']}>
                        <form onSubmit={submitHandler}>
                            <h1>Login</h1>

                            <div className={styles['input-box']}>
                                <input
                                    type="text"
                                    name="username_email"
                                    placeholder="Username or Email"
                                    value={formData.username_email}
                                    onChange={onChangeHandler}
                                    required
                                />
                                <i className='bx bxs-user'></i>
                            </div>
                            {formErrors.username_email && <p className={styles['error']}>{formErrors.username_email}</p>}

                            <div className={styles['input-box']}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={onChangeHandler}
                                    required
                                />
                                <i
                                    className={showPassword ? 'bx bxs-lock-open-alt' : 'bx bxs-lock-alt'}
                                    onClick={passShowHandler}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </div>
                            {formErrors.password && <p className={styles['error']}>{formErrors.password}</p>}

                            {loginError && <p className={styles['error']}>{loginError}</p>}

                            <button type="submit" className={styles['btn']} >
                                Login
                            </button>

                            <div className={styles['register-link']}>
                                <p>
                                    <strong>
                                        Don't have an account? <Link to="/auth/register">Register</Link>
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