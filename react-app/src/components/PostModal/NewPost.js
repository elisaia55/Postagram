import React, { useState, useRef, useEffectr, useEffect } from "react";
import { OpenModal } from "../../context/OpenModal";
import { useSelector, useDispatch } from "react-redux";
import { newPost } from "../../store/post";
import { userUpdate } from "../../store/user";
import "./PostModal.css"

const NewPost = () => {
    const dispatch = useDispatch()
    const { num, setNum } = OpenModal();
    const [url, setUrl] = useState("");
    const [caption, setCaption] = useState("");
    const [imgurl, setImgUrl] = useState("")
    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState(true)

    const user = useSelector((state) => state.session?.user);

    useEffect(() => {
        setErrors([]);

    }, [url])

    // const handleSubmit = () => {
    //     let postErr = []

    //     if (!url.length) {
    //         postErr.push("Please provide a valid image");
    //         return setErrors(postErr)
    //     }
    //     if (caption.length > 2200) {
    //         postErr.push("Caption cannot be longer than 2200 characters")
    //     }
    //     if (image !== true) {
    //         postErr.push("Please prove a valid image file")
    //     }
    //     if (postErr.length) {
    //         return setErrors(postErr)
    //     }
    //     const obj = {
    //         file: imgurl,
    //         description: caption,
    //     };
    //     dispatch(newPost(obj))
    //         .then(() => dispatch(findFollowingPosts()))

    //     setNum(0);

    // }

    return (
        <>

        </>
    )
}
export default NewPost;
