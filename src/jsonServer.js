import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import {useState}from 'react';
function JsonServer() {
    const [data,setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/results').then(res => setData(res.data)).catch(err => console.log(err))

    }, [])
    
  return (
    <div className='container mt-5'><table className='table'>
        <thead>
            <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Location</td>
            </tr>
        </thead>
        <tbody>
            {data.map((d,i) => {
                return <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name.first}</td>
                <td>{d.location.city}</td>
                </tr>
            })}
        </tbody>
        </table></div>
  );
}

export default JsonServer;
