import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import DetailedBlog from "../components/DetailedBlog";
import Loader from "../components/Loader";

export const Blog = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, blog } = useBlog({
        id: id || "",
    });

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center text-blue-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    <Loader />
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center text-red-500 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Blog not found.
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
            <DetailedBlog blog={blog} />
        </div>
    );
};
