import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { addData, deleteData, fetchContent, updateData } from './redux/rootSlice';
import { useDispatch, useSelector } from 'react-redux';
import UpdateDialog from './components/UpdateDialog';

function JsonServer() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const contents = useSelector((state) => state.content.data)
  const isLoading = useSelector((state) => state.content.isLoading)
  const error = useSelector((state) => state.content.error)
  const [selectedData,setSelectedData] = useState([])

  useEffect(() => {dispatch(fetchContent({}))} ,[dispatch])
  if(isLoading){
    return 'loading'
  }
  if(error){
    return error
  }

  const handleClose = (id) => {
    setOpen(false);
    setSelectedData([])
  };

  const handleClosePost = () => {
    setOpenPost(false);
  };



  return (
    <>
    <div id="box" className=''>
      <table>
      <thead>
          <tr>
            <td>ID</td>
            <td>Brand</td>
            <td>Description</td>
            <td>Discount Percentage</td>
            <td>Price</td>
            <td>Rating</td>
            <td>Stock</td>
            
                    <td><Button variant="outlined" onClick={() => {setOpen(true)}}>POST</Button></td>

          </tr>
        </thead>
        <tbody>
        {
          contents && contents.map((d,i) => {
          return(
            <tr key={i}>
              <td>{d.title}</td>
              <td>{d.description}</td>
              <td>{d.price}</td>
              <td>{d.discountPercentage}</td>
              <td>{d.rating}</td>
              <td>{d.stock}</td>
              <td> <button onClick={() => dispatch(deleteData({id: d.id, contents}))}>Sil</button></td>

              <td> <Button variant="outlined" onClick={() =>{
                setOpen(true)
                setSelectedData(d)
              }}>update</Button>
              
              </td>
            </tr>

            );
        }
          
        )
      }

        </tbody>
      </table>
      


    </div>
    {open && <UpdateDialog open={open} close={handleClose} selectedData={selectedData}/>}
    </>
  );
}

export default JsonServer;