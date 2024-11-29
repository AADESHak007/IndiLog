export function Avataar({ name,size }: { name: string | null, size: number}) {
    return (
        <div style={{ width: size, height: size}} className={`relative p-2 inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className="text-lg font-semibold text-center text-gray-600 dark:text-gray-300">{(name)?name[0]:"anonymous"}</span>
        </div>
    )
}