const defaultState = {
    data : [],
    error : null,
};

const todoReducer = (state, action) => {
    if(state === undefined){
        return defaultState;
    }

    switch(action.type)
    {
        case "ADD_TODO":
            return{
                data : [...state.data, action.payload],
                error : null,
                
            };
        
        case "REMOVE_TODO":
            const filterArray = state.data.filter(
                (list) => list.id !== action.payload
            );
            return{
                data : filterArray,
                error: null,
            };

        default:
            return defaultState;
    }
};

export default todoReducer;