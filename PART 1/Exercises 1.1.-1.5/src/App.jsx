const Header = ({ course: { name } }) => {
    return <h1>{name}</h1>;
};

const Content = ({ course }) => {
    return (
        <>
            <Part info={course.parts[0]} />
            <Part info={course.parts[1]} />
            <Part info={course.parts[2]} />
        </>
    );
};

const Part = ({ info }) => {
    let { name, exercises } = info;
    return (
        <>
            <p>
                {name} {exercises}
            </p>
        </>
    );
};

const Total = ({ course }) => {
    let total = 0;
    course.parts.forEach((item) => {
        total += item.exercises;
    });
    return <p>Number of exercises {total}</p>;
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of a component',
                exercises: 14,
            },
        ],
    };

    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    );
};

export default App;
