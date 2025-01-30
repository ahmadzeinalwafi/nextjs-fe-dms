"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("dms-token="));
        const userId = document.cookie
            .split("; ")
            .find((row) => row.startsWith("dms-user-id="));
        setIsLogin(!!(token && userId));
    }, []);

    return (
        <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-40 shadow-md">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Node Sphere</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about/developer">About Developer</a></li>
                    <li><a href="/about/project/introduction">White Paper Project</a></li>
                    <li><a href="/documentation/about-platform">User Documentation</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    {isLogin ? (
                        <li>
                            <button
                                className="btn btn-error btn-sm mt-[2px]"
                                onClick={() => {
                                    document.cookie =
                                        "dms-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                    document.cookie =
                                        "dms-user-id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                    window.location.href = "/";
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li>
                            <details>
                                <summary>Account</summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    <li><a href="/account/login">Login</a></li>
                                    <li><a href="/account/signup">Sign Up</a></li>
                                </ul>
                            </details>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
