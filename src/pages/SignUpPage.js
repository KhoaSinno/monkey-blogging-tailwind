import { IconEyeOpen } from 'components/icon';
import React from 'react';
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { Field } from 'components/field';

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

    const SignUpPageStyles = styled.div`
    min-height: 100dvh;
    padding: 40px;
    .logo {
        margin: 0 auto 30px;
    }
    .heading {
        text-align: center;
        color: ${props => props.theme.primary};
        font-weight: 700;
        font-size: 2rem;
        letter-spacing: 2px;
    }
    .form{
        padding: 0 3rem;
    }
    .field{
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
    .inputGroup {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${props => props.theme.grayf1};
        padding: .8rem;
        border-radius: .3rem;
    }
    .input{
        width: 100%;
        background-color: transparent;
    }
    .email{
        font-weight: 700;
    }
    `

    return (
        <div className='p-10 min-h-dvh'>
            <div className="container">
                <img alt="monkey-blogging" srcSet="/logo.png 2x" className='m-[0_auto_30px]' />
                <h1 className="heading text-center text-[#1DC071] font-bold text-3xl tracking-wide">Monkey Blogging</h1>
                <form className='form'>
                    <Field
                        id='email'
                        control={control}
                        placeholder='Your email'
                        content='Email address:'
                    ></Field>
                    <Field
                        id='password'
                        control={control}
                        placeholder='Your password'
                        content='Password:'
                    ><IconEyeOpen ></IconEyeOpen></Field>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;