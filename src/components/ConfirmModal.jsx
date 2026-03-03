
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({
    show,
    handleClose,
    text,
    productsData,
    handleConfirm
}) {

    return (
    <>

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>{text.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{text.bodyText}『{productsData.title}』</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                取消
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
                確定刪除
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ConfirmModal;