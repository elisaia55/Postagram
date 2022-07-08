const GET_POSTS = 'post/GET_POSTS'
const GET_FOLLOWING_POST = 'post/GET_FOLLOWING_POST'
const GET_ONE_POST = 'post/GET_ONE_POST'

const getPosts = (posts, userId) => ({
    type: GET_POSTS,
    payload: posts, userId
})

const getFollowingPosts = (posts) => ({
    type: GET_FOLLOWING_POST,
    payload: posts,
})


const getDetails = (posts) => ({
    type: GET_ONE_POST,
    payload: posts,
})


export const findPosts = (userId) => async (dispatch) => {
    const res = await fetch(`/api/posts/id/${userId}`)
    const data = res.json();
    if (res.ok) {
        dispatch(getPosts(data, userId));

    }
};

export const postDetails = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/id/${postId}`);
    const data = res.json();
    if (res.ok) {
        dispatch(getDetails(data));
    }
}

export const newPost = (obj) => async (dispatch) => {
    const { file, description } = obj;
    console.log(file, description, "<------ HIT")
    const form = new FormData();
    form.append('file', file);
    form.append('description', description);
    const res = await fetch("/api/posts/new", {
        method: "POST",
        body: form,
    });

};


export const getPostFollowing = () => async (dispatch) => {
    const res = await fetch(`/api/posts/following`);
    const data = await res.json();
    if (res.ok) {
        dispatch(getFollowingPosts(data));
    }
};

const initialState = {};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, [action.userId]: action.payload };
        case GET_ONE_POST:
            return { ...state, ...action.payload }
        case GET_FOLLOWING_POST:
            return { ...state, following: action.payload.following }
        default:
            return state;
    }
}
