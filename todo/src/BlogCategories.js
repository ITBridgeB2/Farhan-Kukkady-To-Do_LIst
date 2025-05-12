import { useState } from 'react';
import axios from 'axios';

function BlogCategories() {
    const [categories] = useState(['Travel', 'Technology', 'Books']);
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async (category) => {
        try {
            const response = await axios.get(`/blogs/${category}`);
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs", error);
        }
    };

    return (
        <div>
            <h2>Categories</h2>
            <div>
                {categories.map((category) => (
                    <button key={category} onClick={() => fetchBlogs(category)}>
                        {category}
                    </button>
                ))}
            </div>
            <div>
                {blogs.map((blog) => (
                    <div key={blog.id}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogCategories;
