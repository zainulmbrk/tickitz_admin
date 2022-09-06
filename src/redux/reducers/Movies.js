const initialState = {
    loading: false,
    data: {
        results:[]
    },
    results:[],
    error:null 
        
    
}

const Fetch = (state=initialState, action={})=>{
    switch(action.type){
        case "GET_MOVIES_REQUEST":
            return{...state, loading:true}
        case "GET_MOVIES_ERROR":
            return{...state, loading:false, error: action.payload}
        case "GET_MOVIES_SUCCESS":
            return{...state, loading:false, results: action.payload, error:null}
        default:
            return state
    }
}

export default Fetch