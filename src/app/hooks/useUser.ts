"use client";

import { useState } from "react";
import { Result, User } from "../types";

const useFetchUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=100");
      const result = (await response.json()) as Result<User>;
      const users = result.results;

      const sortedUsers = users.sort((a, b) =>
        a.name.last.localeCompare(b.name.last)
      );

      setUsers(sortedUsers);
    } catch (error) {
      setError(error as string);
    }
  };
  return {
    users,
    error,
    fetchUsers,
  };
};

export default useFetchUser;
