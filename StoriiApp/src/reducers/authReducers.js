export const SignInReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_SIGN_IN':
            return {
                ...state,
                userToken: action.payload.userToken,
                role: action.payload.role,
            };
        default:
            return state;
    }
}  