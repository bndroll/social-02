import profileReducer, {actions} from "./profileReducer"

// 1. test data, 2. action, 3. expectation

let state = {
    posts: [
        {id: 1, message: 'how are u ?', likesCount: 12},
        {id: 2, message: 'hello world', likesCount: 2},
        {id: 3, message: 'fine', likesCount: 67}
    ],
    friends: [
        {id: 1, name: 'Dimas'},
        {id: 2, name: 'Kirill'},
        {id: 3, name: 'Katya'},
        {id: 4, name: 'Nikita'},
        {id: 5, name: 'Nail'},
        {id: 6, name: 'Daniel'},
    ],
    profile: null,
    status: ''
}

it('length posts should be incremented', () => {
    let action = actions.addPost('social by maxim')
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4)
})

it('message of new post should be correct', () => {
    let action = actions.addPost('social by maxim')
    let newState = profileReducer(state, action)
    expect(newState.posts[3].message).toBe('social by maxim')
})

it('after deleting length of messages should be decrement', () => {
    let action = actions.deletePost(1)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(2)
})

it("after deleting length of messages shouldn't be decrement if id is incorrect", () => {
    let action = actions.deletePost(100)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3)
})