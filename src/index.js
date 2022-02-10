import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getDatabase, ref, push, set, onValue, query, orderByChild, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfDSpjM9bsM78ZsBIbRVoEtW7T8nbhwJo",
    authDomain: "humber-projects-340818.firebaseapp.com",
    databaseURL: "https://humber-projects-340818-default-rtdb.firebaseio.com",
    projectId: "humber-projects-340818",
    storageBucket: "humber-projects-340818.appspot.com",
    messagingSenderId: "859327946131",
    appId: "1:859327946131:web:8806f702fc4be451ce9c66"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let add = document.getElementById("add");

add.addEventListener("click", function(e){

    const name = document.getElementById("name");
    const message = document.getElementById("message");

    const messageListRef = ref(database, 'messages');
    const newMessageRef = push(messageListRef);

    set(newMessageRef, {
        'name': name.value,
        'message': message.value,
        'createdAt': serverTimestamp()
    });

    e.preventDefault();

});

const messageListRef = query(ref(database, 'messages'), orderByChild('createdAt'));

onValue(messageListRef, (snapshot) => {

    const convo = document.getElementById('convo');
    
    while(convo.firstChild && convo.removeChild(convo.firstChild));

    snapshot.forEach((childSnapshot) => {

      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();

        let li = document.createElement("li");
        li.appendChild(document.createTextNode(childData.name + ': ' + childData.message));
        
        convo.append(li);

    });
});