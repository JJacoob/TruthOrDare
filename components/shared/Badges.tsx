
export enum Orientation {
    ROW = 'flex-row',
    COL = 'flex-col'
}

interface BadgesProps {
    values: string[];
    orientation: Orientation;
}

export const Badges = ({ values, orientation }: BadgesProps) => {
    return (
        <div className={`flex gap-2 ${orientation}`}>
            {
                values.length && values.map((value, index) => (
                    <div key={index} className="badge badge-primary rounded-full uppercase">{value}</div>
                ))
            }
        </div>
    )
}