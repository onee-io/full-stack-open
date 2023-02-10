import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note';

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    // 渲染组件
    render(<Note note={note} />)
    // 查找元素
    const element = screen.getByText('Component testing is done with react-testing-library')
    expect(element).toBeDefined()
});

test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    // 用 Jest 定义的 mock 函数
    const mockHandler = jest.fn()
    // 渲染组件
    render(<Note note={note} toggleImportance={mockHandler} />)
    // 查找按钮
    const button = screen.getByText('make not important')
    // 点击按钮
    userEvent.click(button)
    // 一个模拟函数被触发
    expect(mockHandler.mock.calls).toHaveLength(1)
})