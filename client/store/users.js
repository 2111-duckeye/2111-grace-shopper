import axios from 'axios';
const GOT_USERS = 'GOT_USERS';

const TOKEN = 'token';

//action creation
export const setUsers = (users) => ({
  type: GOT_USERS,
  users,
});

//Thunk creator
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: users } = await axios.get('/api/users', {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUsers(users));
    } catch (e) {
      console.log("COULDN'T FETCH USERS", e);
    }
  };
};

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case GOT_USERS:
      return action.users;
    default:
      return state;
  }
}
