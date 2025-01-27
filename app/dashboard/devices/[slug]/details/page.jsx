"use client";
import { use } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import SideMenu from "@/app/_components/SideMenu";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Page({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [query, setQuery] = useState({ d: 0, h: 1, m: 0 });
    const [selectedField, setSelectedField] = useState("");

    const calculateStandardDeviation = (data) => {
        if (!data || data.length === 0) return 0;
        const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
        const squaredDifferences = data.map(val => Math.pow(val - mean, 2));
        const averageSquaredDifference = squaredDifferences.reduce((acc, val) => acc + val, 0) / data.length;
        return Math.sqrt(averageSquaredDifference).toFixed(2);
    };

    const calculateKurtosis = (data) => {
        if (!data || data.length === 0) return 0;
        const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
        const n = data.length;
        const fourthMoment = data.map(val => Math.pow(val - mean, 4)).reduce((acc, val) => acc + val, 0) / n;
        const secondMomentSquared = Math.pow(data.map(val => Math.pow(val - mean, 2)).reduce((acc, val) => acc + val, 0) / n, 2);
        return (fourthMoment / secondMomentSquared - 3).toFixed(2); // Excess Kurtosis
    };

    const calculateSkewness = (data) => {
        if (!data || data.length === 0) return 0;
        const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
        const n = data.length;
        const thirdMoment = data.map(val => Math.pow(val - mean, 3)).reduce((acc, val) => acc + val, 0) / n;
        const secondMoment = Math.pow(data.map(val => Math.pow(val - mean, 2)).reduce((acc, val) => acc + val, 0) / n, 1.5);
        return (thirdMoment / secondMoment).toFixed(2); // Skewness
    };

    const calculateVarianceToMeanRatio = (data) => {
        if (!data || data.length === 0) return 0;
        const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
        const variance = data.map(val => Math.pow(val - mean, 2)).reduce((acc, val) => acc + val, 0) / data.length;
        return (variance / mean).toFixed(2);
    };

    const calculateIQR1 = (data) => {
        if (!data || data.length === 0) return 0;
        const sortedData = data.sort((a, b) => a - b);
        const q1 = calculatePercentile(sortedData, 25); // 1st quartile (25th percentile)
        return q1.toFixed(2);
    };

    const calculateIQR3 = (data) => {
        if (!data || data.length === 0) return 0;
        const sortedData = data.sort((a, b) => a - b);
        const q3 = calculatePercentile(sortedData, 75); // 3rd quartile (75th percentile)
        return q3.toFixed(2);
    };

    const calculatePercentile = (data, percentile) => {
        const index = (percentile / 100) * (data.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);
        if (lower === upper) {
            return data[lower];
        }
        return data[lower] + (index - lower) * (data[upper] - data[lower]);
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/devices/${params.slug}/records`,
                { params: query }
            );
            setData(response.data.data);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [params.slug]); // Fetch data when slug changes

    const handleUpdate = () => {
        fetchData();
    };

    if (loading) {
        return (
            <div className="flex h-screen bg-gray-900">
                <SideMenu />
                <div className="flex w-52 flex-col gap-4">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen bg-gray-900">
                <SideMenu />
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    // Group data by field
    const groupedData = data?.reduce((acc, entry) => {
        if (!acc[entry.field]) {
            acc[entry.field] = [];
        }
        acc[entry.field].push(entry);
        return acc;
    }, {});

    // Extract labels (time) for the selected field
    const labels = selectedField
        ? groupedData?.[selectedField]?.map((entry) => new Date(entry.time).toLocaleTimeString())
        : [];

    // Prepare dataset for the selected field
    const chartData = selectedField
        ? {
            labels,
            datasets: [
                {
                    label: selectedField.charAt(0).toUpperCase() + selectedField.slice(1),
                    data: groupedData[selectedField].map((entry) => entry.value),
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    tension: 0.4, // Smooth lines
                },
            ],
        }
        : null;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Data for ${selectedField || "Select a field"}`,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Value",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="flex h-screen bg-gray-900 overflow-hidden">
            <SideMenu />
            <div className="flex-1 p-4 text-white flex flex-col space-y-4">
                {/* Query Inputs */}
                <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-center space-x-4">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Days (d)</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered"
                            value={query.d}
                            onChange={(e) => setQuery({ ...query, d: e.target.value })}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Hours (h)</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered"
                            value={query.h}
                            onChange={(e) => setQuery({ ...query, h: e.target.value })}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-white">Minutes (m)</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered"
                            value={query.m}
                            onChange={(e) => setQuery({ ...query, m: e.target.value })}
                        />
                    </div>
                    <button className="btn btn-primary mt-8" onClick={handleUpdate}>
                        Update
                    </button>
                </div>


                {/* Chart and Table with Data Summary */}
                <div className="flex flex-1 space-x-4 overflow-hidden">
                    {/* Left Section: Chart */}
                    <div className="w-1/2 flex flex-col">
                        {/* Chart */}
                        <div className="h-[50%] bg-gray-800 rounded-lg p-4">
                            {chartData ? (
                                <Line data={chartData} options={options} />
                            ) : (
                                <div>Select a field to view the chart</div>
                            )}
                        </div>

                        {/* Additional Element Below the Chart */}
                        {/* Additional Element Below the Chart */}
                        <div className="h-[40%] bg-gray-800 rounded-lg p-4 mt-4">
                            <h3 className="text-lg font-semibold">Data Summary</h3>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold">Min Value</span>
                                    <span className="text-2xl">
                                        {Math.min(...(groupedData?.[selectedField]?.map(entry => entry.value) || [0]))}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold">Max Value</span>
                                    <span className="text-2xl">
                                        {Math.max(...(groupedData?.[selectedField]?.map(entry => entry.value) || [0]))}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold">Average</span>
                                    <span className="text-2xl">
                                        {(groupedData?.[selectedField]?.reduce((acc, entry) => acc + entry.value, 0) /
                                            (groupedData?.[selectedField]?.length || 1)).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold">Standard Deviation</span>
                                    <span className="text-2xl">
                                        {calculateStandardDeviation(groupedData?.[selectedField]?.map(entry => entry.value))}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold">IQR 1/4</span>
                                    <span className="text-2xl">
                                        {calculateIQR1(groupedData?.[selectedField]?.map(entry => entry.value))}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold">IQR 3/4</span>
                                    <span className="text-2xl">
                                        {calculateIQR3(groupedData?.[selectedField]?.map(entry => entry.value))}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold">Kurtosis</span>
                                    <span className="text-2xl">
                                        {calculateKurtosis(groupedData?.[selectedField]?.map(entry => entry.value))}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold">Skewness</span>
                                    <span className="text-2xl">
                                        {calculateSkewness(groupedData?.[selectedField]?.map(entry => entry.value))}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold">Variance Mean Ratio</span>
                                    <span className="text-2xl">
                                        {calculateVarianceToMeanRatio(groupedData?.[selectedField]?.map(entry => entry.value))}
                                    </span>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Right Section: Table */}
                    <div className="w-1/2 h-[92%] overflow-y-scroll bg-gray-800 rounded-lg p-4">
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-white">Select Field</span>
                            </label>
                            <select
                                className="select select-bordered"
                                value={selectedField}
                                onChange={(e) => setSelectedField(e.target.value)}
                            >
                                <option value="">Select a field</option>
                                {groupedData &&
                                    Object.keys(groupedData).map((field, index) => (
                                        <option key={index} value={field}>
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <table className="table table-auto text-left w-full">
                            <thead>
                                <tr>
                                    <th>Device</th>
                                    <th>Field</th>
                                    <th>Time</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map((entry, index) => (
                                        <tr key={index} className="hover:bg-gray-700">
                                            <td>{entry.device}</td>
                                            <td>{entry.field}</td>
                                            <td>{new Date(entry.time).toLocaleString()}</td>
                                            <td>{entry.value}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
