"use client"
import { useState, useEffect } from "react";
import SideMenu from "@/app/_components/SideMenu";

export default function DeviceTable() {
    // Mock device data
    const mockDevices = [
        {
            Device_Id: "1",
            Name: "Device A",
            Type: "Sensor",
            Location: "Room 101",
            Token: "abc123",
            Status: "Active",
            Description: "Temperature sensor",
            Created_At: new Date("2023-01-01T10:00:00Z")
        },
        {
            Device_Id: "2",
            Name: "Device B",
            Type: "Camera",
            Location: "Lobby",
            Token: "xyz456",
            Status: "Inactive",
            Description: "Security camera",
            Created_At: new Date("2023-02-15T14:30:00Z")
        },
        {
            Device_Id: "3",
            Name: "Device C",
            Type: "Actuator",
            Location: "Room 202",
            Token: "lmn789",
            Status: "Active",
            Description: "Door actuator",
            Created_At: new Date("2023-03-10T08:20:00Z")
        }
    ];

    const [devices, setDevices] = useState(mockDevices);
    const [formattedDevices, setFormattedDevices] = useState([]);

    useEffect(() => {
        // Format the date for each device after the component is mounted
        const formatted = devices.map((device) => ({
            ...device,
            Created_At: device.Created_At.toLocaleString()
        }));
        setFormattedDevices(formatted);
    }, [devices]);

    const handleDelete = (deviceId) => {
        const updatedDevices = devices.filter((device) => device.Device_Id !== deviceId);
        setDevices(updatedDevices);
    };

    return (
        <div className="flex h-screen bg-gray-900">
            <SideMenu devices={devices} />
            <div className="w-full max-w-4xl mx-auto p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Device List</h2>
                <table className="table-auto w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Device ID</th>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Type</th>
                            <th className="px-4 py-2 border-b">Location</th>
                            <th className="px-4 py-2 border-b">Token</th>
                            <th className="px-4 py-2 border-b">Status</th>
                            <th className="px-4 py-2 border-b">Description</th>
                            <th className="px-4 py-2 border-b">Created At</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formattedDevices.map((device) => (
                            <tr key={device.Device_Id}>
                                <td className="px-4 py-2 border-b">{device.Device_Id}</td>
                                <td className="px-4 py-2 border-b">{device.Name}</td>
                                <td className="px-4 py-2 border-b">{device.Type}</td>
                                <td className="px-4 py-2 border-b">{device.Location}</td>
                                <td className="px-4 py-2 border-b">{device.Token}</td>
                                <td className="px-4 py-2 border-b">{device.Status}</td>
                                <td className="px-4 py-2 border-b">{device.Description}</td>
                                <td className="px-4 py-2 border-b">{device.Created_At}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        className="btn btn-error btn-sm"
                                        onClick={() => handleDelete(device.Device_Id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
