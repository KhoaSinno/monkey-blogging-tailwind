import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';

const useImageFirebase = (setValue, getValues, imageName = null) => {
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState('');
    if (!setValue || !getValues) return

    // handler
    const handleUploadImage = (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress)
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        console.log('Nothing')
                }
            },
            (error) => {
                console.log(error);
                setImage("");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImage(downloadURL)
                });
            }
        );
    }
    const handleSelectImage = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setValue('image_name', file.name)
        handleUploadImage(file)
    }
    const handleDeleteImage = () => {
        const storage = getStorage();
        const desertRef = ref(storage, `images/${imageName || getValues('image_name')}`);
        deleteObject(desertRef).then(() => {
            console.log('File deleted successfully')
            setImage('')
            setProgress(0)
        }).catch((error) => {
            console.log("🚀 ~ deleteObject ~ error:", error)
            console.log("Can not delete image");
            setImage("");
        });
    }
    const handleResetUpload = () => {
        setImage('')
        setProgress(0)
    }
    return { progress, image, handleSelectImage, handleDeleteImage, handleResetUpload }
};

export default useImageFirebase;