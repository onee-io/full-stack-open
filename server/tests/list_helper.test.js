const listHelper = require('../utils/list_helper');

const blogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
    }
];

test('dummy returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ];

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0);
    });

    test('when list has only one blog, equals the likes of that', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
    });

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36);
    });
});

describe('favorite blog', () => {

    test('find favorite blog', () => {
        const expectBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        };
        const actualBlog = listHelper.favoriteBlog(blogs);
        expect(expectBlog).toEqual(actualBlog);
    });
});

describe('most blogs', () => {

    test('find most blogs', () => {
        const expectAuther = {
            author: 'Robert C. Martin',
            blogs: 3
        };
        const actualAuther = listHelper.mostBlogs(blogs);
        expect(expectAuther).toEqual(actualAuther);
    });
});

describe('most likes', () => {

    test('find most likes', () => {
        const expectAuther = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        };
        const actualAuther = listHelper.mostLikes(blogs);
        expect(expectAuther).toEqual(actualAuther);
    });
});