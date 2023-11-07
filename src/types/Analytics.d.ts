type AnalyticsData = {
    users: {
        total: number;
        active: number;
        percentage: number;
    };
    storage: {
        total: number;
        used: number;
        alloted: number;
        percentage: number;
    };
    links: {
        active: number;
        expired: number;
        total: number;
        percentage: number;
    };
};
