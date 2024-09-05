import React, { useRef, useEffect } from 'react';

const ListPopup = ({ postId, onEdit, onDelete, closePopup }) => {
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                closePopup(); // Close the popup when clicking outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [closePopup]);

    return (
        <div
            ref={popupRef}
            className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg"
        >
            <button
                onClick={() => {
                    onEdit(postId);
                    closePopup(); // Close the popup after action
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
                Edit
            </button>
            <button
                onClick={() => {
                    onDelete(postId);
                    closePopup(); // Close the popup after action
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
            >
                Delete
            </button>
        </div>
    );
};

export default ListPopup;
