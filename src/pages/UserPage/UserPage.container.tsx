import React, { useEffect, useState } from 'react';
import UserModel from '../../shared/models/User';
import UserGroup from '../../shared/models/Group';
import { match } from 'react-router-dom';
import UserPage from './UserPage.component';
import axios from 'axios'

interface IUserPageContainerProps {
    match: match<{ id: string }>;
}

interface IUserPageContainerState {
    isLoading: boolean;
    user: UserModel | null;
    group: UserGroup | null;
}

export default function UserPageContainer({match}:IUserPageContainerProps) {
    const [loading, setLoading] = useState (false);
    const [user, setUser] = useState ({});

    useEffect(()=>{
        const ID = match.params.id;
        axios
            .get(`http://localhost:9005/users/${ID}`)
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
    }, [loading, match.params.id]
    );

        return (
            // @ts-ignore
            <UserPage user={user} />
        );
}
