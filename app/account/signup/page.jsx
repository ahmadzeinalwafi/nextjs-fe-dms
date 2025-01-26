"use client"
import axios from "axios";
import { useState } from "react";
import TextInput from "@/app/_components/TextInput";
import SuccessAlert from "@/app/_components/Alert/SuccessAlert";

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return [values, handleChange];
};

export default function SignUp() {
    const [formData, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
    });

    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                process.env.BASE_BACKEND_URL + "/users",
                formData
            );
            console.log(response.data);

            setIsSuccess(true);
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
            setIsSuccess(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="card w-96 bg-gray-800 shadow-xl">
                <div className="card-body">
                    {isSuccess && (
                        <SuccessAlert message={"Registration successful, please login to verify your account"} />
                    )}
                    <h2 className="card-title text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn btn-neutral w-full bg-indigo-700 hover:bg-indigo-900"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <p className="text-center">
                        Already have account? <br /> Please <a href="/account/login"><span className="text-blue-500">login</span></a> to access the feature of <br /> <span className="text-yellow-300">Node Sphere</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
