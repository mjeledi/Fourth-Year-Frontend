import DeleteSession from './DeleteSession.tsx'
import './styles/installation.css'
import PropTypes from 'prop-types'

export default function DeleteSessionModal({ isOpen }){

    return <dialog open={isOpen} id="installationmodal">
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
            <div className="w-[35%] rounded bg-white overflow-auto scrollbar-hide">
                <DeleteSession/>
            </div>
        </div>
    </dialog>
}

DeleteSessionModal.propTypes = {
    isOpen : PropTypes.bool
}