export default function SideMenuWhitePaper() {

    return (
        <div className="menu bg-base-200 w-56 overflow-y-auto">
            <ul>
                <li>
                    <a href="/about/project/introduction">Introduction</a>
                </li>
                <li>
                    <a href="/about/project/problem-statement">Problem Statement</a>
                </li>
                <li>
                    <a href="/about/project/proposed-solution">Proposed Solution</a>
                </li>
                <li>
                    <details open>
                        <summary >Key Features</summary>
                        <ul>
                            <li>
                                <a href="/about/project/key-features#monitoring">Monitoring</a>
                            </li>
                            <li>
                                <a href="#">Management [SOON]</a>
                            </li>
                            <li>
                                <a href="#">Security [SOON]</a>
                            </li>
                            <li>
                                <a href="/about/project/key-features#integration">Integration</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details open>
                        <summary>Technical Overview</summary>
                        <ul>
                            <li>
                                <a href="/about/project/technical-overview#system-architecture">System Architecture</a>
                            </li>
                            <li>
                                <a href="/about/project/technical-overview#technologies">Technologies</a>
                            </li>
                            <li>
                                <a href="/about/project/technical-overview#deployment-platform">Deployment Platform</a>
                            </li>
                            <li>
                                <a href="/about/project/technical-overview#security">Security</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details open>
                        <summary>Use Cases</summary>
                        <ul>
                            <li>
                                <a href="/about/project/use-cases#smart-cities">Smart Cities</a>
                            </li>
                            <li>
                                <a href="/about/project/use-cases#industrial-iot">Industrial IoT</a>
                            </li>
                            <li>
                                <a href="/about/project/use-cases#healthcare-iot">Healthcare IoT</a>
                            </li>
                            <li>
                                <a href="/about/project/use-cases#precision-agriculture">Precision Agriculture</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                <a href="/about/project/call-to-action">Call to Action</a>
                </li>
            </ul>
        </div>
    );
}
