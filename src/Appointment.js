import { useEffect, useState } from "react";
const Appointment = () => {
  const [bookedAppoint, setBookedAppoint] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: 0,
  });

  const getTheallAppointments = async () => {
    await fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => setBookedAppoint(data))
      .catch((error) => console.log(error));
  };

  const handleOnSubmit = async () => {
    try {
       await fetch("http://localhost:3000/add-appointment", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.log(error);
    }
  };
    const handleDelete = async (id) => {
      console.log(id);
      try {
          const response = await fetch(
            `http://localhost:3000/delete-appointment/${id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
          getTheallAppointments();
      } catch (error) {
          console.log(error);
      }
    };

  const handelInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    getTheallAppointments();
  }, []);

  return (
    <div>
      <div>
        <h1>Booking Appointment App </h1>
      </div>
      <div>
        <form onSubmit={handleOnSubmit}>
          <label id="name">Name:</label>
          <input
            type="text"
            placeholder="name"
            id="name"
            value={formData.name}
            onChange={handelInputChange}
          />
          <label id="phonenumber">Phone Number:</label>
          <input
            type="number"
            placeholder="Phone Number"
            id="phoneNumber"
            maxLength={10}
            value={formData.phoneNumber}
            onChange={handelInputChange}
          />
          <label id="email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handelInputChange}
          />
          <button type="submit">submit</button>
        </form>
      </div>
      <div>
        <h2>Booked Appointments </h2>
        <ul>
          {bookedAppoint.map((appointment) => {
            return (
              <li key={appointment.id}>
                {appointment.name} - {appointment.email} <button onClick={()=>handleDelete(appointment.id)}>Delete</button>{" "}
                <button>Edit</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Appointment;
