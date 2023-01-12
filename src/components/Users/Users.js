import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAccess } from "../../actions/auth";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [isSuspended, setIsSuspended] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  console.log(isAdmin);
  const [firstName, setFirstName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsers, loading } = useSelector((state) => state.authReducer);
  console.log(allUsers);
  console.log(isSuspended);

  const handleSubmit = (id) => {
    dispatch(
      updateUserAccess(
        id,
        {
          isSuspended,
          isAdmin,
        },

        navigate
      )
    );
    // setIsSuspended("");
    // setIsAdmin("");
  };
  return (
    <div style={{ marginTop: "6rem" }}>
      <input
        placeholder="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <div>
        <label>IsSuspended</label>

        <select
          value={isSuspended}
          onChange={(e) => setIsSuspended(e.target.value)}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>
      <div>
        <label>IsAdmin:</label>
        <select value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)}>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>

      <div>
        {}
        {loading
          ? "Loading"
          : allUsers?.map((p) => (
              <div key={p._id}>
                <div>{p.firstName}</div>
                <div>{p.lastName}</div>
                <div>{p.email}</div>
                <div>{p.isSuspended ? "suspended" : "Not Suspended"}</div>
                <div>{p.isAdmin ? "an Admin" : "Not An Admin"}</div>

                <div>
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleSubmit(p._id)}
                  >
                    update
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Users;
