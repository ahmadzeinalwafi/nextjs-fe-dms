"use client"
import SideMenu from "@/app/_components/SideMenu"
import { useState } from "react";

export default function SetupDevices() {
    let devices = [
        {
            "Device_Id": "device_id",
            "Name": "Device1"
        }
    ]
    const [selectedDevice, setSelectedDevice] = useState(devices[0]);
    const [formData, setFormData] = useState([
        { key: 'temperature', unit: 'float64' },
        { key: '', unit: '' },
    ]);

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
            Device_Id: selectedDevice.Device_Id,
            Fields: fields
        };
    
        console.log(payload);
    };
    
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
                                {devices.map((device, index) => (
                                    <option key={index} value={device.Name}>
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
                                        <option value="in32">int32</option>
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
        </div>
    )
}
