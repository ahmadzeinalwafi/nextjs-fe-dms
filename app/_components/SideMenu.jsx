export default function SideMenu({devices}) {
    console.log('Received devices:', devices);

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
                                <a>Add Devices</a>
                            </li>
                            <li>
                                <a>Setup Devices</a>
                            </li>
                            <li>
                                <a>Devices Summary</a>
                            </li>
                            <li>
                                <details open>
                                    <summary>Devices Details</summary>
                                    <ul>
                                        {devices.map((element) => (
                                            <li key={element.Name}>
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
    )
}