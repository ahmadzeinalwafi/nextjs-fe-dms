import axios from "axios";
import { cookies } from 'next/headers'

import SideMenu from "../_components/SideMenu"

export default async function Dashboard() {
    const cookieStore = await cookies()
    const token = cookieStore.get('dms-token').value
    const userId = cookieStore.get('dms-user-id').value

    let devices = [
        {
            "Name": "Device1"
        }
    ]

    return (
        <div className="flex h-screen">

            <SideMenu devices={devices} />

            {/* Main Content */}
            <div className="flex-1 bg-base-100 p-4 overflow-y-auto">
                <section id="user-menu">
                    <h2 className="text-xl">User Menu</h2>
                    <p>The User menu allows users to manage their account, preferences, and settings related to the IoT monitoring dashboard. Here, users can view their profile and modify their login information or settings. [COMING SOON FEATURE]</p>
                </section>
                <br />
                <section id="add-device">
                    <h2 className="text-xl">Add Device</h2>
                    <p>The Add Device section allows users to register and add new IoT devices to the monitoring system. Users can specify the device type, ID, and other relevant configurations for the device.</p>
                </section>
                <br />
                <section id="setup-device">
                    <h2 className="text-xl">Setup Device</h2>
                    <p>In the Setup Device section, users can configure the settings of their IoT devices. This includes network configuration, operational parameters, and other custom settings based on the device's capabilities.</p>
                </section>
                <br />
                <section id="summary-device">
                    <h2 className="text-xl">Summary Device</h2>
                    <p>The Summary Device section provides a quick overview of all registered devices. Users can view the status of each device, and can choose to delete devices that are no longer in use.</p>
                </section>
                <br />
                <section id="detail-device">
                    <h2 className="text-xl">Detail Device</h2>
                    <p>The Detail Device section offers in-depth information about each IoT device. Here, users can view charts, data trends, and other relevant metrics. This section allows users to analyze performance and status data for each device in more detail.</p>
                </section>
            </div>
        </div>
    )
}