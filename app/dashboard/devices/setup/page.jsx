"use client"
import SideMenu from "@/app/_components/SideMenu"
import { useState, useEffect } from "react";
import axios from "axios";

export default function SetupDevices() {
    const [toastMessage, setToastMessage] = useState("");

    const [data, setData] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(""); // Initialize as empty string
    const [formData, setFormData] = useState([
        { key: 'temperature', unit: 'float64' },
        { key: '', unit: '' },
    ]);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const userId = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("dms-user-id="))?.split("=")[1];

                if (userId) {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/users/${userId}/devices`
                    );
                    console.log(response);
                    setData(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch devices:", error.response?.data || error.message);
            }
        };

        fetchDevices();
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            setSelectedDevice(data[0].Device_Id); // Update selectedDevice once data is available
        }
    }, [data]); // This will run whenever data changes

    const handleAddField = () => {
        setFormData([
            ...formData,
            { key: '', value: '', unit: '' },
        ]);
    };

    const handleRemoveField = (index) => {
        const newFormData = formData.filter((_, i) => i !== index);
        setFormData(newFormData);
    };

    const handleChange = (index, field, value) => {
        const newFormData = [...formData];
        newFormData[index][field] = value;
        setFormData(newFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fields = formData.reduce((acc, item) => {
            if (item.key && item.unit) {
                acc[item.key] = item.unit;
            }
            return acc;
        }, {});

        const payload = {
            Device_Id: selectedDevice,
            Fields: fields
        };
        try {
            let response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/devices/${selectedDevice}/setup`,
                payload
            )
            setToastMessage("Device has been configured, you can use the device now");
            setTimeout(() => {
                window.location.href = "/dashboard/devices/setup";
            }, 3000);
        } catch (err){
            alert(err)
        }

        console.log(payload);
    };

    if (data === null) {
        return (
            <div className="menu bg-base-200 w-56 overflow-y-auto flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-900">
            <SideMenu/>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-start bg-gray-900 text-white overflow-y-auto">
                <div className="w-full max-w-4xl p-6">
                    <div className="card p-6 shadow-lg w-full bg-gray-800">
                        <div className="flex items-center mb-4">
                            <h2 className="text-2xl font-bold">Setup Devices</h2>
                            <select
                                className="select select-bordered ml-4 text-xl font-bold"
                                value={selectedDevice}
                                onChange={(e) => setSelectedDevice(e.target.value)}
                            >
                                {data.map((device, index) => (
                                    <option key={index} value={device.Device_Id}>
                                        {device.Name} - {device.Device_Id}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <form>
                            {formData.map((item, index) => (
                                <div key={index} className="flex items-center space-x-4 mb-4">
                                    <input
                                        type="text"
                                        className="input input-bordered w-3/5"
                                        placeholder="Key"
                                        value={item.key}
                                        onChange={(e) => handleChange(index, 'key', e.target.value)}
                                    />
                                    <select
                                        className="select select-bordered w-1/3"
                                        value={item.unit}
                                        onChange={(e) => handleChange(index, 'unit', e.target.value)}
                                    >
                                        <option value="float64">float64</option>
                                        <option value="float32">float32</option>
                                        <option value="int8">int8</option>
                                        <option value="int16">int16</option>
                                        <option value="int32">int32</option>
                                        <option value="int64">int64</option>
                                        <option value="string">string</option>
                                    </select>
                                    <button
                                        type="button"
                                        className="btn btn-error btn-sm"
                                        onClick={() => handleRemoveField(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleAddField}
                                >
                                    Add Field
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleSubmit}
                                >
                                    Add Setup Configuration
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
    )
}
