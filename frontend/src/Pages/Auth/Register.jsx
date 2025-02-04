import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/features/user.slice";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      fullName: "",
      password: "",
      repeatPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
      let newErrors = {};
      if (!formData.username) newErrors.username = "Username is required!";
      if (!formData.email) newErrors.email = "Email is required!";
      if (!formData.fullName) newErrors.fullName = "Full Name is required!";
      if (!formData.password) newErrors.password = "Password is required!";
      if (formData.password !== formData.repeatPassword)
        newErrors.repeatPassword = "Passwords do not match!";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          const response = await fetch("/api/v1/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });

            const data = await response.json();
            if(data.success){
              dispatch(signInSuccess(data.data))
              navigate("/dashboard?tab=home")
            }
        } catch (error) {
          alert(error.message)
          console.log(error);
        }
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Repeat Password</label>
            <input
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.repeatPassword && (
              <p className="text-red-500 text-sm">{errors.repeatPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Register
          </button>
        </form>
        <div className="flex justify-start mt-2 items-center gap-2">
          <p>Already have a account?</p> <Link to={'/login'} className="text-blue-600 italic" > login here!</Link>
        </div>
      </div>
    </div>
  );
};