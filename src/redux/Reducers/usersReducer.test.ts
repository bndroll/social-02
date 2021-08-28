import usersReducer, {actions, InitialStateType} from "./usersReducer"


let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            { id: 0, name: 'Dima', status: 'hello world', followed: false, photos: { small: null, large: null } },
            { id: 1, name: 'Kirill', status: 'haha', followed: false, photos: { small: null, large: null } },
            { id: 2, name: 'Nikita', status: 'pop', followed: true, photos: { small: null, large: null } },
            { id: 3, name: 'Max', status: 'loop', followed: true, photos: { small: null, large: null } }
        ],
        pageSize: 3,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test("follow success", () => {
    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test("unfollow success", () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})