const initialState = {
    good: 0,
    neutral: 0,
    bad: 0
}

const counterReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'GOOD':
            return { ...state, good: state.good + 1 }
        case 'NEUTRAL':
            return { ...state, good: neutral.good + 1 }
        case 'BAD':
            return { ...state, good: bad.good + 1 }
        case 'ZERO':
            return { ...initialState }
    }
    return state
}

export default counterReducer;