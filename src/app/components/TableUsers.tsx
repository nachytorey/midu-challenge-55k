/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import useFetchUser from "../hooks/useUser";
import { User } from "../types";

const TableUsers = () => {
  const { users: initialusers, fetchUsers } = useFetchUser();

  const [users, setUsers] = useState<User[]>([]);
  const [orderByCountry, setOrderByCountry] = useState<boolean>(false);
  const [orderByName, setOrderByName] = useState<boolean>(false);
  const [searchedCountry, setSearchedCountry] = useState<string>("");

  const toogleOrderByCountry = () => {
    setOrderByCountry((prev) => !prev);
    const userOrderedByCountry = users.sort((a, b) => {
      return orderByCountry
        ? a.location.country.localeCompare(b.location.country)
        : b.location.country.localeCompare(a.location.country);
    });
    setUsers(userOrderedByCountry);
  };

  const toogleOrderByFirstName = () => {
    setOrderByName((prev) => !prev);
    const userOrderedByName = users.sort((a, b) => {
      return orderByName
        ? a.name.first.localeCompare(b.name.first.trim().toLocaleLowerCase())
        : b.name.first.localeCompare(a.name.first.trim().toLocaleLowerCase());
    });
    setUsers(userOrderedByName);
  };

  const toogleOrderByLastName = () => {
    setOrderByName((prev) => !prev);
    const userOrderedByName = users.sort((a, b) => {
      return orderByName
        ? a.name.last.localeCompare(b.name.last.trim().toLocaleLowerCase())
        : b.name.last.localeCompare(a.name.last.trim().toLocaleLowerCase());
    });
    setUsers(userOrderedByName);
  };

  const handleDeleteUser = (user: User) => {
    const usersUpdated = users.filter((u) => u.email !== user.email);
    setUsers(usersUpdated);
  };

  const handleChangeCoutry = (countrySearchedName: string) => {
    const userdUpdated = initialusers.filter((u) =>
      u.location.country
        .trim()
        .toLocaleLowerCase()
        .includes(countrySearchedName.trim().toLowerCase())
    );
    setUsers(userdUpdated);
    setSearchedCountry(countrySearchedName);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setUsers(initialusers);
  }, [initialusers]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          style={{
            backgroundColor: "lightgray",
            padding: "10px",
            border: "1px solid gray",
          }}
          onClick={() => toogleOrderByCountry()}
        >
          Ordernar por país
        </button>
        <button
          style={{
            backgroundColor: "lightgray",
            padding: "10px",
            border: "1px solid gray",
          }}
          onClick={() => setUsers(initialusers)}
        >
          Restaurar
        </button>
        <input
          type="text"
          width={50}
          style={{
            border: "solid 1px gray",
            height: "30px",
          }}
          value={searchedCountry}
          onChange={(e) => handleChangeCoutry(e.target.value)}
        />
      </div>
      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th></th>
            <th>
              <button onClick={() => toogleOrderByFirstName()}>Nombre</button>
            </th>
            <th>
              {" "}
              <button onClick={() => toogleOrderByLastName()}>Apellido</button>
            </th>
            <th>
              {" "}
              <button onClick={() => toogleOrderByCountry()}>Pais</button>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const backgroundColor = index % 2 ? "#A4A3A3" : "#C3C3C3";
            return (
              <tr
                key={user.email}
                style={{
                  backgroundColor: backgroundColor,
                }}
              >
                <td>
                  {user?.picture?.thumbnail && (
                    <img
                      src={user?.picture?.thumbnail}
                      alt="Thumbnail"
                      width={50}
                      height={50}
                    />
                  )}
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: "lightgray",
                      padding: "10px",
                      border: "1px solid gray",
                    }}
                    onClick={() => handleDeleteUser(user)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
