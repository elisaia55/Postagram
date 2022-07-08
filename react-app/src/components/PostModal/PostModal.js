import React, { useState } from "react"
import { Modal } from "../../context/Modal"
import { OpenModal } from "../../context/OpenModal"
import NewPost from "./NewPost"
import "../Navigation/Navigation.css"

const NewPostModal = () => {
    const { num, setNum } = OpenModal();

    return (
        <>
            { num === 0 ? (
                <div
                    onClick={ () => setNum(1) }
                    className="nav-btns"
                >
                    NEW POST BUTTON
                </div>
            ) : (
                <div
                    onClick={ () => setNum(1) }
                    className="nav-btns"
                >
                    NEW POST BUTTON IN USE
                </div>
            ) }
            { num === 1 && (
                <Modal onClose={ () => setNum(0) }>
                    <NewPost />
                </Modal>
            ) }
        </>
    )
}
export default NewPostModal;
