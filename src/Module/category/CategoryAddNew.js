import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "Module/dashboard/DashboardHeading";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { categoryStatus } from "utils/constants";
import slugify from "slugify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { toast } from "react-toastify";

const defaultValues = {
  name: "",
  slug: "",
  status: 1,
  createdAt: new Date()
}

const CategoryAddNew = () => {
  const {
    control, setValue, formState: { errors, isSubmitting, isValid }, watch, handleSubmit, reset } = useForm({
      mode: "onChange",
      defaultValues: defaultValues,
    });
  const watchStatus = watch('status')
  const [loading, setLoading] = useState(false);

  // handler
  const handleAddNewCategory = async (values) => {
    if (!isValid) return
    try {
      setLoading(true)
      const _values = { ...values }
      _values.slug = slugify(values.slug || values.name)
      _values.status = +values.status
      console.log("🚀 ~ handleAddNewCategory ~ values:", _values)

      await addDoc(collection(db, "categories"), { ..._values, createdAt: serverTimestamp() });
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
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="form-layout">
          <Field
            id='name'
            control={control}
            placeholder='Enter your category name'
            content='Name:'
            typeInput='text'
            required
            full
            classContainer='mb-5 lg:mb-0'
          ></Field>
          <Field
            id='slug'
            control={control}
            placeholder='Enter your slug'
            content='Slug:'
            typeInput='text'
            full
          ></Field>
        </div>
        <div className="form-layout">
          <div>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
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
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
