import { useDropdown } from 'components/dropdown/dropdown-context';
import React from 'react';

const CategorySelected = ({ category }) => {
    const { show } = useDropdown()
    return (
        <>
            {category?.name && !show && <p className="p-2 bg-green-400 text-green-800 rounded-lg w-fit">{category.name}</p>}
        </>
    )
};

export default CategorySelected;