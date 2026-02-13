import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getLeaves } from "../../utils/mockDb";
import { Card } from "../../components/common/UI";
import { motion } from "framer-motion";
import { FileText, CheckCircle, XCircle, Clock, Calendar } from "lucide-react";

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

const StudentDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        balance: 0,
    });

    useEffect(() => {
        if (user) {
            const allLeaves = getLeaves();
            const myLeaves = allLeaves.filter((l) => l.studentId === user.id);

            setStats({
                total: myLeaves.length,
                pending: myLeaves.filter((l) => l.status === "Pending").length,
                approved: myLeaves.filter((l) => l.status === "Approved").length,
                rejected: myLeaves.filter((l) => l.status === "Rejected").length,
                balance: user.leaveBalance,
            });
        }
    }, [user]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Leave Balance"
                    value={stats.balance}
                    icon={Calendar}
                    color="border-blue-500"
                />
                <StatCard
                    title="Pending Request"
                    value={stats.pending}
                    icon={Clock}
                    color="border-yellow-500"
                />
                <StatCard
                    title="Approved Leaves"
                    value={stats.approved}
                    icon={CheckCircle}
                    color="border-green-500"
                />
                <StatCard
                    title="Rejected Leaves"
                    value={stats.rejected}
                    icon={XCircle}
                    color="border-red-500"
                />
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recent Activity</h2>
                {/* We can add a small table or list here later if needed */}
                <p className="text-gray-500 dark:text-gray-400">Head over to 'My History' to view all your leave applications.</p>
            </div>
        </div>
    );
};

export default StudentDashboard;
