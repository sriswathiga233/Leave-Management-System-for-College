import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { saveLeave } from "../../utils/mockDb";
import { calculateDays } from "../../utils/dateUtils";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button } from "../../components/common/UI";

const ApplyLeave = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: "Sick Leave",
        fromDate: "",
        toDate: "",
        reason: "",
    });
    const [days, setDays] = useState(0);

    // Recalculate days whenever dates change
    useEffect(() => {
        if (formData.fromDate && formData.toDate) {
            const d = calculateDays(formData.fromDate, formData.toDate);
            setDays(d);
        } else {
            setDays(0);
        }
    }, [formData.fromDate, formData.toDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (days <= 0) {
            toast.error("Invalid date range");
            return;
        }

        if (days > user.leaveBalance) {
            toast.error(`Insufficient leave balance. You have ${user.leaveBalance} days left.`);
            return;
        }

        const newLeave = {
            id: Date.now().toString(),
            studentId: user.id,
            studentName: user.name,
            ...formData,
            days,
            status: "Pending",
            remarks: "",
            appliedDate: new Date().toISOString().split('T')[0],
        };

        const confirmMsg = `Apply for ${days} days of leave?`;
        if (window.confirm(confirmMsg)) {
            saveLeave(newLeave);
            toast.success("Leave application submitted successfully!");
            navigate("/student/history");
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Apply for Leave</h1>
            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Leave Type
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option>Sick Leave</option>
                            <option>Casual Leave</option>
                            <option>Academic Leave</option>
                            <option>Personal Emergency</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="date"
                            label="From Date"
                            name="fromDate"
                            required
                            value={formData.fromDate}
                            onChange={handleChange}
                        />
                        <Input
                            type="date"
                            label="To Date"
                            name="toDate"
                            required
                            value={formData.toDate}
                            onChange={handleChange}
                            min={formData.fromDate}
                        />
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            Total Duration: <span className="font-bold">{days} Days</span>
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Reason
                        </label>
                        <textarea
                            name="reason"
                            required
                            rows="4"
                            value={formData.reason}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Please provide a detailed reason..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Submit Application
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ApplyLeave;
