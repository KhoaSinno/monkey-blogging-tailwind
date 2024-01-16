import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "Module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { categoryStatus } from "utils/constants";

const defaultValues = {
  name: "",
  slug: "",
  status: 1,
  createdAt: new Date()
}

const CategoryAddNew = () => {
  const {
    control, setValue, formState: { errors, isSubmitting, isValid }, watch, handleSubmit } = useForm({
      mode: "onChange",
      defaultValues: defaultValues,
    });
  const watchStatus = watch('status')


  // handler
  const handleAddNewCategory = (values) => {
    console.log("🚀 ~ handleAddNewCategory ~ values:", values)

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
            required
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
          // isSubmitting={loading}
          // disabled={loading}
          classContainer='md:col-span-2 items-center'
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
