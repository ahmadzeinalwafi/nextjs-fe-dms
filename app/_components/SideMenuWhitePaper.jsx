export default function SideMenuWhitePaper() {

    return (
        <div className="menu bg-base-200 w-56 overflow-y-auto">
            <ul>
                <li>
                    <a href="#">Introduction</a>
                </li>
                <li>
                    <a href="#">Problem Statement</a>
                </li>
                <li>
                    <a href="#">Proposed Solution</a>
                </li>
                <li>
                    <details close="true">
                        <summary>Key Feature</summary>
                        <ul>
                            <li>
                                <a href="#">Monitoring</a>
                            </li>
                            <li>
                                <a href="#">Management [SOON]</a>
                            </li>
                            <li>
                                <a href="#">Security [SOON]</a>
                            </li>
                            <li>
                                <a href="#">Integration</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details close="true">
                        <summary>Technical Overview</summary>
                        <ul>
                            <li>
                                <a href="#">System Architecture</a>
                            </li>
                            <li>
                                <a href="#">Technologies</a>
                            </li>
                            <li>
                                <a href="#">Deployment Platform</a>
                            </li>
                            <li>
                                <a href="#">Security</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details close="true">
                        <summary>Use Cases</summary>
                        <ul>
                            <li>
                                <a href="#">Smart Cities</a>
                            </li>
                            <li>
                                <a href="#">Industrial IoT</a>
                            </li>
                            <li>
                                <a href="#">Healthcare IoT</a>
                            </li>
                            <li>
                                <a href="#">Precision Agriculture</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                <a href="#">Call to Action</a>
                </li>
            </ul>
        </div>
    );
}
