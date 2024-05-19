const DOWNLOAD_STATUS = {
    FAILED: "failed",
    SCHEDULED: "scheduled",
    CANCELLED: "cancelled",
    DOWNLOADING: "downloading",
    DOWNLOADED: "downloaded",
    STALLED: "stalled",
    ARCHIVED: "archived",
    UNARCHICING: "unarchiving"
}

Object.freeze(DOWNLOAD_STATUS);

export default DOWNLOAD_STATUS;