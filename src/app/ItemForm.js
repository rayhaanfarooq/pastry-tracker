'use client'
import React , { useState } from 'react';
import { addDoc, doc, updateDoc, getDoc, collection, query } from 'firebase/firestore'
import { db } from './firebase'

export default function ItemForm() {

    const [newItem, setNewItem] = useState({ name: '', quantity: '' })

    const addItem = async(e) => {
        e.preventDefault()


        if(newItem.name === '' || newItem.quantity === 0) return

        const docRef = db.collection('items').doc(newItem.name.trim().toLowerCase())
        console.log(docRef)
        const docSnap = await getDoc(docRef)
        console.log(docSnap)
        


        if(docSnap.exists()){
            await updateDoc(docRef, {
                quantity: docSnap.data().quantity + newItem.quantity
            })
        }

        else{
            await addDoc(collection(db, 'items'), {
                name: newItem.name.trim().toLowerCase(),
                quantity: newItem.quantity
    
            })
        }

        setNewItem({ name: '', quantity: '' })
    }

    return (
        <div className=" bg-slate-800 p-4 rounded-lg text-center justify-center ">

        <form className="grid grid-cols-6 items-center">
          <input 
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="text-black col-span-2 p-3 border"
            type="text"
            placeholder="Pantry Item"
          />

          <input 
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            className="text-black col-span-2 p-3 border mx-3"
            type="number"
            placeholder="Quantity"
          />
          
          <button 
            onClick={addItem}
            type="submit"
            className="text-white bg-slate-900 hover:bg-slate-600 text-xl p-3"
          > + </button>


        </form>

      </div>
    )
}
