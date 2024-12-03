import { BlogCard } from "../components/BlogCard";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import { useBlogs } from "../hooks";
import DOMPurify from "dompurify";

const Blogs = () => {
    const { blogs, loading } = useBlogs();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-500">
                    <Loader />
                </div>
            </div>
        );
    }

    return (
        <>
            <main className="p-4 sm:p-6 md:p-8">
                <NavBar />
                <div className="flex flex-wrap justify-center items-center mt-5 gap-6">
                    {blogs.map((data, idx) => {
                        const sanitizedContent = DOMPurify.sanitize(data.content);
                        return (
                            <BlogCard
                                key={idx}
                                id={data.id}
                                authorName={data.author.name}
                                title={data.title}
                                content={sanitizedContent}
                                publishedDate={data.createdAt.split("T")[0]}
                            />
                        );
                    })}
                </div>
            </main>
        </>
    );
};

export default Blogs;
