import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function fetchAPI() {
    return axios.get("http://localhost:3000/").then(res => res.data);
}

function App() {
    const { data, error, isLoading } = useQuery(["message"], fetchAPI);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching API</p>;

    return (
        <div>
            <h1>Vibees Frontend</h1>
            <p>Backend Response: {data}</p>
        </div>
    );
}

export default App;
