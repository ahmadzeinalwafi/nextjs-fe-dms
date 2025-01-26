"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import SideMenu from "@/app/_components/SideMenu";
import { FaCopy } from "react-icons/fa"; // Copy icon from react-icons

export default function DeviceTable() {
    const [devices, setDevices] = useState([]);
    const [toastMessage, setToastMessage] = useState("");

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
                    // console.log(response);
                    // Map over devices to format 'Created_At' directly after fetching
                    const formattedDevices = response.data.data.map((device) => ({
                        ...device,
                        Created_At: new Date(device.Created_At).toLocaleString()
                    }));
                    setDevices(formattedDevices);
                }
            } catch (error) {
                console.error("Failed to fetch devices:", err);
            }
        };

        fetchDevices();
    }, []);

    const handleDelete = async (deviceId) => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/devices/${deviceId}`,
            );
            setToastMessage(`Device ${deviceId} has been deleted`);
            setTimeout(() => window.location.href = "/dashboard/devices/summary", 1000);
        } catch (err){
            alert(err)
        }
    };

    const handleCopyToken = (token) => {
        navigator.clipboard.writeText(token).then(() => {
            setToastMessage("Token copied to clipboard!");
            setTimeout(() => setToastMessage(""), 3000);
        });
    };

    if (devices.length === 0) {
        return (
            <div className="menu bg-base-200 w-56 overflow-y-auto flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-900">
            <SideMenu devices={devices} />
            <div className="w-full max-w-4xl mx-auto p-4 overflow-y-auto">
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
                        {devices.map((device) => (
                            <tr key={device.Device_Id}>
                                <td className="px-4 py-2 border-b">{device.Device_Id}</td>
                                <td className="px-4 py-2 border-b">{device.Name}</td>
                                <td className="px-4 py-2 border-b">{device.Type}</td>
                                <td className="px-4 py-2 border-b">{device.Location}</td>
                                <td className="px-4 py-2 border-b">
                                    <div className="flex items-center">
                                        <span className="mr-2">••••••</span>
                                        <button
                                            className="btn btn-ghost text-blue-500"
                                            onClick={() => handleCopyToken(device.Token)}
                                        >
                                            <FaCopy />
                                        </button>
                                    </div>
                                </td>
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

                {/* Toast Notification */}
                {toastMessage && (
                    <div className="toast toast-end absolute bottom-0 right-0 p-4">
                        <div className="alert alert-success">
                            <span>{toastMessage}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
