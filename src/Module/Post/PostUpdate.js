import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import Toggle from "components/toggle/Toggle";
import { db } from "firebase-app/firebase-config";
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import useImageFirebase from "hooks/useImageFirebase";
import CategorySelected from "Module/category/CategorySelected";
import DashboardHeading from "Module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus, postStatus } from "utils/constants";

const PostUpdate = () => {
    const {
        control,
        reset,
        watch,
        handleSubmit,
        formState: { isSubmitting }, setValue, getValues
    } = useForm({
        mode: "onChange",
        defaultValues: {},
    });
    const [params] = useSearchParams();
    const postId = params.get("id");
    const navigate = useNavigate();
    const watchStatus = watch("status"); // custom input radio so i use watch to control
    const watchHot = watch("hot");
    const watchImg = watch("image");
    const imgName = getValues('image_name')
    const { progress, image, handleResetUpload, handleSelectImage, handleDeleteImage, setImage } = useImageFirebase(setValue, getValues, imgName, handleDeleteImg)
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({});
    const [user, setUser] = useState({});
    //side effect
    useEffect(() => {
        const getPosts = async () => {
            const postDocRef = doc(db, "posts", postId);
            const postDocSnap = await getDoc(postDocRef);

            if (postDocSnap.exists()) {
                const postData = { id: postDocSnap.id, ...postDocSnap.data() };
                reset(postData)
                setCategory(postData.category || {})
                setUser(postData.user || {})
                console.log("🚀 ~ getPosts ~ postData:", postData)
            } else {
                console.error("Post not found");
            }
        }
        getPosts()
            .catch(console.error);
    }, [postId, reset]);

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
    useEffect(() => {
        document.title = 'Monkey Blogging - Update Post'
    }, []);
    useEffect(() => {
        setImage(watchImg)
    }, [watchImg, setImage]);

    async function handleDeleteImg() {
        const usersRef = doc(db, "posts", postId);
        await updateDoc(usersRef, { image: '' })
    }
    // side method
    const handleUpdatePost = async (values) => {
        try {
            setLoading(true)
            const _values = { ...values }
            _values.slug = slugify(values.slug || values.title, { lower: true })
            _values.status = +values.status
            _values.image = image

            console.log("🚀 ~ handleUpdatePost ~ _values:", _values)
            const categoriesRef = doc(db, "posts", postId);
            await updateDoc(categoriesRef, { ..._values, createdAt: serverTimestamp() })
            toast.success('Update success!')
            // navigate('/manage/post')
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    const handleClickOption = async (item) => {
        const docRef = doc(db, "categories", item.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setValue('category', { id: docSnap.id, ...docSnap.data() })
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
        setCategory(item)
    }
    if (!postId) return null;
    console.log(category)
    return (
        <div>
            <DashboardHeading
                title="Update post"
                desc={`Update your post id: ${postId}`}
            ></DashboardHeading>
            <form onSubmit={handleSubmit(handleUpdatePost)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                    id='title'
                    control={control}
                    placeholder='Enter your title'
                    content='Title:'
                    typeInput='text'
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
                    <Label>Post</Label>
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
                    classBtn="gradientBtnPrimary text-white w-[230px]"
                    isSubmitting={loading}
                    disabled={loading}
                    classContainer='md:col-span-2 items-center'
                >
                    Add new post
                </Button>
            </form >
        </div>
    );
};

export default PostUpdate;