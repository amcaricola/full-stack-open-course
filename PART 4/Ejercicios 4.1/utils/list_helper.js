const dummy = (blogs) => {
    if (Array.isArray(blogs)) {
        return 1;
    }
    return 0;
};

const totalLikes = (blogs) => {
    if (Array.isArray(blogs)) {
        var totalLikes = 0;
        blogs.forEach((blog) => {
            totalLikes += blog.likes ? blog.likes : 0;
        });
        return totalLikes;
    }
    return false;
};

const favoriteBlog = (blogs) => {
    if (Array.isArray(blogs)) {
        var totalLikes = 0;
        blogs.forEach((blog) => {
            totalLikes += blog.likes ? blog.likes : 0;
        });
        return totalLikes;
    }
    return false;
};

module.exports = {
    dummy,
    totalLikes,
};
