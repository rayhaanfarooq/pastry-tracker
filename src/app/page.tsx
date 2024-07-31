import React from "react";
import ItemForm from "./ItemForm"
import Table from './table'



export default function Home() {

  return (
    <main className="bg-blue-400 text-center flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" bg-blue-400 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
       

        <div className="text-center justify-center items-center">
           <h1 className="text-white text-4xl p-4 text-center justify-center">
            Pantry Tracker
           </h1>


          <ItemForm />

          <Table />


        </div>
        

      </div>
    </main>
  );
}
