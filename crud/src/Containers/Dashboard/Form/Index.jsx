import React, { useState, useEffect } from 'react';
const Index = ({ Data }) => {

  const [formData, setFormData] = useState({
    _id: Data._id,
    name: Data.name,
    email: Data.email,
    city: Data.city,
    salary: Data.salary,
  });
  console.log("receiving data in formData :: ", formData);
  useEffect(() => {
    setFormData(Data);
  }, [Data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("data is ", formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/sendData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        // console.log("form dta is : ",body);
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log("Response from server:", responseData);
      setFormData({
        name: "",
        email: "",
        city: "",
        salary: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
    window.location.reload();
  };
  return (
    <div class="container">
      <div class="mb-3">
        <h2>New User</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="Name" class="form-label">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="City" class="form-label">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            class="form-control"
          />

          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div class="mb-3">
          <label for="City" class="form-label">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="Salary" class="form-label">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter Salary"
            class="form-control"
          />
        </div>

        <button type="submit" class="btn btn-primary float-right">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Index;
