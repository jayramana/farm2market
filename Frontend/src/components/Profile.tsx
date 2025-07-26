import React, { useState, useEffect } from "react";
import { useFtm } from "../store/useFtm";
import type { User } from "../types/user";

const Profile = () => {
  const { id, users, fetchUserDetails, loadingUsers, errorUsers } = useFtm();

  const [detail, setDetail] = useState<User>();

  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        fetchUserDetails(id);
        setDetail(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAndSet();
  }, [id, users, fetchUserDetails]);

  return (<main>{detail ? <p>{detail.user_name}</p> : <p>Null</p>}</main>)
};

export default Profile;
