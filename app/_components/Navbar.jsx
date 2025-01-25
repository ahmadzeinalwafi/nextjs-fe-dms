export default function Navbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Node Sphere</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about/developer">About Developer</a></li>
                    <li><a href="/about/project">White Paper Project</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li>
                        <details>
                            <summary>Account</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li><a href="/account/login">Login</a></li>
                                <li><a href="/account/signup">Sign Up</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}