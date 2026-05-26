import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async () => {

        try {

            const response = await axios.post(

                'http://127.0.0.1:8000/api/token/',

                {
                    username,
                    password
                }
            )

            localStorage.setItem(
                'token',
                response.data.access
            )

            navigate('/')

        }

        catch {

            alert('Invalid Credentials')
        }
    }

    return (

        <div className="
            min-h-screen
            flex
            justify-center
            items-center
            bg-gray-100
        ">

            <div className="
                bg-white
                p-10
                rounded-xl
                shadow-lg
                w-[400px]
            ">

                <h1 className="
                    text-3xl
                    font-bold
                    mb-6
                ">

                    Login

                </h1>

                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    className="
                        border
                        p-3
                        rounded-lg
                        w-full
                        mb-4
                    "
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="
                        border
                        p-3
                        rounded-lg
                        w-full
                        mb-6
                    "
                />

                <button
                    onClick={handleLogin}
                    className="
                        bg-blue-600
                        text-white
                        w-full
                        py-3
                        rounded-lg
                    "
                >

                    Login

                </button>

            </div>

        </div>
    )
}

export default Login