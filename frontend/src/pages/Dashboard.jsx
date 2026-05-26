import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'

function Dashboard() {

    const [dashboardData, setDashboardData] = useState({})
    const [records, setRecords] = useState([])
    const [allRecords, setAllRecords] = useState([])

    useEffect(() => {

        fetchDashboard()
        fetchRecords()

    }, [])

    // DASHBOARD API

    const fetchDashboard = async () => {

        const response = await axios.get(
            'http://127.0.0.1:8000/api/dashboard/'
        )

        setDashboardData(response.data)
    }

    // RECORDS API

    const fetchRecords = async () => {

        const response = await axios.get(
            'http://127.0.0.1:8000/api/records/'
        )

        setRecords(response.data)
        setAllRecords(response.data)
    }

    // APPROVE RECORD

    const approveRecord = async (id) => {

        await axios.post(
            `http://127.0.0.1:8000/api/approve/${id}/`
        )

        fetchDashboard()
        fetchRecords()
    }

    // FILTERS

    const filterAll = () => {

        setRecords(allRecords)
    }

    const filterPending = () => {

        const filtered = allRecords.filter(
            (record) => record.status === 'PENDING'
        )

        setRecords(filtered)
    }

    const filterApproved = () => {

        const filtered = allRecords.filter(
            (record) => record.status === 'APPROVED'
        )

        setRecords(filtered)
    }

    const filterFlagged = () => {

        const filtered = allRecords.filter(
            (record) => record.suspicious === true
        )

        setRecords(filtered)
    }

    return (

        <div className="flex">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN CONTENT */}

            <div className="flex-1 min-h-screen bg-gray-100 p-8">

                {/* HEADER */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold">
                            Breathe ESG Dashboard
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Carbon Emissions Review System
                        </p>

                    </div>

                </div>

                {/* FILTER BUTTONS */}

                <div className="flex gap-4 mb-8">

                    <button
                        onClick={filterAll}
                        className="bg-black text-white px-5 py-2 rounded-lg"
                    >
                        All
                    </button>

                    <button
                        onClick={filterPending}
                        className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
                    >
                        Pending
                    </button>

                    <button
                        onClick={filterApproved}
                        className="bg-green-500 text-white px-5 py-2 rounded-lg"
                    >
                        Approved
                    </button>

                    <button
                        onClick={filterFlagged}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg"
                    >
                        Flagged
                    </button>

                </div>

                {/* SUMMARY CARDS */}

                <div className="grid grid-cols-5 gap-5 mb-10">

                    <div className="bg-white rounded-xl p-5 shadow">

                        <h2 className="text-gray-500">
                            Total Rows
                        </h2>

                        <p className="text-4xl font-bold mt-2">
                            {dashboardData.total_rows}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl p-5 shadow">

                        <h2 className="text-gray-500">
                            Pending Review
                        </h2>

                        <p className="text-4xl font-bold mt-2">
                            {dashboardData.pending_review}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl p-5 shadow">

                        <h2 className="text-gray-500">
                            Flagged
                        </h2>

                        <p className="text-4xl font-bold mt-2 text-yellow-500">
                            {dashboardData.flagged}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl p-5 shadow">

                        <h2 className="text-gray-500">
                            Approved
                        </h2>

                        <p className="text-4xl font-bold mt-2 text-green-500">
                            {dashboardData.approved}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl p-5 shadow">

                        <h2 className="text-gray-500">
                            Approved KG CO₂e
                        </h2>

                        <p className="text-4xl font-bold mt-2">
                            {
                            Number(dashboardData.approved_kg_co2e).toLocaleString()
                            }

                        </p>

                    </div>

                </div>

                {/* TABLE */}

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-900 text-white">

                            <tr>

                                <th className="text-left p-4">
                                    Source
                                </th>

                                <th className="text-left p-4">
                                    Activity
                                </th>

                                <th className="text-left p-4">
                                    Quantity
                                </th>

                                <th className="text-left p-4">
                                    Scope
                                </th>

                                <th className="text-left p-4">
                                    CO₂e
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                                <th className="text-left p-4">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {records.map((record) => (

                                <tr
                                    key={record.id}
                                    className={`
                                        border-b hover:bg-gray-50 transition

                                        ${record.suspicious
                                            ? 'bg-red-100'
                                            : 'bg-white'
                                        }
                                    `}
                                >

                                    <td className="p-4">
                                        {record.source_type}
                                    </td>

                                    <td className="p-4">
                                        {record.activity}
                                    </td>

                                    <td className="p-4">
                                        {record.quantity} {record.unit}
                                    </td>

                                    <td className="p-4">
                                        {record.scope}
                                    </td>

                                    <td className="p-4">
                                        {Number(record.co2e).toFixed(2)}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`
                                                px-3 py-1 rounded-full text-white text-sm

                                                ${record.status === 'APPROVED'
                                                    ? 'bg-green-500'
                                                    : 'bg-yellow-500'
                                                }
                                            `}
                                        >

                                            {record.status}

                                        </span>

                                    </td>

                                    <td className="p-4">

                                        {record.status !== 'APPROVED' && (

                                            <button
                                                onClick={() =>
                                                    approveRecord(record.id)
                                                }
                                                className="
                                                    bg-blue-500
                                                    text-white
                                                    px-4
                                                    py-2
                                                    rounded-lg
                                                "
                                            >

                                                Approve

                                            </button>

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default Dashboard