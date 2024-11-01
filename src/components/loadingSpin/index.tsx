
function LoadingSpin() {
    return (
        <svg className="animate-spin h-5 w-5 mr-3 text-verdant-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
    )
}

export default LoadingSpin