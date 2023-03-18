import { faSave, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Button } from 'reactstrap'

interface Props {
    dispatchPreview: () => void;
    dispatchSave: () => void;
}

export default function BlogControls({ dispatchPreview, dispatchSave }: Props) {
    return (
        <div>
            <div className='pb-3 text-end px-2'>
                <Button 
                    aria-label="Expand Preview" 
                    className="me-3 px-2 py-1"
                    onClick={() => dispatchPreview()}
                >
                    <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                </Button>
                <Button 
                    aria-label="Save Blog" 
                    className="px-2 py-1"
                    onClick={() => dispatchSave()}
                >
                    <FontAwesomeIcon icon={faSave} />
                </Button>
            </div>
        </div>
    )
}
