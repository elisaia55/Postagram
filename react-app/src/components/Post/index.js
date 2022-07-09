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
    const [filtered, setFiltered] = useState([]);
    const user = useSelector((state) => state.session.user);
    const post = useSelector((state) => state.post?.unique);
    const userPosts = useSelector((state) => state.post[post?.user?.id]?.following);
    const following = useSelector((state) => state.follow[user?.id]?.following)
    const followingFeed = useSelector((state) => state.post.following);

    const [hidden, setHidden] = useState(new Array(post?.comments?.length).fill(true))
    console.log(userPosts, "----------------->")

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
    }, [post])

    useEffect(() => {
        const arr = new Array(post?.comments.length).fill(true);
        setHidden(arr);
    }, [post?.comments])

    useEffect(() => {
        const filteredPost = userPosts?.filter((post) => post.post.id !== +postId);
        setFiltered(filteredPost);
    }, [userPosts])

    const addFollow = () => {
        dispatch(followUser(post?.user.id)).then(() => dispatch(getPostFollowing(user?.id)))
    };

    const addLike = (id) => {
        dispatch(likePost(id)).then(() => dispatch(getPostFollowing(user?.id)));
    };

    // heart animation gif?? for likes const addLikeAnimation () => {}


    const newComment = (postId) => {
        if (input.length < 1) {
            return;
        }
        const obj = {
            userId: +user.id,
            postId: +postId,
            description: input,
        };
        dispatch(postComment(obj));
        setInput("");
    };

    const showDelete = (index) => {
        let arr = [...hidden];
        arr.fill(true);
        arr[index] = false;
        setHidden(arr)
    }

    const hideDelete = (index) => {
        let arr = [...hidden];
        arr.fill(true);
        arr[index] = true;
        setHidden(arr)
    }


    return (
        <div></div>
    )

}
export default Post;
