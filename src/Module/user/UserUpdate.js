import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { collection, doc, getDoc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import useImageFirebase from "hooks/useImageFirebase";
import DashboardHeading from "Module/dashboard/DashboardHeading";
import React, { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { UserStatus, userRole, userStatus } from "utils/constants";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

export const ContextUserUpdate = createContext()
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

const UserUpdate = () => {
    const {
        control,
        reset,
        watch,
        handleSubmit,
        errors,
        formState: { isSubmitting }, setValue, getValues
    } = useForm({
        mode: "onChange",
        defaultValues: {},
        resolver: yupResolver(schema),
    });
    const [params] = useSearchParams();
    const userId = params.get("id");
    const navigate = useNavigate();
    const watchStatus = watch('status')
    const watchRole = watch('role')
    const watchImg = getValues('avatar')
    console.log("🚀 ~ UserUpdate ~ watchImg:", watchImg)
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const imgRegex = /%2F(\S+)\?/gm.exec(watchImg);
    const imgName = imgRegex?.length > 0 ? imgRegex[1] : ''
    console.log("🚀 ~ UserUpdate ~ imgName:", imgName)
    const { progress, image, handleResetUpload, handleSelectImage, handleDeleteImage, setImage } = useImageFirebase(setValue, getValues, imgName, handleDeleteImg)
    //side effect
    useEffect(() => {
        const getUser = async () => {
            const userDocRef = doc(db, "users", userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = { id: userDocSnap.id, ...userDocSnap.data() };
                reset(userData)
            } else {
                console.error("User not found");
            }
        }
        getUser()
            .catch(console.error);
    }, [userId, reset]);

    useEffect(() => {
        setImage(watchImg)
    }, [watchImg, setImage]);
    // side method

    async function handleDeleteImg() {
        const usersRef = doc(db, "users", userId);
        await updateDoc(usersRef, { avatar: '' })
    }

    const handleUpdateUser = async (values) => {
        try {
            setLoading(true)
            const _values = { ...values }
            _values.username = slugify(values.username || values.fullname,
                { lower: true, replacement: ' ', trim: true })
            _values.status = +values.status
            _values.role = +values.role
            if (image) _values.avatar = image
            console.log("🚀 ~ handleUpdateUser ~ _values:", _values)

            const usersRef = doc(db, "users", userId);
            await updateDoc(usersRef, { ..._values, createdAt: serverTimestamp() })
            toast.success('Update success!')
            navigate('/manage/user')
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const changeToggle = (e) => {
        e.preventDefault()
        setToggle(!toggle)
    }
    const type = toggle ? 'text' : 'password'
    const data = { type }
    if (!userId) return null;
    return (
        <ContextUserUpdate.Provider value={data}>
            <div>
                <DashboardHeading
                    title="Update user"
                    desc={`Update your user id: ${userId}`}
                ></DashboardHeading>
                <form onSubmit={handleSubmit(handleUpdateUser)}>
                    <div className="h-[250px] w-[250px] rounded-full border border-slate-500 mx-auto mb-10">
                        <ImageUpload
                            onChange={handleSelectImage}
                            handleDeleteImage={handleDeleteImage}
                            className="h-[250px] border-none text-2xl text-slate-500 rounded-full"
                            progress={progress}
                            image={image}
                            title='Your avatar'
                            srcImage='/user.png'
                            fullRadius
                        ></ImageUpload>
                    </div>
                    <div className="form-layout">
                        <Field
                            id='fullname'
                            control={control}
                            errors={errors}
                            placeholder='Enter your User fullname'
                            content='Fullname:'
                            typeInput='text'
                            required
                            full
                            classContainer='mb-5 lg:mb-0'
                        ></Field>
                        <Field
                            id='username'
                            control={control}
                            errors={errors}
                            placeholder='Enter your User username'
                            content='Username:'
                            typeInput='text'
                            full
                            classContainer='mb-5 lg:mb-0'
                        ></Field>
                    </div>
                    <div className="form-layout">
                        <Field
                            id='email'
                            control={control}
                            errors={errors}
                            placeholder='Enter your User email'
                            content='Email:'
                            typeInput='email'
                            required
                            full
                            classContainer='mb-5 lg:mb-0'
                        ></Field>
                        <Field
                            id='password'
                            control={control}
                            errors={errors}
                            placeholder='Enter your User password'
                            content='Password:'
                            // typeInput='password'
                            isToggleShowHide
                            required
                            full
                            classContainer='mb-5 lg:mb-0'
                        >
                            {toggle ? <IconEyeOpen onClick={changeToggle}></IconEyeOpen> : <IconEyeClose onClick={changeToggle}></IconEyeClose>}
                        </Field>
                    </div>
                    <div className="form-layout">
                        <div className="pb-5 lg:pb-0 flex flex-col gap-2">
                            <Label>Status:</Label>
                            <FieldCheckboxes>
                                <Radio name="status" control={control}
                                    checked={Number(watchStatus) === userStatus.ACTIVE}
                                    value={userStatus.ACTIVE}
                                >
                                    Active
                                </Radio>
                                <Radio name="status" control={control}
                                    checked={Number(watchStatus) === userStatus.PENDING}
                                    value={userStatus.PENDING}
                                >
                                    Pending
                                </Radio>
                                <Radio name="status" control={control}
                                    checked={Number(watchStatus) === userStatus.BAN}
                                    value={userStatus.BAN}
                                >
                                    Banned
                                </Radio>
                            </FieldCheckboxes>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Role:</Label>
                            <FieldCheckboxes>
                                <Radio name="role" control={control}
                                    checked={Number(watchRole) === userRole.ADMIN}
                                    value={userRole.ADMIN}
                                >
                                    Admin
                                </Radio>
                                <Radio name="role" control={control}
                                    checked={Number(watchRole) === userRole.MOD}
                                    value={userRole.MOD}
                                >
                                    Moderator
                                </Radio>
                                <Radio name="role" control={control}
                                    checked={Number(watchRole) === userRole.USER}
                                    value={userRole.USER}
                                >
                                    User
                                </Radio>
                            </FieldCheckboxes>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        classBtn="gradientBtnPrimary text-white w-[250px]"
                        isSubmitting={loading}
                        disabled={loading}
                        classContainer='md:col-span-2 items-center'
                    >
                        Update user
                    </Button>
                </form>
            </div>
        </ContextUserUpdate.Provider>
    );
};

export default UserUpdate;