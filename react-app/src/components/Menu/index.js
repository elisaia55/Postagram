import { useState, useRef, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { OpenModal } from "../../context/OpenModal";
import { deletePost, editPost } from "../../store/post";
import Picker from "emoji-picker-react";
import "./Menu.css";
import { Modal } from "../../context/Modal";
import Unfollow from "../UserProfile/Unfollow";

const Menu = ({ post }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(0);
    const emoji = useRef(null);
    const { setPostId, num, setNum } = OpenModal();

    const user = useSelector((state) => state.session.user)

    const [input, setInput] = useState(post.post.description)

    const onEmojiClick = (event, emojiObject) => {
        setInput((before) =>
            before === null ? emojiObject.emoji : before + emojiObject.emoji
        );
    };

    const HideOutside = (ref) => {
        useEffect(() => {
            const handleClick = (e) => {
                if (
                    !e?.target?.classList?.contains("emoji-btn") &&
                    !e?.target?.nextElementSibling?.classList.contains("hidden3")
                ) {
                    setOpen(0);
                }
                if (ref.current && !ref.current.contains(e.target)) {
                    emoji.current.classList.add("hidden3");
                }
            };

            document.addEventListener("mousedown", handleClick);

            return () => {
                document.removeEventListener("mousedown", handleClick);
            };
        }, [ref]);
    };

    HideOutside(emoji)

    const bye = () => {
        document.querySelector(".hide-menu").classList.add("hidden3")
        document.querySelector(".delete-conf").classList.remove("hidden3");
    }

    const destroy = () => {
        dispatch(deletePost(post.post.id))
        setPostId(0);
    };

    const edit = () => {
        document.querySelector(".hide-menu").classList.add("hidden3");
        document.querySelector(".edit-it").classList.remove("hidden3");
    }

    const submitEdit = () => {
        const obj = {
            description: input,
        };
        dispatch(editPost(obj, post.post.id));
        setPostId(0);
    };

    const show = () => {
        if (open === 0) {
            emoji.current.classList.remove("hidden3");
            setOpen(1);
        }
        else {
            setOpen(0);
        }
    }

    return (
        <div className="menu-modal">
            <div className="hide-menu">
                { user?.id === post?.user.id ? (
                    <>
                        <div onClick={ bye } className="delete-post">
                            Delete post
                        </div>
                        <div className="edit-post" onClick={ edit }>
                            Edit caption
                        </div>
                    </>
                ) : (
                    <div
                        className="unfollow-post"
                        onClick={ () => setPostId(0) }
                        onMouseDown={ () => setNum(8) }
                    >
                        Unfollow
                    </div>
                ) }
                <div
                    onClick={ () => {
                        history.push(`/posts/${post.post.id}`);
                        setPostId(0);
                    } }
                    className="goto-post-b"
                >
                    Go to post
                </div>
                <div className="goto-post" onClick={ () => setPostId(0) }>
                    Cancel
                </div>
            </div>
            <div className="delete-conf hidden3">
                <div className="del-conf-top">
                    <p className="del-title">Delete Post?</p>
                    <p className="del-desc">Are you sure you want to delete this post?</p>
                </div>
                <div className="delete-post" onClick={ destroy }>
                    Delete
                </div>
                <div className="goto-post" onClick={ () => setPostId(0) }>
                    Cancel
                </div>
            </div>
            <div className="edit-it hidden3">
                <div className="edit-it-top">
                    <div className="emoji-post-3">
                        <img
                            onClick={ show }
                            className="emoji-btn editb"
                            src="https://img.icons8.com/ios/50/000000/smiling.png"
                        />
                        <div className="picker hidden3" ref={ emoji }>
                            <Picker
                                native={ true }
                                onEmojiClick={ onEmojiClick }
                                pickerStyle={ {
                                    position: "absolute",
                                    width: "15vw",
                                    marginLeft: "-20px",
                                    top: "110px",
                                } }
                            />
                        </div>
                    </div>
                    <textarea
                        value={ input }
                        onChange={ (e) => setInput(e.target.value) }
                        className="edit-it-input"
                    />
                </div>
                <div className="submit-edit" onClick={ submitEdit }>
                    Submit
                </div>
                <div className="goto-post" onClick={ () => setPostId(0) }>
                    Cancel
                </div>
            </div>
            { num === 8 && (
                <Modal
                    onClose={ () => {
                        setPostId(0);
                        setNum(0);
                    } }
                >
                    <Unfollow user={ post.user } />
                </Modal>
            ) }
        </div>
    )













}
export default Menu;
