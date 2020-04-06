export function formatShortDate(value: string | number) {
    return new Date(value).toLocaleDateString("en-NZ", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}