import { useState } from "react";

const Unicafe = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

    return (
        <div>
            <Title text='give feedback' />
            <Button onClick={handleGood} text='good' />
            <Button onClick={handleNeutral} text='neutral' />
            <Button onClick={handleBad} text='bad' />
            <Title text='statistics' />
            <Statistics props={{ good, neutral, bad }} />
        </div>
    )
}

const Title = ({ text }) => (
    <h1>{text}</h1>
)

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)

const Statistics = ({ props }) => {
    const { good, neutral, bad } = props;
    const all = good + neutral + bad;
    if (all === 0) {
        return (
            <div>No feedback given</div>
        )
    }
    const average = ((good - bad) / all).toFixed(1);
    const positive = ((good / all) * 100).toFixed(1) + '%';
    return (
        <div>
            <table>
                <Cell name='good' value={good} />
                <Cell name='neutral' value={neutral} />
                <Cell name='bad' value={bad} />
                <Cell name='all' value={all} />
                <Cell name='average' value={average} />
                <Cell name='positive' value={positive} />
            </table>
        </div>
    )
}

const Cell = ({ name, value }) => (
    <tr>
        <td>{name}</td>
        <td>{value}</td>
    </tr>
)

export default Unicafe;