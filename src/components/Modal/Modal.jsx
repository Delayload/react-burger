import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import cn from "classnames";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

function Modal({
                   title = "",
                   onClose,
                   children
               }) {
    React.useEffect(() => {
        const keydownHandler = e => {
            e.preventDefault();
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener('keydown', keydownHandler);

        return () => {
            document.removeEventListener('keydown', keydownHandler);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose}/>
            <div className={cn('p-10', 'pb-15', styles.wrapper)}>
                <div className={styles.header}>
                    <h1 className={cn('text', 'text_type_main-large')}>{title}</h1>
                    <div className={styles.closeButton} onClick={onClose}>
                        <CloseIcon type="primary"/>
                    </div>
                </div>
                {children}
            </div>
        </>,
        modalRoot
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;