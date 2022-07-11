import React from "react";
import { Modal } from "../../context/Modal"
import { OpenModal } from "../../context/OpenModal";
import CommentMenu from "./CommentMenu";


const CommentModal = ({ comment, hidden }) => {
    const { commentId, setCommentId } = OpenModal();

    return (
        <>
            <img
                className="comment-options"
                hidden={ hidden }
                onClick={ () => setCommentId(comment.comment.id) }
                src="https://img.icons8.com/material-sharp/30/000000/delete-sign.png"
            />
            { commentId === comment.comment.id && (
                <Modal onClose={ () => setCommentId(0) }>
                    <CommentMenu comment={ comment } />
                </Modal>
            ) }
        </>
    );
};

export default CommentModal;
