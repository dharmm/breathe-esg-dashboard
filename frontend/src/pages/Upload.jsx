import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

function Upload() {

    const [file, setFile] = useState(null)

    const [message, setMessage] = useState("")

    const [loading, setLoading] = useState(false)

    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    const handleUpload = async () => {

        if (!file) {

            setMessage("Please select file")

            setSuccess(false)

            return
        }

        const formData = new FormData()

        formData.append('file', file)

        try {

            setLoading(true)

            await axios.post(

                'http://127.0.0.1:8000/api/upload/sap/',

                formData,

                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            setLoading(false)

            setSuccess(true)

            setMessage("CSV Uploaded Successfully")

            setTimeout(() => {

                navigate('/')

            }, 1500)

        }

        catch (error) {

            console.log(error)

            setLoading(false)

            setSuccess(false)

            setMessage("Upload Failed")
        }
    }

    return (

        <div className="flex">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN CONTENT */}

            <div className="
                flex-1
                min-h-screen
                bg-gray-100
                flex
                justify-center
                items-center
            ">

                <div className="
                    bg-white
                    p-10
                    rounded-xl
                    shadow-lg
                    w-[500px]
                ">

                    <h1 className="text-3xl font-bold mb-6">
                        Upload ESG Data
                    </h1>

                    {/* MESSAGE */}

                    {
                        message && (

                            <div className={`
                                p-3
                                rounded-lg
                                mb-4

                                ${success
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }
                            `}>

                                {message}

                            </div>
                        )
                    }

                    {/* FILE INPUT */}

                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) =>
                            setFile(e.target.files[0])
                        }
                        className="
                            border
                            p-3
                            rounded-lg
                            w-full
                            mb-6
                            bg-gray-100
                        "
                    />

                    {/* BUTTON */}

                    <button
                        onClick={handleUpload}
                        className="
                            bg-blue-600
                            text-white
                            px-6
                            py-3
                            rounded-lg
                            w-full
                            hover:bg-blue-700
                            transition
                        "
                    >

                        {
                            loading
                                ? "Uploading..."
                                : "Upload CSV"
                        }

                    </button>

                </div>

            </div>

        </div>
    )
}

export default Upload