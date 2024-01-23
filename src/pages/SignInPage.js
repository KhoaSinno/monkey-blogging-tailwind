import { IconEyeClose, IconEyeOpen } from 'components/icon';
import React, { createContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { Field } from 'components/field';
import { Button } from 'components/button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from 'firebase-app/firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from 'contexts/auth-context';

export const ContextSignIn = createContext()


const schema = yup.object({
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
});

const SignInPage = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const [toggle, setToggle] = useState(false);
    const { userInfo } = useAuth()

    // side effect
    // useEffect(() => {
    //     if (!userInfo) navigate('sign-up')
    //     else navigate('/')
    // }, []);

    // handle function
    const handleSignIn = async (values) => {
        try {
            if (!isValid) return;

            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);

            // handle success
            console.log("🚀 ~ file: SignInPage.js:47 ~ handleSignIn ~ userCredential:", userCredential)
            console.log("Logged in user:", userCredential.user);
            toast.success('Sign in success!');

            navigate('/');
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-disabled' || error.code === 'auth/user-not-found') {
                toast.error('Invalid email or password. Please try again.');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Wrong password. Please try again.');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };
    const changeToggle = (e) => {
        e.preventDefault()
        setToggle(!toggle)
    }

    // preparing data
    const type = toggle ? 'text' : 'password'
    const data = { type }

    return (
        <ContextSignIn.Provider value={data}>
            <div className='p-10 min-h-dvh'>
                <div className="container">
                    <NavLink to='/'>
                        <img alt="monkey-blogging" srcSet="/logo.png 2x" className='m-[0_auto_30px]' />
                        <h1 className="heading text-center text-[#1DC071] font-bold text-3xl tracking-wide">Monkey Blogging</h1>
                    </NavLink>
                    <form className='p-[0_3rem]' onSubmit={handleSubmit(handleSignIn)}>
                        <Field
                            id='email'
                            control={control}
                            placeholder='Your email'
                            content='Email address:'
                            typeInput='text'
                            errors={errors}
                            classContainer='m-[1.5rem_auto_.3rem]'
                        ></Field>
                        <Field
                            id='password'
                            control={control}
                            placeholder='Your password'
                            content='Password:'
                            isToggleShowHide
                            errors={errors}
                            classContainer='m-[1.5rem_auto_.3rem]'
                        >{toggle ? <IconEyeOpen onClick={changeToggle}></IconEyeOpen> : <IconEyeClose onClick={changeToggle}></IconEyeClose>}</Field>
                        <p className='flex gap-2 max-w-[500px] m-[1.5rem_auto_.3rem]'>You haven't been had an account ? <NavLink to='/sign-up' className='font-semibold text-green-400'>SignUp</NavLink></p>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            isSubmitting={isSubmitting}
                            classContainer='max-w-[200px] m-[1rem_auto_.3rem] pt-6'
                            classBtn='gradientBtnPrimary text-white'

                        >Login</Button>
                    </form>
                </div>
            </div>
        </ContextSignIn.Provider>
    );
};

export default SignInPage;