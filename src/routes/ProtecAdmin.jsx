import React, { useEffect, useState } from 'react'
import useEcomStore from '../store/ecom-stotr'
import { currentAdmin } from '../api/auth'
import Loading from './Loading'
const ProtecAdmin = ({element}) => {
    const[ok,setOk] = useState(false)
    const user = useEcomStore((e)=>e.user)
    const token = useEcomStore((e)=>e.token)


    useEffect(()=>{
        if(user && token){
            currentAdmin(token)
            .then((res)=>setOk(true))  
            .catch((err)=>setOk(false))

        }
    })

    return ok? element:<Loading></Loading>
}

export default ProtecAdmin