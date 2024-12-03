// import { Link } from "react-router-dom"
// import { Avataar } from "./Avataar"

// interface BlogCardProps {
//     id: string
//     authorName: string,
//     title: string,
//     content: string,
//     publishedDate: string,
// }



// export const BlogCard = ({ id, authorName, title, content, publishedDate }: BlogCardProps) => {
// const minute :number =Math.ceil(content.length / 100)
//     return (
//         <Link to={`/blog/${id}`} className="main-page hover:bg-slate-100 hover:scale-110 transition-all w-[50%] border-b-2 p-4 border-zinc-300">
//                 <div className="card-header flex items-center gap-3 ">
//                     <h1 className="">{<Avataar name={authorName} size={28} />}</h1>
//                     <h1 className="font-semibold text-zinc-400">{authorName}</h1>
//                     <div className="h-1 w-1 rounded-full bg-zinc-300"></div>
//                     <h1 className="font-semibold text-zinc-300 text-sm" >{publishedDate}</h1>
//                 </div>
//                 <div className="text-2xl font-bold mt-3">{title}</div>
//                 <div className="text-md font-semibold text-gray-500 mt-1" dangerouslySetInnerHTML={{ __html: content.slice(0, 100) + '...' }}></div>
//                 <div className=" my-2 text-xs font-semibold"> {(minute>1)?`${minute} minutes Read`:`${minute} minute Read`} </div> {/*logic for minute and minutes*/}
//         </Link>
//     )
// }


import { Link } from "react-router-dom";
import { Avataar } from "./Avataar";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({ id, authorName, title, content, publishedDate }: BlogCardProps) => {
    const minute: number = Math.ceil(content.length / 100);

    return (
        <Link
            to={`/blog/${id}`}
            className="main-page hover:bg-slate-50 hover:scale-[1.02] transition-all w-full md:w-[48%] border-b-2 p-4 border-zinc-300 rounded-lg shadow-sm"
        >
            {/* Card Header */}
            <div className="card-header flex items-center gap-3">
                <Avataar name={authorName} size={28} />
                <h1 className="font-semibold text-zinc-600">{authorName}</h1>
                <div className="h-1 w-1 rounded-full bg-zinc-400"></div>
                <h1 className="font-semibold text-zinc-400 text-sm">{publishedDate}</h1>
            </div>

            {/* Blog Title */}
            <div className="text-xl md:text-2xl font-bold mt-3 text-zinc-800">{title}</div>

            {/* Blog Excerpt */}
            <div
                className="text-sm md:text-md font-medium text-gray-500 mt-1"
                dangerouslySetInnerHTML={{ __html: content.slice(0, 100) + "..." }}
            ></div>

            {/* Read Time */}
            <div className="mt-2 text-xs font-semibold text-zinc-500">
                {minute > 1 ? `${minute} minutes read` : `${minute} minute read`}
            </div>
        </Link>
    );
};
