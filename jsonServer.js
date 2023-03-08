import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function JsonServer() {
  const [data, setData] = useState([])
  const baseURL = "https://dummyjson.com/products"

  const [open, setOpen] = React.useState(false);
  const [brand, setBrand] = useState('');
  const [desc, setDesc] = useState('');
  const [disPer, setDisper] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [id, setID] = useState('');

  console.log("id", id)

  const handleClickOpen = (id) => {
    setID(id)
    setOpen(true);
  };

  const handleClose = (id) => {
    setOpen(false);
  };
  const handleClose2 = (id) => {

    setOpen(false);
  };

  function update() {
    axios({
      method: 'PATCH',
      url: `https://dummyjson.com/products/${id}/`,
      data: { title: brand }
    }).then((res) => {
      console.log("res", res.data)
      setOpen(false);
      

    })

    console.log(id)
  }
  function datas(data){
    return data;

  }


  const fetchData = () => {
    axios.get(baseURL).then(res => setData(res.data.products));
  }


  useEffect(() => {
    fetchData()
  }, [])

  console.log(data)
  if (!data) return null;


  function deleteObject(id) {

    axios.delete(`https://dummyjson.com/products/${id}`).then((res) => {

      setData(data.filter(item => item.id !== id))
      console.log("deleted", res)
    }
    )
  }

  return (
    <div id="box">
      <table className='table'>
        <thead>
          <tr>
            <td>ID</td>
            <td>Brand</td>
            <td>Description</td>
            <td>Discount Percentage</td>
            <td>Price</td>
            <td>Rating</td>
            <td>Stock</td>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            return <tr key={i}>
              <td>{d.id}</td>
              <td>{d.title}</td>
              <td>{d.description}</td>
              <td>{d.price}</td>
              <td>{d.discountPercentage}</td>
              <td>{d.rating}</td>
              <td>{d.stock}</td>
              <td> <button onClick={() => deleteObject(d.id)}>Sil</button></td>

              <td> <Button variant="outlined" onClick={() => handleClickOpen(d.id)}>update</Button>
              </td>


            </tr>
          })}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update object</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter informations
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="brand"
            label="Brand"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => { setBrand(event.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setDesc(event.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="discountPercentage"
            label="Discount Percentage"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setDisper(event.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setPrice(event.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="rating"
            label="Rating"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setRating(event.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="stock"
            label="Stock"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setStock(event.target.value) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
          <Button onClick={() => update()}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default JsonServer;

