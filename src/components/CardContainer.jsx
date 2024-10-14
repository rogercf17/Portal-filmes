export default function CardContainer({ titulo, children }) {
    return (
        <div className="flex flex-col items-center justify-center w-full mx-auto">
            <h1 className="text-2xl font-bold my-4 ml-2 self-start">{titulo}</h1>
            <div className="flex justify-center items-center ">
                {children}
            </div>
        </div>
    );
}
