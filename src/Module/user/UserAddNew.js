import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "Module/dashboard/DashboardHeading";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { userRole, userStatus } from "utils/constants";
import slugify from "slugify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

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

const defaultValues = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  status: userStatus.ACTIVE,
  role: userRole.USER,
  createdAt: new Date()
}
const UserAddNew = () => {
  const {
    control, setValue, formState: { errors, isSubmitting, isValid }, watch, handleSubmit, reset } = useForm({
      mode: "onChange",
      defaultValues: defaultValues,
      resolver: yupResolver(schema),
    });
  const watchStatus = watch('status')
  const watchRole = watch('role')
  const [loading, setLoading] = useState(false);

  // side effect

  // side func
  const handleAddNewUser = async (values) => {
    if (!isValid) return
    try {
      setLoading(true)
      const _values = { ...values }
      _values.slug = slugify(values.slug || values.name)
      _values.status = +values.status
      console.log("🚀 ~ handleAddNewCategory ~ values:", _values)

      await addDoc(collection(db, "users"), { ..._values, createdAt: serverTimestamp() });
      console.log("🚀 ~ handleAddNewUser ~ values:", values)

      toast.success('Add new Category Success')
      reset(defaultValues)
    } catch (error) {
      console.log("🚀 ~ addPostHandler ~ error:", error)
      toast.error(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewUser)}>
        <div className="form-layout">
          <Field
            id='fullname'
            control={control}
            errors={errors}
            placeholder='Enter your category fullname'
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
            placeholder='Enter your category username'
            content='Username:'
            typeInput='text'
            required
            full
            classContainer='mb-5 lg:mb-0'
          ></Field>
        </div>
        <div className="form-layout">
          <Field
            id='email'
            control={control}
            errors={errors}
            placeholder='Enter your category email'
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
            placeholder='Enter your category password'
            content='Password:'
            typeInput='password'
            required
            full
            classContainer='mb-5 lg:mb-0'
          ></Field>
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
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
