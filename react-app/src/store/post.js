const GET_POSTS = 'post/GET_POSTS'

const getPosts = (posts, userId) => ({
    type: GET_POSTS,
    payload: posts, userId
})




export const newPost = (obj) => async (dispatch) => {

    const { file, description } = obj;

    console.log(file, "------> HIT")

    const form = new FormData();
    form.append('file', file);
    form.append('description', description);

    const res = await fetch('/api/posts/new', {
        method: "POST",
        body: form,
    });

}

const initialState = {};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, [action.userId]: action.payload };
        default:
            return state;
    }
}
