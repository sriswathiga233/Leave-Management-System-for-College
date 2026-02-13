export const mockDb = {
    users: [
        {
            id: "u1",
            name: "Admin User",
            email: "admin@college.edu",
            password: "admin",
            role: "admin",
            dept: "Administration",
        },
        {
            id: "u2",
            name: "Faculty One",
            email: "faculty@college.edu",
            password: "faculty",
            role: "faculty",
            dept: "Computer Science",
        },
        {
            id: "u3",
            name: "Student One",
            email: "student@college.edu",
            password: "student",
            role: "student",
            dept: "Computer Science",
            regNo: "REG001",
            leaveBalance: 20,
        },
    ],
    leaves: [
        {
            id: "l1",
            studentId: "u3",
            studentName: "Student One",
            type: "Sick Leave",
            fromDate: "2023-10-10",
            toDate: "2023-10-12",
            days: 3,
            reason: "High fever",
            status: "Approved",
            remarks: "Get well soon",
            appliedDate: "2023-10-09",
            assignedFacultyId: "u2"
        },
        {
            id: "l2",
            studentId: "u3",
            studentName: "Student One",
            type: "Casual Leave",
            fromDate: "2023-11-05",
            toDate: "2023-11-06",
            days: 2,
            reason: "Personal work",
            status: "Pending",
            remarks: "",
            appliedDate: "2023-11-01",
            assignedFacultyId: null
        }
    ],
};

const USERS_KEY = "slms_users";
const LEAVES_KEY = "slms_leaves";

export const initializeDb = () => {
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify(mockDb.users));
    }
    if (!localStorage.getItem(LEAVES_KEY)) {
        localStorage.setItem(LEAVES_KEY, JSON.stringify(mockDb.leaves));
    }
};

export const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

export const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const deleteUser = (userId) => {
    const users = getUsers();
    const updatedUsers = users.filter(u => u.id !== userId);
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
}

export const getLeaves = () => {
    const leaves = localStorage.getItem(LEAVES_KEY);
    return leaves ? JSON.parse(leaves) : [];
};

export const saveLeave = (leave) => {
    const leaves = getLeaves();
    leaves.push(leave);
    localStorage.setItem(LEAVES_KEY, JSON.stringify(leaves));
};

export const updateLeaveStatus = (leaveId, status, remarks = "") => {
    const leaves = getLeaves();
    const updatedLeaves = leaves.map((l) => {
        if (l.id === leaveId) {
            if (status === "Approved") {
                // Deduct leave balance
                const users = getUsers();
                const studentIndex = users.findIndex(u => u.id === l.studentId);
                if (studentIndex !== -1) {
                    users[studentIndex].leaveBalance -= l.days;
                    localStorage.setItem(USERS_KEY, JSON.stringify(users));
                }
            }
            return { ...l, status, remarks };
        }
        return l;
    });
    localStorage.setItem(LEAVES_KEY, JSON.stringify(updatedLeaves));
};

export const assignFaculty = (leaveId, facultyId) => {
    const leaves = getLeaves();
    const updatedLeaves = leaves.map((l) => {
        if (l.id === leaveId) {
            return { ...l, assignedFacultyId: facultyId };
        }
        return l;
    });
    localStorage.setItem(LEAVES_KEY, JSON.stringify(updatedLeaves));
};
