import { useEffect, useState } from "react";
import API from "../api/api";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const token = localStorage.getItem("token");

    const getTasks = async () => {

        const res = await API.get("/tasks", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setTasks(res.data);
    };

    const addTask = async () => {

        if (!title) {
            alert("Enter task");
            return;
        }
        await API.post("/tasks",
            { title },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setTitle("");
        getTasks();
    };

    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        getTasks();
    };

    const toggleTask = async (id) => {
        await API.put(`/tasks/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });

        getTasks();
    };


    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-white-500 to-indigo-600">

            {/* Top Navbar */}
            <div className="flex justify-between items-center px-10 py-6 text-white">
                <h1 className="text-3xl font-bold">Task Manager</h1>

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
                >
                    Logout
                </button>
            </div>

            {/* Dashboard Card */}
            <div className="flex justify-center items-start">

                <div className="w-full max-w-xl bg-white shadow-2xl rounded-xl p-8">

                    <h2 className="text-xl font-semibold mb-4">
                        Task Dashboard
                    </h2>

                    {/* Add Task */}
                    <div className="flex gap-3 mb-6">

                        <input
                            className="border rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Add new task..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <button
                            onClick={addTask}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg font-semibold transition"
                        >
                            Add
                        </button>

                    </div>

                    {/* Task List */}
                    <ul className="space-y-3">

                        {tasks.map(task => (

                            <li
                                key={task._id}
                                className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50"
                            >

                                <span
                                    onClick={() => toggleTask(task._id)}
                                    className={`cursor-pointer ${task.completed ? "line-through text-gray-400" : ""
                                        }`}
                                >
                                    {task.title}
                                </span>

                                <button
                                    onClick={() => deleteTask(task._id)}
                                    className="text-red-500 hover:text-red-700 font-semibold"
                                >
                                    Delete
                                </button>

                            </li>

                        ))}

                    </ul>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;