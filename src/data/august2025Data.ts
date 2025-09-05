type DayRecord = {
    date: string;      // YYYY-MM-DD
    value: number;     // Lượng CO2 (g)
};

type DayWithStatus = DayRecord & {
    status: "Đạt" | "Không đạt";
};

// Dữ liệu thô (chỉ date + value)
export const august2025Raw: DayRecord[] = [
    { date: "2025-08-01", value: 40 },
    { date: "2025-08-02", value: 65 },
    { date: "2025-08-03", value: 52 },
    { date: "2025-08-04", value: 30 },
    { date: "2025-08-05", value: 75 },
    { date: "2025-08-06", value: 20 },
    { date: "2025-08-07", value: 80 },
    { date: "2025-08-08", value: 55 },
    { date: "2025-08-09", value: 48 },
    { date: "2025-08-10", value: 60 },
    { date: "2025-08-11", value: 32 },
    { date: "2025-08-12", value: 50 },
    { date: "2025-08-13", value: 85 },
    { date: "2025-08-14", value: 22 },
    { date: "2025-08-15", value: 75 },
    { date: "2025-08-16", value: 60 },
    { date: "2025-08-17", value: 28 },
    { date: "2025-08-18", value: 90 },
    { date: "2025-08-19", value: 68 },
    { date: "2025-08-20", value: 40 },
    { date: "2025-08-21", value: 55 },
    { date: "2025-08-22", value: 47 },
    { date: "2025-08-23", value: 62 },
    { date: "2025-08-24", value: 30 },
    { date: "2025-08-25", value: 70 },
    { date: "2025-08-26", value: 20 },
    { date: "2025-08-27", value: 58 },
    { date: "2025-08-28", value: 64 },
    { date: "2025-08-29", value: 42 },
    { date: "2025-08-30", value: 50 },
];

// Hàm thêm status dựa trên goal
export const getAugust2025Data = (goal: number): DayWithStatus[] => {
    return august2025Raw.map((day) => ({
        ...day,
        status: day.value >= goal ? "Đạt" : "Không đạt",
    }));
};
