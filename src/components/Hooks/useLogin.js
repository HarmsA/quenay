import { useState, useEffect } from 'react';
import {projectAuth, projectFirestore} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try{
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            //update user online status to true
            await projectFirestore.collection('users')
                .doc(res.user.uid)
                .update({online:true})

        //    dispatch logout action
            dispatch({type: 'LOGIN', payload: res.user})
            if (!isCancelled){
                setIsPending(false)
                setError(null)
                console.log('isPending: ', isPending)
            }

        } catch(err) {
            if(!isCancelled){
                console.log(err)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, []);

    return {login, error, isPending}
};

