import React, { useEffect } from 'react';
import { createContext, useContext, useReducer } from 'react';
import axios from 'axios'

const initialState = {
    customers: [],
    error: null,
}
const CustomersContext = createContext()

const customersReducers = (state = initialState, action) => {
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
                error: text,
            }
        case "POST":
            return {
                ...state,
                customers: [...payload],
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

const CustomersProvider = ({children}) => {
    const [state, dispatch] = useReducer(customersReducers, initialState)
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/customers`)
    })
    const value = {state, dispatch}
    return <CustomersContext.Provider value={value}>{children}</CustomersContext.Provider>
}

const useCustomers = () => {
    const context = useContext(CustomersContext)
    if(context === undefined) {
        throw new Error('useCustomers must be within a Customers Provider')
    }

    return context
}

export {CustomersProvider, useCustomers}