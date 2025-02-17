/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react";
import { Button } from "./Button.jsx";

export const Users = () => {
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState({
    firstName: "Sumedh ",
    lastName: "R Mundewadi",
    _id: 1,
  });

  return (
    <>
      <div className="font-bold text-lg">Users</div>
      <div>
        <input
          type="text"
          placeholder="Search users.."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user.id} user={user}></User>
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user?.firstName?.[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          {user?.firstName} {user?.lastName}
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button label="Send Money" />
      </div>
    </div>
  );
}
