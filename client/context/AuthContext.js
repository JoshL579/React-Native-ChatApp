import React, { useState, createContext, useEffect } from "react";
import { Center, Spinner } from "native-base";
import { getToken } from "../utils/store";
import { checkToken } from "../api/auth";


export const AuthContext = createContext({
    userId: "",
    setUserId: () => { },
    userName: "",
    setUserName: () => { },
});

export const AuthContextProvider = (props) => {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const value = { userId, setUserId, userName, setUserName };
    const setEmptyUser = () => {
        setUserId('')
        setUserName('')
    }
    useEffect(() => {
        getToken().then((token) => {
            if (!token) {
                setEmptyUser()
                setIsComplete(true)
                return
            }
            const payload = {
                token: token
            }
            checkToken(payload).then((res) => {
                setUserId(res.uid)
                setUserName(res.name)
            }).catch((err) => {
                setEmptyUser()
            }).finally((res) => {
                setIsComplete(true)
            })
        }) 
    }, []);

    if (!isComplete) {
        return (
            <Center flex={1}>
                <Spinner color="blue.300" />
            </Center>
        )
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}