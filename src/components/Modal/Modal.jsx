import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import bemCssModules from 'bem-css-modules';
import { default as ModalStyles } from './Modal.module.scss';

const style = bemCssModules(ModalStyles);

const Modal = ({ children, handleOnClose, isOpen, shouldByCloseOnOutsideClick }) => {
	const modalRef = useRef(null);
	const previouseActiveElement = useRef(null);

	useEffect(() => {
		if (!modalRef.current) return;

		const { current: modal } = modalRef;

		if (isOpen) {
			previouseActiveElement.current = document.activeElement;
			modal.showModal();
		} else if (previouseActiveElement.current) {
			modal.close();
			previouseActiveElement.current.focus();
		}
	}, [isOpen]);

	useEffect(() => {
		const { current: modal } = modalRef;
		const handleCancel = e => {
			e.preventDefault();
			handleOnClose();
		};
		modal.addEventListener('cancel', handleCancel);

		return () => {
			modal.removeEventListener('cancel', handleCancel);
		};
	}, [handleOnClose]);

	const handeOutsideClick = ({ target }) => {
		const { current } = modalRef;
		if (shouldByCloseOnOutsideClick && target === current) {
			handleOnClose();
		}
	};
	return ReactDOM.createPortal(
		<dialog ref={modalRef} className={style()} onClick={handeOutsideClick}>
			{children}
		</dialog>,
		document.body
	);
};
export default Modal;
