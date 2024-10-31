import ReactDOM from 'react-dom';
import { NAMES_CONSTANTS } from "../../constants";

interface IDeleteModal {
    closeModal: () => void;
    confirmDelete: () => void;
}

function DeleteModal({ closeModal, confirmDelete }: IDeleteModal) {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                <h2 className="text-xl font-semibold mb-4">{NAMES_CONSTANTS.ARE_YOU_SURE}</h2>
                <p className="mb-6">{NAMES_CONSTANTS.DELETE_ASSURANCE_MESSAGE}</p>
                <div className="flex justify-end space-x-4">
                    <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">
                        {NAMES_CONSTANTS.CANCEL}
                    </button>
                    <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                        {NAMES_CONSTANTS.DELETE}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default DeleteModal;
