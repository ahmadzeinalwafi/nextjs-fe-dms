import axios from "axios";
import { useState, useEffect } from "react";

export default function SideMenu() {
    const [data, setData] = useState(null);
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

    if (data === null) {
        return (
            <div className="menu bg-base-200 w-56 overflow-y-auto flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    
    return (
        <div className="menu bg-base-200 w-56 overflow-y-auto">
            <ul>
                <li>
                    <a>User</a>
                </li>
                <li>
                    <details open>
                        <summary>Devices</summary>
                        <ul>
                            <li>
                                <a href="/dashboard/devices/add">Add Devices</a>
                            </li>
                            <li>
                                <a href="/dashboard/devices/setup">Setup Devices</a>
                            </li>
                            <li>
                                <a href="/dashboard/devices/summary">Devices Summary</a>
                            </li>
                            <li>
                                <details open>
                                    <summary>Devices Details</summary>
                                    <ul>
                                        {data.map((element) => (
                                            <li key={element.Device_Id}>
                                                <a>{element.Name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    );
}
