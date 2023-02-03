const Course = () => {
    const courses = [{
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    },
    {
        name: 'Node.js',
        id: 2,
        parts: [
            {
                name: 'Routing',
                exercises: 3,
                id: 1
            },
            {
                name: 'Middlewares',
                exercises: 7,
                id: 2
            }
        ]
    }]
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => 
                <Curriculum key={course.id} course={course} />
            )}
        </div>
    )
}

const Curriculum = ({course}) => (
    <div>
        <Header text={course.name} />
        <Content parts={course.parts} />
    </div>
)

const Header = ({ text }) => <h2>{text}</h2>

const Content = ({ parts }) => {
    const total = parts.map(part => part.exercises).reduce((a, b) => a + b);
    const totalStyle = {
        'font-weight': 'bold'
    }
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
            <p style={totalStyle}>total of {total} exercises</p>
        </div>
    )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

export default Course;