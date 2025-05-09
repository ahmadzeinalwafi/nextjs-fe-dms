"use client"
import { useState } from "react";
import TextInput from "@/app/_components/TextInput";
import axios from "axios";
import SuccessAlert from "@/app/_components/Alert/SuccessAlert";
import { useRouter } from 'next/navigation'

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const router = useRouter()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return [values, handleChange];
};

export default function Login() {
    const router = useRouter()
    const [formData, handleInputChange] = useForm({
        email: '',
        password: '',
    });

    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setIsSuccess(true)
            setTimeout(() => {
                router.push('/dashboard'); 
            }, 2000);
            console.log('Response:', response.data);
        } catch (error) {
            alert(error)
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="card w-96 bg-gray-800 shadow-xl">
                <div className="card-body">
                    {isSuccess && (
                        <SuccessAlert message={"Login successful, please enjoy the platform!"} />
                    )}{/*  */}
                    <h2 className="card-title text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
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
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="text-center">
                        Are you doesn't have account currently? <br /> Please <a href="/account/signup"><span className="text-blue-500">sign up</span></a> to access the feature of <br /> <span className="text-yellow-300">Node Sphere</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
