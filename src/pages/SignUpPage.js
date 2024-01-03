import { IconEyeClose, IconEyeOpen } from 'components/icon';
import React, { createContext, useState } from 'react';
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { Field } from 'components/field';
import { Button } from 'components/button';

export const UserContext = createContext()

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

    const handleSignUp = (values) => {
        console.log(values)
    }
    const changeToggle = (e) => {
        e.preventDefault()
        setToggle(!toggle)
    }
    const type = toggle ? 'text' : 'password'
    const data = { type }
    return (
        <UserContext.Provider value={data}>
            <div className='p-10 min-h-dvh'>
                <div className="container">
                    <img alt="monkey-blogging" srcSet="/logo.png 2x" className='m-[0_auto_30px]' />
                    <h1 className="heading text-center text-[#1DC071] font-bold text-3xl tracking-wide">Monkey Blogging</h1>
                    <form className='p-[0_3rem]' onSubmit={handleSubmit(handleSignUp)}>
                        <Field
                            id='fullname'
                            control={control}
                            placeholder='Your fullname'
                            content='Fullname:'
                            typeInput='text'
                            errors={errors}
                        ></Field>
                        <Field
                            id='email'
                            control={control}
                            placeholder='Your email'
                            content='Email address:'
                            typeInput='text'
                            errors={errors}
                        ></Field>
                        <Field
                            id='password'
                            control={control}
                            placeholder='Your password'
                            content='Password:'
                            isToggleShowHide
                            errors={errors}
                        >{toggle ? <IconEyeOpen onClick={changeToggle}></IconEyeOpen> : <IconEyeClose onClick={changeToggle}></IconEyeClose>}</Field>
                        <Button type="submit" disabled={isSubmitting} isSubmitting={isSubmitting}>Sign Up</Button>
                    </form>
                </div>
            </div>
        </UserContext.Provider>
    );
};

export default SignUpPage;