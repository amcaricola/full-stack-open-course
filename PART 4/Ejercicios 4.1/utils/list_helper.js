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
        var filteredBlog = blogs.sort((a, b) => {
            return b.likes - a.likes;
        });
        var blogToReturn = {
            title: filteredBlog[0].title,
            author: filteredBlog[0].author,
            likes: filteredBlog[0].likes,
        };
        return blogToReturn;
    }
    return false;
};

const mostBlogs = (blogs) => {
    if (Array.isArray(blogs)) {
        var control = {};
        blogs.forEach((blog) => {
            if (control[blog.author]) {
                control[blog.author] += 1;
            } else {
                control[blog.author] = 1;
            }
        });

        let authorToReturn = {
            author: '',
            blogs: 0,
        };

        for (var author in control) {
            if (control[author] > authorToReturn.blogs) {
                authorToReturn.author = author;
                authorToReturn.blogs = control[author];
            }
        }
        return authorToReturn;
    }
    return false;
};

const mostLikes = (blogs) => {
    if (Array.isArray(blogs)) {
        var control = {};
        blogs.forEach((blog) => {
            if (control[blog.author]) {
                control[blog.author] += blog.likes;
            } else {
                control[blog.author] = blog.likes;
            }
        });

        let authorToReturn = {
            author: '',
            likes: 0,
        };

        for (var author in control) {
            if (control[author] > authorToReturn.likes) {
                authorToReturn.author = author;
                authorToReturn.likes = control[author];
            }
        }
        return authorToReturn;
    }
    return false;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
