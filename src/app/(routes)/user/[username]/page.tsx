"use client"
import {useParams} from "next/navigation";

const UserPage = () => {
    const { username } = useParams();
    return (
        <div>
            <h1>User info</h1>
            User id: {username ?? 'Username not found!'}
        </div>
    );
};

export default UserPage