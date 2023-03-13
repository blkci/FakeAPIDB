import React from "react";
import {Dialog,DialogContentText,DialogTitle,DialogActions,DialogContent,TextField,Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect,useState } from 'react';
import { addData, deleteData, fetchContent, updateData } from '../redux/rootSlice';
import { removeData } from '../redux/rootSlice';
  
function UpdateDialog({open,selectedData=null,close}) {

    const dispatch = useDispatch();
    const [brand, setBrand] = useState(selectedData.brand || '');
    const [desc, setDesc] = useState(selectedData.description || '');
    const [disPer, setDisper] = useState(selectedData.discountPercentage || '');
    const [price, setPrice] = useState(selectedData.price || '');
    const [rating, setRating] = useState(selectedData.rating || '');
    const [stock, setStock] = useState(selectedData.stock || '');
    const [id, setID] = useState(selectedData.id || '');

  useEffect(()=>{
    setID(selectedData.id)
    setBrand(selectedData.brand)
    setDesc(selectedData.desc)
    setDisper(selectedData.disPer)
    setPrice(selectedData.price)
    setRating(selectedData.rating)
    setStock(selectedData.stock)

},[selectedData])
  
    
  function requestData(){
    const data = {
        title: brand,
        description: desc,
        discountPercentage: disPer,
        price: price,
        rating: rating,
        stock: stock
  }

  console.log(data);
    return data
  }

  console.log("qqq",selectedData)

  const postData=()=>{
    const data = requestData()

    if(!Object.keys(selectedData || []).length > 0){
      dispatch(addData(data))
    }
    else{
      dispatch(updateData({id,data})).then((res)=>
      {
         console.log("res",res);
         if(res.payload.status === 200){
             dispatch(fetchContent({})).then(res=>{
                 close()
             })
           
         }
     }
      )
    } 
   }
  
  return (
    <Dialog open={open} onClose={close}>
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
            value={brand}
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
            value={desc}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setDesc(event.target.value) }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="discountPercentage"
            value={disPer}
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
            value={price}
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
            value={rating}
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
            value={stock}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setStock(event.target.value) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={() => postData()}>Update</Button>
        </DialogActions>
      </Dialog>
  );
}

export default UpdateDialog;