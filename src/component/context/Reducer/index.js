export default (state, action) => {
    const {type, payload, error} = action
    switch (type) {
        case "GET":
            return {
                ...state,
                customers: [...payload],
                error: null,
            }
        case "GET_CUSTOMERS_FAIL":
            const text = `Failed: ${error}`
            return {
                ...state,
                customers: [],
                error: error,
            }
        case "POST":
            const pre = state.customers
            return {
                ...state,
                customers: [...state.customers,...payload],
                error: null,
            }
        case "POST_CUSTOMERS_FAIL":
            return {
                ...state,
                customers: [],
                error: error,
            }
        case "UPDATE":
            const filter = state.customers.filter(e=>e.id!==payload.id)
            return {
                ...state,
                customers: [...filter, payload],
                error:null
            }
        case "UPDATE_CUSTOMERS_FAIL":
            return {
                ...state,
                error:error
            }
        case "DELETE":
            const newData = state.customers.filter(e=>e.id!==payload.id)
            return {
                ...state,
                customers: [...newData],
                error:null
            }
        case "DELETE_CUSTOMERS_FAIL":
            return {
                ...state,
                error:error
            }
        default:
            return state
    }
}