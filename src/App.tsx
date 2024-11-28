import logo from "./logo.svg";
import "./App.css";
import Form from "./Form";
import { useState, useEffect} from "react";
import axios from "axios";

function App() {
  type User = {
    id: number;
    name: string;
    age: number; 
  }

  type FormData = {
    name: string;
    age: number;
  }

  const getUser = async () => {
    try {
      const response = await fetch('http://localhost:8000/user');
  
      if (!response.ok) {
        throw new Error(`Failed to fetch users, status: ${response.status}`);
      }
  
      const users = await response.json() as User[];
      return users;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const [users, setUsers] = useState<User[]>([]);
  const update = async () => {
    const users = await getUser();
    if (users === undefined) {
      return;
    }
    setUsers(users);
  }

  useEffect(() => {
    update();
  }, []);

  const handleSubmit = async (name: string, age: number) => {
    if (!name) {
      alert("Please enter name");
      return;
    }

    if (name.length > 50) {
      alert("Please enter a name shorter than 50 characters");
      return;
    }

    if (age < 20 || age > 80) {
      alert("Please enter age between 20 and 80");
      return;
    }
    const formdata: FormData = {
      name: name,
      age: age
    };

    try {
      const response = await axios.post('http://localhost:8000/user', formdata);
      console.log('Response:', response);
    } catch (error) {
      console.error('Failed to post data', error);
    }
    console.log('Form data:', formdata);
    update();
  };


  return (
    <div className="App">
      <header className="App-header">
       <p>User Register</p>
      </header>
      <Form onSubmit={handleSubmit} />
      <div className="container">
        {users.map((user: User) => (<div key={user.id} className="data">{user.name}, {user.age}</div>))}
      </div>
    </div>
  );
}

export default App; 