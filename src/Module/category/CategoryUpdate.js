import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { collection, doc, getDoc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import DashboardHeading from "Module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";

const CategoryUpdate = () => {
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const navigate = useNavigate();
  const watchStatus = watch('status')
  const [loading, setLoading] = useState(false);

  //side effect
  useEffect(() => {
    const getCategory = async () => {
      const categoryDocRef = doc(db, "categories", categoryId);
      const categoryDocSnap = await getDoc(categoryDocRef);

      if (categoryDocSnap.exists()) {
        const categoryData = { id: categoryDocSnap.id, ...categoryDocSnap.data() };
        reset(categoryData)
      } else {
        console.error("Category not found");
      }
    }
    getCategory()
      .catch(console.error);
  }, [categoryId, reset]);

  // side method
  const handleUpdateCategory = async (values) => {
    try {
      setLoading(true)
      const _values = { ...values }
      _values.slug = slugify(values.slug || values.name)
      _values.status = +values.status
      const categoriesRef = doc(db, "categories", categoryId);
      await updateDoc(categoriesRef, { ..._values, createdAt: serverTimestamp() })
      toast.success('Update success!')
      navigate('/manage/category')
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  if (!categoryId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
          classBtn="gradientBtnPrimary text-white w-[250px] "
          isSubmitting={loading}
          disabled={loading}
          classContainer='md:col-span-2 items-center'
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
