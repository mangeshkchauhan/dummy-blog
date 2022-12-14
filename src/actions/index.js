import jsonPlaceHolder from "../apis/jsonPlaceHolder";
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch,getState) =>{
    await dispatch(fetchPosts());

    // const userId = _.uniq(_.map(getState().posts,'userId'));
    // userId.forEach(id=>dispatch(fetchUser(id)));

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id=>dispatch(fetchUser(id)))
        .value()
};

export const fetchPosts =  () =>  async dispatch => {
        const {data} = await jsonPlaceHolder.get('/posts');

        dispatch({ type: 'FETCH_POSTS', payload: data});
};

export const fetchUser = id => async dispatch =>{
    const response = await jsonPlaceHolder.get(`/users/${id}`);

    dispatch({type: 'FETCH_USER', payload: response.data});
};





// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id,dispatch);
// };

// const _fetchUser = _.memoize(async (id,dispatch) => {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);

//     dispatch({type: 'FETCH_USER', payload: response.data});
// });
