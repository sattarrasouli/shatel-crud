import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../../../api/types'
import DeleteIcon from "../../../assets/svgs/delete.svg"
import EditIcon from "../../../assets/svgs/edit.svg"
import DeleteModal from '../../modals/deleteModal'
import { useAppDispatch } from '../../../store'
import { deletePost } from '../../../store/slices/posts'

interface IPostCardDetails {
    post: Post
}

function PostCardDetails({ post }: IPostCardDetails) {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);

    const confirmDelete = () => {
        closeModal();
        dispatch(deletePost(post.id as number))
    };

    const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setIsModalOpen(true)
    };

    return (
        <div key={post.id} className='flex flex-col justify-center bg-white items-center shadow-lg rounded-lg m-3 bg-zinc-400 text-black p-4'>
            <Link to={`/post/${post.id}`}>
                <p className='text-black text-sm font-semibold'>Title: <span className='text-black text-sm font-normal'>{post.title}</span></p>
                <p className='text-black text-sm font-semibold'>ID: <span className='text-black text-sm font-normal'>{post.id}</span></p>
                <p className='text-black text-sm font-semibold'>User ID: <span className='text-black text-sm font-normal'>{post.userId}</span></p>
                <p className='text-black text-sm font-semibold'>Body: <span className='text-black text-sm font-normal'>{post.body}</span></p>
                <div className='flex flex-row justify-end w-full'>
                    <button onClick={remove}>
                        <img className='m-2' src={DeleteIcon} width={20} height={20} />
                    </button>
                    <button>
                        <img className='m-2' src={EditIcon} width={20} height={20} />
                    </button>
                </div>
            </Link>

            {isModalOpen && (
                <DeleteModal confirmDelete={confirmDelete} closeModal={() => setIsModalOpen(false)} />
            )}
        </div>
    )
}

export default PostCardDetails