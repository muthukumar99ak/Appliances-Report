
const DEVICE_INFO_COLUMNS = [
    {
        title: 'Device Serial',
        key: 'serialNo'
    },
    {
        title: 'Location',
        key: 'theatreName'
    },
    {
        title: 'City',
        key: 'city',
        onRenderer: (deviceInfo) => {
            const { city = "", state = "", country = "" } = deviceInfo?.location || {};
            const locationString = [city, state, country].filter(loc => loc).join(", ");
            return locationString;
        }
    },
    {
        title: 'ISP Payment Responsibility',
        key: 'ispPaymentResponsibility'
    },
    {
        title: 'Bandwidth',
        key: 'bandwidth'
    },
    {
        title: 'Average Bandwidth',
        key: 'avgBandwidth'
    },
    {
        title: 'Plan Start Date',
        key: 'planStartDate'
    },
    {
        title: 'Billing Cycle',
        key: 'billingCycle'
    },
    {
        title: 'Download Status',
        key: 'downloadStatus'
    },
    {
        title: 'OS Version',
        key: 'osVersion'
    },
    {
        title: 'Storage Available',
        key: 'storage'
    }
]

// Export functions or values 
export {
    DEVICE_INFO_COLUMNS
}