export default function CardContainer({ titulo, children }) {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-2xl font-bold my-4 ml-2">{titulo}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mx-auto ">
                {children}
            </div>
        </div>
    );
}
