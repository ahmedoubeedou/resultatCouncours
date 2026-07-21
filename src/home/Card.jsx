export default function Card({name , moyenn , decision , index})
{
    return (
        <div className="flex justify-between items-center m-2 text-[12px]">
            <span>{index}</span>
            <p> {name} </p>
            <p> {decision} </p>
            <p> {moyenn} </p>
            </div>

    )
}