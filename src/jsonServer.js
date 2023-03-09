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
  const [open, setOpen] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [brand, setBrand] = useState('');
  const [desc, setDesc] = useState('');
  const [disPer, setDisper] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [id, setID] = useState('');

  console.log("id", id)

  const handleClickOpen = (id,brand,desc,disPer,price,rating,stock) => {
    setID(id)
    setBrand(brand)
    setDesc(desc)
    setDisper(disPer)
    setPrice(price)
    setRating(rating)
    setStock(stock)
    console.log(id,brand)
    setOpen(true);
  };

  const handleClose = (id) => {
    setOpen(false);
  };

  const handleClickOpenPost = () => {
    setOpenPost(true);

  }

  const handleclosePost = () => {
    setOpenPost(false);

  }
  
  function update() {
    console.log("wwwwww",brand,id)
    axios({
      method: 'PUT',
      url: `https://dummyjson.com/products/${id}/`,
      data: { title:brand,description: desc,discountPercentage:disPer,price:price, rating:rating,stock:stock }
    }).then((res) => {
      console.log("res", res.data)
      setOpen(false);
      

    })

    console.log(id)
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

  function PostRequest(){
    const res = axios.post(`${baseURL}/add`, {title:brand, description:desc, discountPercentage:disPer, price:price,rating:rating, stock:stock})
    console.log(res.data)
    
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
                    <td><Button variant="outlined" onClick={() => handleClickOpenPost()}>POST</Button></td>


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

              <td> <Button variant="outlined" onClick={() => handleClickOpen(d.id,d.title,d.description,d.price,d.discountPercentage,d.rating,d.stock)}>update</Button>
              
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
            defaultValue={brand}
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => { setBrand(event.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            defaultValue={desc}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setDesc(event.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="discountPercentage"
            defaultValue={disPer}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setDisper(event.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            defaultValue={price}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setPrice(event.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="rating"
            defaultValue={rating}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setRating(event.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="stock"
            defaultValue={stock}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setStock(event.target.value) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => update()}>Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPost} onClose={handleclosePost}>
        <DialogTitle>Post object</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter informations
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="brand"
            label="brand"
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
            label="Discount Percentagee"
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
          <Button onClick={handleclosePost}>Cancel</Button>
          <Button onClick={() => PostRequest()}>Update</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default JsonServer;

