import ReactDOM from 'react-dom';
import { NAMES_CONSTANTS } from "../../constants";

interface IDeleteModal {
    closeModal: () => void;
    confirmDelete: () => void;
    loading: string
}

function DeleteModal({ closeModal, confirmDelete, loading }: IDeleteModal) {

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                <h2 className="text-xl font-semibold mb-4">{NAMES_CONSTANTS.ARE_YOU_SURE}</h2>
                <p className="mb-6">{NAMES_CONSTANTS.DELETE_ASSURANCE_MESSAGE}</p>
                <div className="flex justify-end space-x-4">
                    <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">
                        {NAMES_CONSTANTS.CANCEL}
                    </button>
                    <button onClick={confirmDelete} className="flex flex-row bg-red-500 text-white px-4 py-2 rounded">
                        {
                            loading === "processing"
                            &&
                            <svg className="animate-spin h-5 w-5 mr-3 text-verdant-600" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        }
                        {NAMES_CONSTANTS.DELETE}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default DeleteModal;
