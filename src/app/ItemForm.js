'use client'
import React , { useState, useEffect } from 'react';
import { addDoc, doc, updateDoc, getDoc, collection, query, where, onSnapshot, getDocs } from 'firebase/firestore'
import { db } from './firebase'


export default function ItemForm() {

    const getItem = async (name) => {
        
            // Create a query for the 'items' collection
            const q = query(collection(db, "items"));
    
            // Fetch all documents in the collection
            const querySnapshot = await getDocs(q);
    
            // Map documents to an array
            const itemsArr = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    
            // Check if item exists

            const foundItem = itemsArr.find(item => item.name === name.toLowerCase());
    
            // Return true if item exists, otherwise false

            if (foundItem) {
                return {
                    exists: true,
                    name: foundItem.name,
                    id: foundItem.id
                };
            } else {
                return {
                    exists: false,
                    name: null,
                    id: null
                };
            }
    };
    
    const [newItem, setNewItem] = useState({ name: '', quantity: '' })

    const addItem = async(e) => {
        e.preventDefault()
        
        if(newItem.name === '' || newItem.quantity === 0) return

        const existingData = await getItem(newItem.name)

        if(existingData.exists){

            const docRef = doc(db, 'items', existingData.id)
            const docSnap = await getDoc(docRef)
            const currentQuantity = parseFloat(docSnap.data().quantity) || 0
            const extraQuantity = parseFloat(newItem.quantity) || 0

            await updateDoc(docRef, {
                quantity: currentQuantity + extraQuantity
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
        <div className=" bg-purple-500 p-4 rounded-lg text-center justify-center ">

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
