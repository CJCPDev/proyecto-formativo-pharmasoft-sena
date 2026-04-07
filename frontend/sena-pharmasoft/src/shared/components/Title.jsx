

export default function Title({title}){


    return(
        <div
            className="grid grid-cols-1">
            <h1 className="w-full text-center text-brand-hover font-black text-3xl py-1 mb-3 border-b">
                {title}
            </h1>
        </div>
    )
}