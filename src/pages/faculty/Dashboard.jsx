import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getLeaves } from "../../utils/mockDb";
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

const FacultyDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
    });

    useEffect(() => {
        if (user) {
            const allLeaves = getLeaves();
            const myLeaves = allLeaves.filter(l => l.assignedFacultyId === user.id);
            setStats({
                total: myLeaves.length,
                pending: myLeaves.filter((l) => l.status === "Pending").length,
                approved: myLeaves.filter((l) => l.status === "Approved").length,
                rejected: myLeaves.filter((l) => l.status === "Rejected").length,
            });
        }
    }, [user]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Faculty Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Assigned Requests"
                    value={stats.total}
                    icon={FileText}
                    color="border-blue-500"
                />
                <StatCard
                    title="Pending Actions"
                    value={stats.pending}
                    icon={Users}
                    color="border-yellow-500"
                />
                <StatCard
                    title="Approved"
                    value={stats.approved}
                    icon={CheckCircle}
                    color="border-green-500"
                />
                <StatCard
                    title="Rejected"
                    value={stats.rejected}
                    icon={XCircle}
                    color="border-red-500"
                />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Instructions</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    You can only see and manage leaves that have been explicitly assigned to you by the Admin.
                </p>
            </div>
        </div>
    );
};

export default FacultyDashboard;
