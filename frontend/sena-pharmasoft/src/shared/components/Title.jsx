

export default function Title({title}){


    return(
        <div
            className="grid grid-cols-1">
            <h1 className="w-full text-center text-brand-hover font-bold text-3xl py-4">
                {title}
            </h1>
        </div>
    )
}