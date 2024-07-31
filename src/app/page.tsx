import React from "react";
import ItemForm from "./ItemForm"
// import { db } from "./firebase"



export default function Home() {

  return (
    <main className="text-center flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl p-4 text-center justify-center">
          Pantry Tracker
        </h1>

        <ItemForm />
        

      </div>
    </main>
  );
}
