import React from 'react'

import { Link } from 'react-router-dom'

function Sidebar() {

    return (

        <div className="
            w-[250px]
            min-h-screen
            bg-gray-900
            text-white
            p-6
        ">

            <h1 className="text-3xl font-bold mb-10">

                Breathe ESG

            </h1>

            <div className="flex flex-col gap-4">

                <Link
                    to="/"
                    className="
                        bg-gray-800
                        hover:bg-gray-700
                        p-3
                        rounded-lg
                    "
                >

                    Dashboard

                </Link>

                <Link
                    to="/upload"
                    className="
                        bg-gray-800
                        hover:bg-gray-700
                        p-3
                        rounded-lg
                    "
                >

                    Upload Data

                </Link>

            </div>

        </div>
    )
}

export default Sidebar