import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import slugify from "slugify";

function getMonthName(month) {
    const monthAbbreviations = [
        "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return monthAbbreviations[month] || "Invalid month";
}
const formDate = (_day, _month) => {
    const month = getMonthName(_month)
    return `${month} ${_day}`
}
const PostMeta = ({ typeColor = 'primary', data, createdAt }) => {
    const [date, setDate] = useState('');
    let textCl = ''
    let iconCl = ''
    switch (typeColor) {
        case 'primary':
            textCl = 'text-white'
            iconCl = '#F8F9FA'
            break;
        case 'secondary':
            textCl = 'text-[#6B6B6B]'
            iconCl = '#B1B5C3'
            break;

        default:
            break;
    }

    useEffect(() => {
        const milliseconds = createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000;
        const date = new Date(milliseconds);
        // const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        if (day && month) {
            const result = formDate(day, month)
            setDate(result)
        }
    }, [createdAt?.nanoseconds, createdAt?.seconds])
    if (!data) return null
    return (
        <div className={`flex justify-start items-center gap-2 ${textCl}`}>
            <span>{date || ''}</span>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                <circle cx="3" cy="3" r="3" fill={iconCl} />
            </svg></span>
            <NavLink to={slugify(data?.fullname || '', { lower: true })}>{data?.username || '...'}</NavLink>
        </div>
    );
};

export default PostMeta;