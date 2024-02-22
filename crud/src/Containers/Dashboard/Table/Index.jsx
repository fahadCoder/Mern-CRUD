import { useState, useEffect } from 'react';
// import Form from 'Form/Index.jsx';
import Form from '../Form/Index.jsx';

const Index = () => {


  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API when the component mounts
    fetchData();
  }, []); 
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data); // Update state with the fetched users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    //   again get new data
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  // const handleUpdate=async(id)=>{
  //   console.log("update id is :: ",id);
  //   const response=await fetch(`http://localhost:5000/getUpdateData/${id}`);
  //   if(!response.ok){
  //     throw new Error('Failed to get Update Data');
  //   }
   
  // }


  // find data of update user
  const [selectedUser, setSelectedUser] = useState({
    _id: '',
    name: '',
    email: '',
    city: '',
    salary: '',
  });

  const handleUpdate = (userId) => {
    // Find the user data based on the userId
    const userToUpdate = users.find((users) => users._id === userId);
    setSelectedUser(userToUpdate);
    console.log("update id is :: ",userId);
    console.log("update data is :: ",selectedUser);

  };

  return (
    <div class="container ">
      <Form Data={selectedUser}/>
        <div class="table ">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Salary</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.city}</td>
              <td>{user.salary}</td>
              <td>
              <button onClick={()=>handleUpdate(user._id)} >Update</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

        </div>
    </div>
  )
}

export default Index