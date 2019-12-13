import React, { useEffect, useState } from 'react';
import { match } from 'react-router-dom';
import UserPage from './UserPage.component';
import axios from 'axios'

interface IUserPageContainerProps {
    match: match<{ id: string }>;
}

export default function UserPageContainer({match}:IUserPageContainerProps) {
    const [loading, setLoading] = useState (false);
    const [user, setUser] = useState (null);

    useEffect(()=>{
        const id = match.params.id;
        axios({
            method: 'get',
            url: `http://localhost:9005/users/${id}`,
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
        .then(res => {
            if (res.data.id) {
                setLoading(false);
                setUser(res.data);
            }
        })
        .catch( error => {
            console.log(error);
            setLoading(true)
        })
    }, [loading]
    );

    return (
        <UserPage user={user} />
    );
}
