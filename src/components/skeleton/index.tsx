const Skeleton = ({ count }: { count: number }) => (
    <div className='grid place-items-center w-full h-screen px-6'>
        <div className='flex w-full max-w-xl animate-pulse py-4 px-6 flex-col relative bg-white bg-opacity-20 backdrop-blur-md rounded-xl max-h-[70%] overflow-hidden'>
            {[...Array(count)].map((_, index) => (
                <div key={index} className="bg-white animate-pulse my-4 w-full h-36 rounded-xl">
                </div>
            ))}
        </div>
    </div>
)
export default Skeleton