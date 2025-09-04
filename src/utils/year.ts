export function renderYearLabel(
    year: number,
    positive = "CE",
    negative = "BCE",
) {
    return year < 0 ? `${Math.abs(year)} ${negative}` : `${year} ${positive}`;
}
