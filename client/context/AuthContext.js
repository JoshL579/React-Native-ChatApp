import React, { useState, createContext, useEffect } from "react";
import { Center, Spinner } from "native-base";
import { getToken } from "../utils/store";
import { checkToken } from "../api/auth";


export const AuthContext = createContext({
    userId: "",
    setUserId: () => { },
});

export const AuthContextProvider = (props) => {
    const [userId, setUserId] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const value = { userId, setUserId };
    useEffect(() => {
        getToken().then((token) => {
            if (!token) {
                setUserId('')
                setIsComplete(true)
                return
            }
            const payload = {
                token: token
            }
            checkToken(payload).then((res) => {
                setUserId(res.uid)
            }).catch((err) => {
                setUserId('')
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