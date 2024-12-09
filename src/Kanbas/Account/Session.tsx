import * as client from "./client";
import { useEffect, useState, useCallback } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
    const [pending, setPending] = useState(true);
    const dispatch = useDispatch();

    const fetchProfile = useCallback(async () => {
        try {
            console.log("Fetching profile...");
            const currentUser = await client.profile();
            console.log("Profile response:", currentUser);
            dispatch(setCurrentUser(currentUser));
        } catch (err) {
            console.error("Profile fetch error:", err);
        }
        setPending(false);
    }, [dispatch]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]); 

    if (pending) {
        return <div>Loading...</div>;
    }

    return children;
}