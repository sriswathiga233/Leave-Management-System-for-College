import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getLeaves } from "../../utils/mockDb";
import { Card, Input } from "../../components/common/UI";
import { formatDate } from "../../utils/dateUtils";

const StatusBadge = ({ status }) => {
    const styles = {
        Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        Approved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        Rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || styles.Pending}`}>
            {status}
        </span>
    );
};

const History = () => {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        if (user) {
            const allLeaves = getLeaves();
            const myLeaves = allLeaves.filter((l) => l.studentId === user.id).reverse(); // Newest first
            setLeaves(myLeaves);
        }
    }, [user]);

    const filteredLeaves = filter === "All" ? leaves : leaves.filter((l) => l.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leave History</h1>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            <Card className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applied On</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dates</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Leave Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reason</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredLeaves.length > 0 ? (
                                filteredLeaves.map((leave) => (
                                    <tr key={leave.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                                            {formatDate(leave.appliedDate)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span>{formatDate(leave.fromDate)} - {formatDate(leave.toDate)}</span>
                                                <span className="text-xs text-gray-500">({leave.days} days)</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {leave.type}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate" title={leave.reason}>
                                            {leave.reason}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={leave.status} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                            {leave.remarks || "-"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No leave records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default History;
