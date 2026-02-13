import { format, differenceInDays, parseISO, isAfter, isBefore } from "date-fns";

export const formatDate = (dateString) => {
    if (!dateString) return "";
    return format(parseISO(dateString), "MMM dd, yyyy");
};

export const calculateDays = (fromDate, toDate) => {
    if (!fromDate || !toDate) return 0;
    const start = parseISO(fromDate);
    const end = parseISO(toDate);

    // Include start and end date
    const days = differenceInDays(end, start) + 1;
    return days > 0 ? days : 0;
};
