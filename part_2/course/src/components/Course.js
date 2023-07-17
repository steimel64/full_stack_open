
const Header = (name) => {
    return (
        <h2>{name.name}</h2>
    )
}

const Content = (course) => {
    return (
        <li>{course.name} {course.exercises}</li>
    )
}

const Total = (total) => {
    return (
        <div><b>total of {total.total} exercises</b> </div>
    )
}

const Section = (courses) => {
    const header = courses.name
    const parts = courses.parts
    const total = parts.reduce((total, item) => item.exercises + total, 0);
    return (
        <div>
            <Header name={header} />
            {parts.map(course => <Content key={course.id} name={course.name} exercises={course.exercises} />)}
            <br></br>
            <Total total={total} />
        </div>
    )
}

const Courses = ({ courses }) => {
    return (
        <div>
            <h1>Web Development Curriculum</h1>
            {courses.map(courses =>
                <Section key={courses.id} parts={courses.parts} name={courses.name} />
            )}

        </div>
    )
}

export default Courses

// Finished exercises 2.1-2.5 7/17 