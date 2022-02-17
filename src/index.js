import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getDatabase, ref, push, set, onValue, query, orderByChild, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

const firebaseConfig = {
    apiKey: "<KEY>",
    authDomain: "<DOMAIN>",
    databaseURL: "<DATABASE-URL>",
    projectId: "<PROJECT-ID>",
    storageBucket: "<BUCKET>",
    messagingSenderId: "<SENDER-ID>",
    appId: "<APP-ID>"
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
