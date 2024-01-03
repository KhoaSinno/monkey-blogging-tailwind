import { Input } from 'components/input';
import { Label } from 'components/label';
import React from 'react';

const Field = ({ id, content, children, placeholder, control, isToggleShowHide, typeInput }) => {
    return (
        <div className="flex flex-col gap-2 max-w-[500px] m-[1rem_auto_.3rem]  ">
            <Label htmlFor={id}>{content}</Label>
            <div className='flex justify-center items-center bg-[#F1F1F3] p-2 rounded-lg transition-all shadow-md focus-within:bg-white' >
                <Input id={id} placeholder={placeholder}
                    control={control} isToggleShowHide={isToggleShowHide} typeInput={typeInput}
                />
                {children ? children : null}
            </div>
            {/* {errors?.email?.message && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )} */}
            {/* <p className="text-sm text-red-500">Hi everyone i'm khoa this is a bug</p> */}
        </div>
    );
};

export default Field;