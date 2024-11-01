import React, { useState } from 'react'
import SearchIcon from "../../../assets/svgs/search.svg"

interface ICardWrapper {
    title: string,
    children: React.ReactNode,
    search?: boolean,
    searchTerm?: string,
    setSearchTerm?: (value: string) => void
}

function CardWrapper({ title, children, search, searchTerm, setSearchTerm }: ICardWrapper) {
    const [searchBar, setSearchBar] = useState(false)

    return (
        <div className='flex relative w-full max-w-xl flex-col bg-white bg-opacity-70 backdrop-blur-md rounded-xl max-h-[80%] overflow-scroll'>
            <div className='sticky top-0 z-10 flex justify-between items-center p-4 bg-white bg-opacity-10 backdrop-blur-md'>
                <h1 className='text-black text-3xl font-bold'>{title}</h1>
                {search && (
                    <div className='flex justify-end'>
                        {searchBar ? (
                            <input
                                type="text"
                                placeholder="Search posts by title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                                className='w-3/4 px-6 py-1 border-0 outline-0 rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500'
                            />
                        )
                            :
                            <button
                                className='mr-2'
                                onClick={() => setSearchBar(!searchBar)}
                            >
                                <img src={SearchIcon} alt="search" width={20} height={20} />
                            </button>
                        }
                    </div>
                )}
            </div>

            <div className='flex flex-col px-4 pt-2'>
                {children}
            </div>
        </div>
    )
}

export default CardWrapper