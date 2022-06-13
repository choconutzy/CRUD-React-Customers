import React, { createContext, useContext, useEffect, useReducer, useState} from "react";
import AppReducers from '../Reducer/index'
import axios from 'axios'

const initialState = []
export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducers, initialState)
    const [getData, setGetData] = useState([])
    useEffect (()=>{
        axios.get(`${process.env.REACT_APP_URL}/customers`,
        {headers: { 'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem("Authorization")}`
        }})
        .then(resp =>{
            const get = [...resp.data.data]
            setGetData(get)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    const getCustomer=() => {
        axios.get(`${process.env.REACT_APP_URL}/customers`,
        {headers: { 'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem("Authorization")}`
        }})
        .then(resp=>{
            console.log(resp)
        })
        .catch(err =>{
            console.log(err)
        })
    }
    const addCustomer=(data) =>{
        console.log(data)
        axios.post(`${process.env.REACT_APP_URL}/customers`,
        data,
        {headers: { 'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem("Authorization")}`
        }})
        .then(resp=>{
            alert(`Success Add Data`)
        })
        .catch(err =>{
            console.log(err)
            alert(err.message)
        })
    }
    const editCustomer=(data) =>{
        axios.put(`${process.env.REACT_APP_URL}/customers`,
        data,
        {headers: { 'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem("Authorization")}`
        }})
        .then(resp=>{
            alert(`Success Edit Data`)
        })
        .catch(err =>{
            console.log(err)
            alert(err.message)
        })
    }
    const deleteCustomer=(data) =>{
        const {id} = data
        console.log(data)
        axios.delete(`${process.env.REACT_APP_URL}/customers`,
        {id:id},
        {headers: { 'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem("Authorization")}`
        }})
        .then(resp=>{
            alert(`Success Delete Data`)
        })
        .catch(err =>{
            console.log(err)
            alert(err.message)
        })
    }
    return (
        <GlobalContext.Provider value={{
            state:{
                ...state,
                customers:[...getData]
            },
            addCustomer,
            editCustomer,
            deleteCustomer
        }}>
            {children}
        </GlobalContext.Provider>
    )
}