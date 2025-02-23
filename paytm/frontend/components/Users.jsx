/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { Button } from "./Button.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  // eslint-disable-next-line no-unused-vars

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token is missing!");
          setUsers([]); // ✅ Prevent undefined state
          return;
        }

        const response = await axios.get(
          `http://localhost:3300/api/v1/user/bulk?filter=${filter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        console.log("Fetched Users:", response.data); // Debugging

        // ✅ Ensure `users` is always an array
        setUsers(Array.isArray(response.data.users) ? response.data.users : []);
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
        setUsers([]); // ✅ Prevent undefined state
      }
    };

    fetchUsers();
  }, [filter]);
  return (
    <>
      <div className="font-bold text-lg">Users</div>
      <div>
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users.."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.length > 0 ? ( // ✅ Check if users exist
          users.map((user) => <User key={user._id || indexedDB} user={user} />) // Ensure `_id` exists in API
        ) : (
          <p>No users found.</p> // ✅ Handle empty case
        )}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName?.[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          {user.firstName} {user.secondName}
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={() => {
            navigate(`/send?id=${user._id}&name=${user.firstName}`);
            // The above line navigates to the particular id of the user and firstName of the same user
          }}
          label="Send Money"
        />
      </div>
    </div>
  );
}
// 👇👇 See below for the following changes

/*
Changes made in Users.jsx

1. Added users.length > 0(checks whether users exist in the database or not)
2. We initialsed setUsers with an empty array [] to prevent undefined state.
3. setUsers(Array.isArray(response.data?.users) ? response.data.users : []);
 The above line is to confirm whether the resposne.data.users is an array then render the array or else rendere an empty array [].

 Main thing is we added headers: {
 authorization: `Bearer ${token}` 
 }

 which was actually required to fetch the token 
 token is a const which uses localStorage.getItem("token") from Inspect->Application->LocalStorage

*/
