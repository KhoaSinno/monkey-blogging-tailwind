import useFirebaseImage from "hooks/useFirebaseImage";
import Toggle from "components/toggle/Toggle";
import slugify from "slugify";
import React, { useEffect, useState } from "react";
import ImageUpload from "components/image/ImageUpload";
import { useForm } from "react-hook-form";
import { useAuth } from "contexts/auth-context";
import { toast } from "react-toastify";
import { Radio } from "components/checkbox";
import { postStatus } from "utils/constants";
import { Label } from "components/label";
import { Field, FieldCheckboxes } from "components/field";
import { Dropdown } from "components/dropdown";
import { db } from "firebase-app/firebase-config";
import { Button } from "components/button";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import DashboardHeading from "Module/dashboard/DashboardHeading";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import useImageFirebase from "hooks/useImageFirebase";
import { useDropdown } from "components/dropdown/dropdown-context";
import CategorySelected from "Module/category/CategorySelected";

const defaultValues = {
  title: "",
  slug: "",
  status: 2,
  hot: false,
  image: "",
  category: {},
  user: {},
}
const PostAddNew = () => {
  const { userInfo } = useAuth();
  console.log("🚀 ~ PostAddNew ~ userInfo:", userInfo)
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
  });
  const watchStatus = watch("status"); // custom input radio so i use watch to control
  const watchHot = watch("hot");
  const { progress, image, handleResetUpload, handleSelectImage, handleDeleteImage } = useImageFirebase(setValue, getValues)

  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState({});
  // side effect 
  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email]);

  useEffect(() => {
    const getPost = async () => {
      const categoriesCol = collection(db, 'categories');
      const q = query(categoriesCol, where('status', '==', 1))

      const querySnapshot = await getDocs(q);
      const categories = []
      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() })
      });
      setCategories(categories);
    }
    getPost()
      .catch(console.error);
  }, []);

  // handle function
  const addPostHandler = async (values) => {
    const _values = { ...values }
    _values.slug = slugify(values.slug || values.title)
    _values.status = +values.status
    _values.image = image
    _values.user = userInfo.uid

    console.log("🚀 ~ file: PostAddNew.js:57 ~ addPostHandler ~ e:", _values)
    await addDoc(collection(db, "posts"), { ..._values, image, createdAt: serverTimestamp() });
    // reset(defaultValues)
    // setCategory({})
    // handleResetUpload()
  }
  const handleClickOption = (item) => {
    setValue('category', item.id)
    setCategory(item)
    // setValue('user', userInfo.uid)
  }

  return (
    <>
      <DashboardHeading title="Add post" desc="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          id='title'
          control={control}
          placeholder='Enter your title'
          content='Title:'
          typeInput='text'
          // errors={errors}
          required
          full
          classContainer='m-0'
        ></Field>
        <Field
          id='slug'
          control={control}
          placeholder='Enter your slug'
          content='Slug:'
          typeInput='text'
          // errors={errors}
          required
          full
          classContainer='m-0'
        ></Field>
        <div className="flex flex-col gap-y-3">
          <Label>Image</Label>
          <ImageUpload
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            className="h-[250px]"
            progress={progress}
            image={image}
          ></ImageUpload>
        </div>
        <div className="flex flex-col gap-y-3 pb-7 pb-md-0">
          <Label>Category</Label>
          <Dropdown>
            <Dropdown.Select placeholder={category?.name ? category.name : "Select the category"}></Dropdown.Select>
            <Dropdown.List>
              {categories.length > 0 &&
                categories.map((item) => (
                  <Dropdown.Option
                    key={item.id}
                    onClick={() => handleClickOption(item)}
                  >
                    {item.name}
                  </Dropdown.Option>
                ))}
            </Dropdown.List>
            <CategorySelected category={category}></CategorySelected>

          </Dropdown>
          {selectCategory?.name && (
            <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
              {selectCategory?.name}
            </span>
          )}
        </div>
        <div className="flex gap-x-5 items-center">
          <Label>Feature post</Label>
          <Toggle
            on={watchHot === true}
            onClick={() => setValue("hot", !watchHot)}
          ></Toggle>
        </div>
        <div className="flex gap-x-5 items-center">
          <Label>Status</Label>
          <FieldCheckboxes>
            <Radio
              name="status"
              control={control}
              checked={Number(watchStatus) === postStatus.APPROVED}
              value={postStatus.APPROVED}
            >
              Approved
            </Radio>
            <Radio
              name="status"
              control={control}
              checked={Number(watchStatus) === postStatus.PENDING}
              value={postStatus.PENDING}
            >
              Pending
            </Radio>
            <Radio
              name="status"
              control={control}
              checked={Number(watchStatus) === postStatus.REJECTED}
              value={postStatus.REJECTED}
            >
              Reject
            </Radio>
          </FieldCheckboxes>
        </div>
        <Button
          type="submit"
          classBtn="gradientBtnPrimary text-white"
          isSubmitting={loading}
          disabled={loading}
          classContainer='md:col-span-2 items-center'
        >
          Add new post
        </Button>
      </form >
    </>
  );
};

export default PostAddNew;


/**
useEffect(() => {
  async function fetchUserData() {
    if (!userInfo.email) return;
    const q = query(
      collection(db, "users"),
      where("email", "==", userInfo.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setValue("user", {
        id: doc.id,
        ...doc.data(),
      });
    });
  }
  fetchUserData();
}, [userInfo.email]);
 
const addPostHandler = async (values) => {
  setLoading(true);
  try {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title, { lower: true });
    cloneValues.status = Number(values.status);
    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      ...cloneValues,
      image,
      createdAt: serverTimestamp(),
    });
    toast.success("Create new post successfully!");
    reset({
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      image: "",
      user: {},
    });
    handleResetUpload();
    setSelectCategory({});
  } catch (error) {
    setLoading(false);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  async function getData() {
    const colRef = collection(db, "categories");
    const q = query(colRef, where("status", "==", 1));
    const querySnapshot = await getDocs(q);
    let result = [];
    querySnapshot.forEach((doc) => {
      result.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setCategories(result);
  }
  getData();
}, []);

useEffect(() => {
  document.title = "Monkey Blogging - Add new post";
}, []);

const handleClickOption = async (item) => {
  const colRef = doc(db, "categories", item.id);
  const docData = await getDoc(colRef);
  setValue("category", {
    id: docData.id,
    ...docData.data(),
  });
  setSelectCategory(item);
};
*/