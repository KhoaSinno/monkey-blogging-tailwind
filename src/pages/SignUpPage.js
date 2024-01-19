import { IconEyeClose, IconEyeOpen } from 'components/icon';
import React, { createContext, useState } from 'react';
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { Field } from 'components/field';
import { Button } from 'components/button';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from 'firebase-app/firebase-config';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from 'contexts/auth-context';
import slugify from "slugify";
import { userRole, userStatus } from 'utils/constants';

export const ContextSignUp = createContext()

const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
});

const SignUpPage = () => {
    const { setUserInfo } = useAuth()
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

    const handleSignUp = async (values) => {
        try {
            if (!isValid) return;
            await createUserWithEmailAndPassword(auth, values.email, values.password);
            await updateProfile(auth.currentUser, {
                displayName: values.fullname,
                photoURL:
                    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            });

            //add new user in doc
            const newUser = {
                fullname: values.fullname,
                email: values.email,
                password: values.password,
                username: slugify(values.fullname, { lower: true }),
                avatar: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                status: userStatus.ACTIVE,
                role: userRole.USER,
                createdAt: serverTimestamp()
            }

            await setDoc(doc(db, "users", auth.currentUser.uid), newUser);
            console.log(auth.currentUser)
            // await setUserInfo(auth.currentUser)

            toast.success('Register success!')
            navigate('/')
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email is already in use. Please choose a different email.');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    }
    const changeToggle = (e) => {
        e.preventDefault()
        setToggle(!toggle)
    }
    const type = toggle ? 'text' : 'password'
    const data = { type }
    return (
        <ContextSignUp.Provider value={data}>
            <div className='p-10 min-h-dvh'>
                <div className="container">
                    <NavLink to='/'>
                        <img alt="monkey-blogging" srcSet="/logo.png 2x" className='m-[0_auto_30px]' />
                        <h1 className="heading text-center text-[#1DC071] font-bold text-3xl tracking-wide">Monkey Blogging</h1>
                    </NavLink>
                    <form className='p-[0_3rem]' onSubmit={handleSubmit(handleSignUp)}>
                        <Field
                            id='fullname'
                            control={control}
                            placeholder='Your fullname'
                            content='Fullname:'
                            typeInput='text'
                            errors={errors}
                            classContainer='m-[1.5rem_auto_.3rem]'
                        ></Field>
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
                        <p className='flex gap-2 max-w-[500px] m-[1.5rem_auto_.3rem]'>You already have an account ? <NavLink to='/sign-in' className='font-semibold text-green-400'>Login</NavLink></p>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            isSubmitting={isSubmitting}
                            classContainer='max-w-[200px] m-[1rem_auto_.3rem] pt-6 '
                            classBtn='gradientBtnPrimary text-white'
                        >Sign Up</Button>
                    </form>
                </div>
            </div>
        </ContextSignUp.Provider>
    );
};

export default SignUpPage;