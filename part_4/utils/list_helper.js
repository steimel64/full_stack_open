const _ = require("lodash");

const dummy = (blogs) => {
    return 1
  }


const totalLikes = (blogs) => {

    var likes = 0;

    blogs.forEach(function (item, index) {
        likes += item.likes
     })
    return likes
}

const favoriteBlog = (blogs) => {
    var maxlikes = Math.max(...blogs.map(e => e.likes));
    var favoriteBlog = blogs.find(blog => blog.likes === maxlikes);
    return favoriteBlog
}

const mostBlogs = (blogs) => {
    countByAuthor = _.countBy(blogs, 'author')
    maxAuthor = _.max(Object.keys(countByAuthor), o => countByAuthor[o])
    
    var output = {"author": maxAuthor,
                  "blogs": countByAuthor[maxAuthor]}
        
    console.log(output)

    return output
}

const mostLikes = (blogs) => {

    likesByAuthor = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
        'author': key,
        'likes': _.sumBy(objs, 'likes') }))
    .value();

    maxAuthor = _.maxBy(likesByAuthor, function(o){return o.likes})

    var output = {"author": maxAuthor['author'],
                  "likes": maxAuthor['likes']}

    return output
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }