"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "@/app/_components/TextInput";
import SelectInput from "@/app/_components/SelectInput";
import TextArea from "@/app/_components/TextArea";
import SideMenu from "@/app/_components/SideMenu";

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

export default function AddDevices() {
    const [toastMessage, setToastMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const userId = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("dms-user-id="))?.split("=")[1];

                setUserId(userId)
                console.log(userId)
            } catch (error) {
                console.error("Failed to fetch devices:", error.response?.data || error.message);
            }
        };

        fetchDevices();
    }, []);
    
    const [formData, handleInputChange] = useForm({
        name: '',
        type: '',
        location: '',
        status: '',
        description: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        formData.owner = userId
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/devices`,
                formData
            );
            setToastMessage("Device has been added, please configure it before usage");
            setTimeout(() => {
                window.location.href = "/dashboard/devices/add";
            }, 3000);
            setIsLoading(false)
        } catch (err) {
            alert(err)
            setIsLoading(false)
        }

    };

    if (isLoading == true){
        return (
            <div className="menu bg-base-200 w-56 overflow-y-auto flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            <SideMenu/>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center bg-gray-900 text-white overflow-y-auto">
                <div className="card w-[50%] bg-gray-800 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-center">Add Device</h2>
                        <form onSubmit={handleSubmit}>
                            <TextInput
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Device name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <TextInput
                                label="Type"
                                name="type"
                                type="text"
                                placeholder="Device type"
                                value={formData.type}
                                onChange={handleInputChange}
                            />
                            <TextInput
                                label="Location"
                                name="location"
                                type="text"
                                placeholder="Device location"
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                            <SelectInput
                                label="Status Device"
                                name="status"
                                options={["Active", "Inactive"]}
                                value={formData.status}
                                onChange={handleInputChange}
                            />
                            <TextArea
                                label="Device Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Write description about your device..."
                            />
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-neutral w-full bg-indigo-700 hover:bg-indigo-900"
                                >
                                    Add Device
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {toastMessage && (
                    <div className="toast toast-end absolute bottom-0 right-0 p-4">
                        <div className="alert alert-success">
                            <span>{toastMessage}</span>
                        </div>
                    </div>
                )}
        </div>
    );
}
