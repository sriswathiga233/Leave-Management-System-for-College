import { useEffect, useState } from "react";
import { getLeaves, getUsers } from "../../utils/mockDb";
import { motion } from "framer-motion";
import { Users, FileText, CheckCircle, XCircle } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className={`p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-l-4 ${color}`}
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
                <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{value}</p>
            </div>
            <div className={`p-3 rounded-full bg-opacity-10 ${color.replace("border-", "bg-").replace("-500", "-100")}`}>
                <Icon className={`w-8 h-8 ${color.replace("border-", "text-")}`} />
            </div>
        </div>
    </motion.div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStudents: 0,
        totalFaculty: 0,
        totalLeaves: 0,
        approved: 0,
        pending: 0,
    });

    useEffect(() => {
        const users = getUsers();
        const leaves = getLeaves();
        setStats({
            totalUsers: users.length,
            totalStudents: users.filter(u => u.role === 'student').length,
            totalFaculty: users.filter(u => u.role === 'faculty').length,
            totalLeaves: leaves.length,
            approved: leaves.filter(l => l.status === 'Approved').length,
            pending: leaves.filter(l => l.status === 'Pending').length,
        });
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    color="border-purple-500"
                />
                <StatCard
                    title="Total Leaves"
                    value={stats.totalLeaves}
                    icon={FileText}
                    color="border-blue-500"
                />
                <StatCard
                    title="Pending Requests"
                    value={stats.pending}
                    icon={CheckCircle}
                    color="border-yellow-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Distribution</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Students</span>
                            <span className="font-bold text-gray-900 dark:text-white">{stats.totalStudents}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stats.totalStudents / stats.totalUsers) * 100}%` }}></div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Faculty</span>
                            <span className="font-bold text-gray-900 dark:text-white">{stats.totalFaculty}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(stats.totalFaculty / stats.totalUsers) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
