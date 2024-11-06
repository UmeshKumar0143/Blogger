interface propdata {
    text: string | null
}

export  default function Button({text}:propdata){

    return <button className="text-gray-300 hover:text-white  bg-black rounded-full px-7 py-3 font-bold sm:text-xl  ">{text}</button>
}