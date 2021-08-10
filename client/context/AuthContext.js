import React, { useState, createContext, useEffect } from "react";
import { Center, Spinner } from "native-base";
import { getUid } from "../utils/store";


export const AuthContext = createContext({
    userId: "",
    setUserId: () => { },
});

export const AuthContextProvider = (props) => {
    const [userId, setUserId] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const value = { userId, setUserId };
    useEffect(() => {
        getUid().then((res) => {
            setUserId(res)
        }).catch((err) => {
            setUserId('')
        }).finally((res) => {
            setIsComplete(true)
        })
    }, []);

    if (!isComplete) {
        return (
            <Center>
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