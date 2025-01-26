"use client"
import { useState } from "react";
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
    let devices = [
        {
            "Name": "Device1"
        }
    ]

    const [formData, handleInputChange] = useForm({
        name: '',
        type: '',
        location: '',
        status: '',
        description: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData)
    };


    return (
        <div className="flex h-screen">
            <SideMenu/>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center bg-gray-900 text-white overflow-y-auto">
                <div className="card w-[50%] bg-gray-800 shadow-xl mt-[-180px]">
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
        </div>
    );
}
