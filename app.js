
import { getDatabase } from "firebase/database";

const database = getDatabase();
let name = document.getElementById("name");
let message = document.getElementById("message");
let add = document.getElementById("add");

add.addEventListener("click", function(e){

    const db = getDatabase();

    const id = push(child(ref(db), 'messages')).key;

    console.log(id)

    /*
    set(ref(db, 'message/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
    */

    e.preventDefault();
});