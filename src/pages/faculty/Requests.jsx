import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getLeaves, updateLeaveStatus } from "../../utils/mockDb";
import { Card, Button } from "../../components/common/UI";
import Modal from "../../components/common/Modal";
import { formatDate } from "../../utils/dateUtils";
import { toast } from "react-hot-toast";
import { Check, X } from "lucide-react";

const Requests = () => {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [filter, setFilter] = useState("Pending");
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [actionType, setActionType] = useState(null);
    const [remarks, setRemarks] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const refreshLeaves = () => {
        const allLeaves = getLeaves();
        // Faculty sees only assigned leaves
        const myLeaves = allLeaves.filter(l => l.assignedFacultyId === user.id).reverse();
        setLeaves(myLeaves);
    };

    useEffect(() => {
        if (user) {
            refreshLeaves();
        }
    }, [user]);

    const handleAction = (leave, type) => {
        setSelectedLeave(leave);
        setActionType(type);
        setRemarks("");
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        if (!selectedLeave) return;

        const status = actionType === 'approve' ? 'Approved' : 'Rejected';
        updateLeaveStatus(selectedLeave.id, status, remarks);

        toast.success(`Leave request ${status.toLowerCase()} successfully`);
        setIsModalOpen(false);
        refreshLeaves();
    };

    const filteredLeaves = leaves.filter(l => filter === 'All' ? true : l.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assigned Requests</h1>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Pending">Pending Assignment</option>
                    <option value="Approved">Approved History</option>
                    <option value="Rejected">Rejected History</option>
                    <option value="All">All Records</option>
                </select>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {filteredLeaves.length > 0 ? (
                    filteredLeaves.map(leave => (
                        <Card key={leave.id} className="flex flex-col md:flex-row justify-between gap-4 border-l-4 border-blue-500">
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{leave.studentName}</h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(leave.appliedDate)}</span>
                                </div>
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    <p><span className="font-semibold">Type:</span> {leave.type}</p>
                                    <p><span className="font-semibold">Duration:</span> {formatDate(leave.fromDate)} to {formatDate(leave.toDate)} ({leave.days} days)</p>
                                    <p className="mt-1"><span className="font-semibold">Reason:</span> {leave.reason}</p>
                                </div>
                            </div>

                            {leave.status === 'Pending' && (
                                <div className="flex items-center gap-3 md:border-l md:pl-4 border-gray-200 dark:border-gray-700">
                                    <Button
                                        onClick={() => handleAction(leave, 'approve')}
                                        className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                                    >
                                        <Check className="w-4 h-4" /> Approve
                                    </Button>
                                    <Button
                                        onClick={() => handleAction(leave, 'reject')}
                                        variant="danger"
                                        className="flex items-center gap-2"
                                    >
                                        <X className="w-4 h-4" /> Reject
                                    </Button>
                                </div>
                            )}
                            {leave.status !== 'Pending' && (
                                <div className="flex items-center md:border-l md:pl-4 border-gray-200 dark:border-gray-700">
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${leave.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {leave.status}
                                    </span>
                                </div>
                            )}
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">No assigned requests found.</div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={actionType === 'approve' ? "Approve Leave Request" : "Reject Leave Request"}
            >
                <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        Are you sure you want to {actionType} this request?
                    </p>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Remarks (Optional)
                        </label>
                        <textarea
                            rows="3"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Add remarks..."
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button
                            className={actionType === 'reject' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
                            onClick={confirmAction}
                        >
                            Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Requests;
