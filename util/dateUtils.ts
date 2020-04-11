export function formatShortDate(value: string | number) {
    return new Date(value).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}