export function daysOfYear(year: number) : number {
    let start = new Date(year, 0, 0)
    let end = new Date(year, 11, 31)
    let diff = end.getTime() - start.getTime()
    let oneday = 1000 * 60 * 60 * 24
    return diff / oneday
}

export const SquareSize = 20
export const SquareBorderSize = SquareSize / 5