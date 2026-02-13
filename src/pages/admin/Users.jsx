import { useEffect, useState } from "react";
import { getUsers, saveUser, deleteUser } from "../../utils/mockDb";
import { Card, Button, Input } from "../../components/common/UI";
import Modal from "../../components/common/Modal";
import { Trash2, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "password123", // Default password
        role: "student",
        dept: "",
        regNo: "",
    });

    const refreshUsers = () => {
        setUsers(getUsers());
    };

    useEffect(() => {
        refreshUsers();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteUser(id);
            refreshUsers();
            toast.success("User deleted successfully");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            id: Date.now().toString(),
            ...formData,
            leaveBalance: formData.role === 'student' ? 20 : 0
        };
        saveUser(newUser);
        toast.success("User added successfully");
        setIsModalOpen(false);
        refreshUsers();
        setFormData({
            name: "",
            email: "",
            password: "password123",
            role: "student",
            dept: "",
            regNo: "",
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
                <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add User
                </Button>
            </div>

            <Card className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Name</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Email</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Role</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Dept</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'faculty' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.dept}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Name" name="name" required value={formData.name} onChange={handleChange} />
                    <Input label="Email" type="email" name="email" required value={formData.email} onChange={handleChange} />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                <option value="student">Student</option>
                                <option value="faculty">Faculty</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <Input label="Department" name="dept" required value={formData.dept} onChange={handleChange} />
                    </div>
                    {formData.role === 'student' && (
                        <Input label="Register Number" name="regNo" required value={formData.regNo} onChange={handleChange} />
                    )}
                    <Button type="submit" className="w-full mt-4">Create User</Button>
                </form>
            </Modal>
        </div>
    );
};

export default UsersPage;
