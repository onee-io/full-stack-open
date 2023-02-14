import Button from '../components/Button'
import Display from '../components/Display'
import { CounterContextProvider } from './CounterContext'

const Counter = () => {
    return (
        <CounterContextProvider>
            <Display />
            <div>
                <Button type='INC' label='+' />
                <Button type='DEC' label='-' />
                <Button type='ZERO' label='0' />
            </div>
        </CounterContextProvider>
    )
}

export default Counter;