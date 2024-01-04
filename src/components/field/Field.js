import { Input } from 'components/input';
import { Label } from 'components/label';
import React from 'react';
import PropTypes from 'prop-types';
/**
 * 
 * @param {id, content, children, placeholder, control, isToggleShowHide, typeInput, errors} 
 * 
 */
const Field = ({ id, content, children, placeholder, control, isToggleShowHide, typeInput, errors }) => {
    return (
        <div className="flex flex-col gap-2 max-w-[500px] m-[1.5rem_auto_.3rem]  ">
            <Label htmlFor={id}>{content}</Label>
            <div className='flex justify-center items-center bg-[#F1F1F3] p-2 rounded-lg transition-all shadow-md focus-within:bg-white' >
                <Input id={id} placeholder={placeholder}
                    control={control} isToggleShowHide={isToggleShowHide} typeInput={typeInput}
                />
                {children ? children : null}
            </div>
            {errors?.[id]?.message && (
                <p className="text-sm text-red-500">{errors[id].message}</p>
            )}
        </div>
    );
};

Field.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string,
    children: PropTypes.node,
    placeholder: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    isToggleShowHide: PropTypes.bool,
    typeInput: PropTypes.string,
    errors: PropTypes.object,
};
export default Field;