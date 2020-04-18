export function formatShortDate(value: firebase.firestore.Timestamp) {
    const date = new Date(0);
    date.setUTCSeconds(value.seconds);
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}