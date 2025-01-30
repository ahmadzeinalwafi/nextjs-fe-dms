export default function SideMenuDocumentation() {

    return (
        <div className="menu bg-base-200 w-56 overflow-y-auto">
            <ul>
                <li>
                    <a href="/documentation/about-platform">About Platform</a>
                </li>
                <li>
                    <details open>
                        <summary>Dashboard</summary>
                        <ul>
                            <li>
                                <a href="/documentation/dashboard#registering-device">Registering Device</a>
                            </li>
                            <li>
                                <a href="/documentation/dashboard#configuring-device">Configuring Device</a>
                            </li>
                            <li>
                                <a href="/documentation/dashboard#summary-devices">Summary Devices</a>
                            </li>
                            <li>
                                <a href="/documentation/dashboard#dashboard">Dashboard</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details open>
                        <summary >HTTP Approach</summary>
                        <ul>
                            <li>
                                <a href="/documentation/http-approach#python">Python</a>
                            </li>
                            <li>
                                <a href="/documentation/http-approach#go">Go</a>
                            </li>
                            <li>
                                <a href="/documentation/http-approach#arduino">Arduino [SOON]</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details open>
                        <summary>MQTT Approach</summary>
                        <ul>
                            <li>
                                <a href="/documentation/mqtt-approach#python">Python</a>
                            </li>
                            <li>
                                <a href="/documentation/mqtt-approach#go">Go</a>
                            </li>
                            <li>
                                <a href="/documentation/mqtt-approach#arduino">Arduino [SOON]</a>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    );
}
