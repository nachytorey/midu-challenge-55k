/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import useFetchUser from "./hooks/useUser";
import TableUsers from "./components/TableUsers";

export default function Home() {
  return (
    <main>
      <h1>Prueba técnica</h1>
      <TableUsers />
    </main>
  );
}
