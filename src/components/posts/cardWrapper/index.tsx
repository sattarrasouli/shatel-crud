import React from 'react'

interface ICardWrapper {
    title: string,
    children: React.ReactNode
}
function CardWrapper({ title, children }: ICardWrapper) {
    return (
        <div className='flex relative w-full max-w-xl flex-col relative bg-white bg-opacity-70 backdrop-blur-md rounded-xl max-h-[80%] overflow-scroll'>
            <h1 className='text-center text-black text-3xl font-bold sticky top-0 p-4 right-0 left-0 bg-white bg-opacity-10 backdrop-blur-md'>{title}</h1>
            <div className='flex flex-col px-4'>
                {children}
            </div>
        </div>
    )
}

export default CardWrapper