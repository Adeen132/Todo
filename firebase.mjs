// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdHSTzedUMVGBOmx-9zrKosX284DobFCc",
    authDomain: "firestore-project-29247.firebaseapp.com",
    projectId: "firestore-project-29247",
    storageBucket: "firestore-project-29247.appspot.com",
    messagingSenderId: "614544745281",
    appId: "1:614544745281:web:db091974c11f5c7177f7c0"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Elements
const todoValue = document.getElementById('todoValue');
const addtoDo = document.getElementById('submit');
const ul = document.getElementById('list');

// Function to load and display todo items
const makingList = async () => {
    const querySnapshot = await getDocs(collection(db, "todo"));
    ul.innerHTML = ''; // Clear the list before adding items
    querySnapshot.forEach((doc) => {
        const todos = doc.data();
        const li = document.createElement('li');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        li.textContent = todos.todo;
      
        li.id = doc.id; // Set the ID of the list item to the document ID
        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        ul.appendChild(li);

        // Edit button event
        editButton.addEventListener('click', () => editTodoItem(doc.id, todos.todo));
        // Delete button event
        deleteButton.addEventListener('click', () => deleteTodoItem(doc.id));
    });
};

// Function to edit a todo item
const editTodoItem = async (id, currentTodo) => {
    const newTodo = prompt("Edit your todo", currentTodo);
    if (newTodo) {
        try {
            const todoRef = doc(db, "todo", id);
            await updateDoc(todoRef, {
                todo: newTodo
            });
            makingList(); // Refresh the list
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    }
};

// Function to delete a todo item
const deleteTodoItem = async (id) => {
    try {
        await deleteDoc(doc(db, "todo", id));
        makingList(); // Refresh the list
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};

// Event listener to add a new todo
addtoDo.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
        await addDoc(collection(db, "todo"), {
            todo: todoValue.value
        });
        makingList(); // Refresh the list
        todoValue.value = ''; // Clear the input
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// Initial call to display existing todos
makingList();
