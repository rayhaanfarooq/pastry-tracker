'use client'
import React , { useState, useEffect } from 'react';
import { addDoc, doc, updateDoc, getDoc, collection, query, deleteDoc, onSnapshot} from 'firebase/firestore'
import { db } from './firebase'
import { Box, Stack, Typography } from '@mui/material';

export default function Table() {
    const [items, setItems ] = useState([
       
      ])

      useEffect(() => {
        const q = query(collection(db, "items"))
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let itemsArr = []
    
          querySnapshot.forEach((doc) => {
            itemsArr.push({...doc.data(), id: doc.id})
    
          })
          setItems(itemsArr)
    
          return () => unsubscribe();
    
    
        })
    
      })
    

    const deleteItem = async(id) => {
        await deleteDoc(doc(db, 'items', id));
      }

    return (

     <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
        {items.map((item, id) => (
          <Box 
            key={id}
            width="100%"
            minHeight="150px" 
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="orange"
            padding={5}
           
          >

            <div className="bg-blue-400 rounded-lg p-4 w-full flex justify-between text-white">
              <span className="capitalize">{item.name}</span>
              <span>Amount: {item.quantity}</span>
            </div>
            <button onClick={() => deleteItem(item.id)} className="bg-blue-400 text-white ml-8 p-4 rounded-lg hover:bg-slate-900 w-24"> Delete </button>
           
           
          </Box>
        ))}
      </Stack>

      
       

       
        //   <ul>
        //     {items.map((item, id) => (
        //       <li key={id} className="my-4 w-full flex justify-between bg-slate-950 text-white">
        //         <div className="p-4 w-full flex justify-between">
        //           <span className="capitalize">{item.name}</span>
        //           <span>{item.quantity}</span>
        //         </div>
        //         <button onClick={() => deleteItem(item.id)} className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"> x </button>
        //       </li>
        //     ))}
        //   </ul>
           
       
    )
}
