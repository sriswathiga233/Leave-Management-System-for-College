import { useEffect, useState } from "react";
import { getLeaves, getUsers, assignFaculty } from "../../utils/mockDb";
import { Card } from "../../components/common/UI";
import { formatDate } from "../../utils/dateUtils";

const AllLeaves = () => {
    const [leaves, setLeaves] = useState([]);
    const [facultyList, setFacultyList] = useState([]);

    useEffect(() => {
        setLeaves(getLeaves().reverse());
        setFacultyList(getUsers().filter(u => u.role === 'faculty'));
    }, []);

    const handleAssign = (leaveId, facultyId) => {
        assignFaculty(leaveId, facultyId);
        // Update local state
        setLeaves(prev => prev.map(l => {
            if (l.id === leaveId) {
                return { ...l, assignedFacultyId: facultyId };
            }
            return l;
        }));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Leave Requests</h1>

            <Card className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Student</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Dates</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Assigned Faculty</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {leaves.map((leave) => (
                                <tr key={leave.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                                        {leave.studentName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                        {leave.type}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                        {formatDate(leave.fromDate)} - {formatDate(leave.toDate)}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${leave.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                leave.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <select
                                            value={leave.assignedFacultyId || ""}
                                            onChange={(e) => handleAssign(leave.id, e.target.value)}
                                            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm shadow-sm outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-white"                                        >
                                            <option value="">-- Assign --</option>
                                            {facultyList.map(f => (
                                                <option key={f.id} value={f.id}>{f.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AllLeaves;
