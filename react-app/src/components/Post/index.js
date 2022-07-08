import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { findFollowers, followUser } from "../../store/follow";
import { getPostFollowing, postDetails, likePost, postComment, postFind } from "../../store/post";
import { OpenModal } from "../../context/OpenModal";
import { Modal } from "../../context/Modal";



const Post = () => {
    let date = new Date();
    const history = useHistory();
    const dispatch = useDispatch();
    const { num, setNum, likes, setLikes } = OpenModal();
    const { postId } = useParams;
    const [focus, setFocus] = useState(false);
    const [counter, setCounter] = useState(0);
    const [input, setInput] = useState("");
    const [src, setSrc] = useState("");
    const user = useSelector((state) => state.session.user);
    const post = useSelector((state) => state.post?.unique);
    const userPost = useSelector((state) => state.post[post?.user?.id]?.following);
    const followingFeed = useSelector((state) => state.post.following);

    const [hidden, setHidden] = useState(new Array(post?.comments?.length).fill(true))

    useEffect(() => {
        dispatch(postDetails(+postId));
        dispatch(findFollowers(user?.id));

    }, [postId, user, followingFeed])

    useEffect(() => {
        if (post) {
            document.title = `${post?.user?.name} @ Postagram : "${post?.post?.description}""`;
        }
    }, [postId, post]);

    useEffect(() => {
        dispatch(postFind(post?.user?.id))
    })


    return (
        <>
            { post }
        </>
    )

}
export default Post;
