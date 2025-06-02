import  { useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { usePostBookmarkMutation } from '../../../Rudux/feature/ApiSlice';
import toast from 'react-hot-toast';

function ChefBookmark({ postId, isInitiallyBookmarked = false, onToggle }) {
    const [isBookmarked, setIsBookmarked] = useState(isInitiallyBookmarked);
    const [PostBookmark, { isLoading }] = usePostBookmarkMutation();

    const handleBookmarkToggle = async () => {
        try {
            await PostBookmark({ id: postId, formData: {} }).unwrap();
            setIsBookmarked(prev => !prev);
            onToggle && onToggle(!isBookmarked); // optional callback to update parent
            toast.success(isBookmarked ? 'Post unsaved' : 'Post saved');
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <button
            onClick={handleBookmarkToggle}
            disabled={isLoading}
            className="flex items-center gap-2 cursor-pointer text-[#5B21BD]"
        >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            <span className="text-base">{isBookmarked ? 'Unsave' : 'Save'}</span>
        </button>
    );
}

export default ChefBookmark;
