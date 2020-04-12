export function formatShortDate(value: firebase.firestore.Timestamp) {
    return new Date(value.seconds).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}