import React from "react";
import { useEffect, useState } from "react";
//adding, deleting and updating
import { collection, addDoc, getDocs, updateDoc, doc,deleteDoc } from "firebase/firestore";
import { db } from "./firebase-config"
import { async } from "@firebase/util";

function App()
{
  const [users, setUsers] = useState(0);
  const userCollectionRef = collection(db, "users")
  const [newName, setNewName] = useState("")
  const [newAge, setAge] = useState(0)

  //Reading from the database when the page loads 
  useEffect(() =>
  {
    const gettingUsers = async () =>
    {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    //calling the function to get the data 
    gettingUsers()
  });
  //Addeding a user 
  const addUser = async () =>
  {
    await addDoc(userCollectionRef, { Name: newName, age: newAge })
  }
  /*
create aync createUser function 
//create a state for the input value 
//call the addDoc method with await with the userCollectionRef as the first argument and add the  state filled with the input value as the second parameter 
//
*/

  //Updating 

  const updateAge = async (id, age) =>
  {

    //location of the data 
    const location = doc(db, "users", id)
    //the updated value
    const updatedValue = { age: age + 1 }
    //updating it
    await updateDoc(location, updatedValue)

  }
  //specify what we what to change 
  //call the updateDoc function that takes 2 arguments 
  //first the exact location of the doc that needs to be updated, by using doc from firebase which takes in three parameters which are, db,/name of the collection/, id
  //second the new specefied filed 


  //Delete 

  const deleting = async (id) =>
  {
    const location = doc(db, "users", id)
    await deleteDoc(location)

  }


  return (
    <div className="App">
      <input placeholder="Name..." onChange={(e) => { setNewName(e.target.value) }} />
      <input placeholder="Age" onChange={(e) => { setAge(e.target.value) }} />
      <button onClick={addUser}> Create User</button>

      {users && users.map((user) =>
      {
        return <div>
          <h1>{user.Name}</h1>
          <h1>{user.age}</h1>

          <button onClick={() => { updateAge(user.id, user.age) }}>Add age by One</button>
          <button onClick={() => { deleting(user.id) }}>Delete</button>
        </div>

      })}

    </div>
  );
}

export default App;
