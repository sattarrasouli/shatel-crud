
interface IErrorCard {
    title: string,
    error: string
}

function ErrorCard({ title, error }: IErrorCard) {
    return (
        <div className='grid place-items-center w-full h-screen px-6'>
            <div className='flex relative w-full max-w-xl flex-col p-8 relative bg-white bg-opacity-70 backdrop-blur-md rounded-xl max-h-[80%] overflow-scroll'>
                <p className='w-full text-center text-3xl text-gray-500 mb-4'>{title}</p>
                <p className='w-full text-red-500 text-2xl font-bold text-center'>{error}</p>
            </div>
        </div>
    )
}

export default ErrorCard