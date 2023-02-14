import { useCounterValue } from "../part6/CounterContext";

const Display = () => {
    const counter = useCounterValue();
    return (
        <div>{counter}</div>
    );
}

export default Display;