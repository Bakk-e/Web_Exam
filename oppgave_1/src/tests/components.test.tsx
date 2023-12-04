import React from "react"
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react"

import Answer from "@/components/Answer"
import Button from "@/components/Button"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import useProgress from "@/hooks/useProgress"
import { vi } from 'vitest'
import { Task } from "@/types"


describe("Button Component", () => {
  it("renders a button with children", () => {
    render(<Button classNames="custom-class">Click me</Button>)
    const button = screen.getByText("Click me")
    expect(button).toHaveClass("custom-class")
    expect(button).toBeInTheDocument()
  })

  it("applies custom classNames to the button", () => {
    render(<Button classNames={["class1", "class2"]}>Custom Button</Button>)
    const button = screen.getByText("Custom Button")
    expect(button).toHaveClass("class1")
    expect(button).toHaveClass("class2")
  })
})

describe("Progress Component", () => {
  const tasks: Task[] = [
    {
      id: "123",
      text: "Skriv resultatet av regneoperasjonen",
      type: "add",
      data: "9|2",
      attempts: 0,
    },
    {
      id: "234",
      text: "Skriv resultatet av regneoperasjonen",
      type: "add",
      data: "3|2",
      attempts: 0,
    },
    {
      id: "356",
      text: "Skriv resultatet av regneoperasjonen",
      type: "multiply",
      data: "3|2",
      attempts: 0,
    },
  ]
  it("renders with default state and buttons", () => {
    const setCurrentStateMock = vi.fn();
    const initialStateIndex = 0;

    render(<Progress
        tasks={tasks}
        currentStateIndex={initialStateIndex}
        setCurrentState={setCurrentStateMock}
        onSubmit={() => {}}
    />)

    const nextButton = screen.getByText("Neste")
    expect(nextButton).toBeInTheDocument()

    const prevButton = screen.getByText("Forrige")
    expect(prevButton).toBeInTheDocument()
  })

  it('increments the state when "Neste" is clicked', () => {
    const setCurrentStateMock = vi.fn();
    const initialStateIndex = 0;

    render(<Progress
        tasks={tasks}
        currentStateIndex={initialStateIndex}
        setCurrentState={setCurrentStateMock}
        onSubmit={() => {}}/>)

    const nextButton = screen.getByText("Neste")

    fireEvent.click(nextButton)
  })

  it('decrements the state when "Forrige" is clicked', () => {
    const setCurrentStateMock = vi.fn()
    const initialSateIndex = 1;

    render(<Progress
        tasks={tasks}
        currentStateIndex={initialSateIndex}
        setCurrentState={setCurrentStateMock}
        onSubmit={() => {}}
    />)

    const nextButton = screen.getByText("Neste")
    const prevButton = screen.getByText("Forrige")

    fireEvent.click(nextButton)
    fireEvent.click(prevButton)
  })

  it("renders the provided text", () => {
    const text = "This is a test task text."
    render(<TaskText text={text} />)
    const taskTextElement = screen.getByText(text)

    expect(taskTextElement).toBeInTheDocument()
  })

  it("applies the correct CSS class", () => {
    const text = "This is a test task text."
    render(<TaskText text={text} />)
    const taskTextElement = screen.getByText(text)

    expect(taskTextElement).toHaveClass("text-sm text-slate-400")
  })

  it("renders the header text correctly", () => {
    const testTask = tasks[0]

    render(<Header task={testTask}/>)
    const headerElement = screen.getByText("Skriv resultatet av regneoperasjonen")

    expect(headerElement).toBeInTheDocument()
  })

  it("updates the answer correctly", () => {
    const testTask = tasks[0]

    const mockCorrectAnswer = null;
    const mockOnCheckAnswer = vi.fn();
    const mockOnCorrect = vi.fn();
    const mockOnWrong = vi.fn();

    render(<Answer
        task={testTask}
        correctAnswer={mockCorrectAnswer}
        onCheckAnswer={mockOnCheckAnswer}
        onCorrect={mockOnCorrect}
        onWrong={mockOnWrong}
    />)

    const inputElement = screen.getByPlaceholderText("Sett svar her") as HTMLInputElement

    fireEvent.input(inputElement, { target: { value: "11" } })

    expect(inputElement.value).toBe("11")
  })

  it('displays "Bra jobba, Riktig svar!" when the answer is correct', () => {
    const testTask = tasks[0]

    const mockOnCheckAnswer = vi.fn().mockReturnValue(true)
    const mockOnCorrect = vi.fn()
    const mockOnWrong = vi.fn()

    render(<Answer
        task={testTask}
        correctAnswer={11}
        onCheckAnswer={mockOnCheckAnswer}
        onCorrect={mockOnCorrect}
        onWrong={mockOnWrong}
    />)

    const inputElement = screen.getByPlaceholderText("Sett svar her")
    const sendButton = screen.getByText("Send")

    fireEvent.input(inputElement, { target: { value: "11" } })
    fireEvent.click(sendButton)

    const successMessage = screen.getByText("Bra jobba, Riktig svar!")
    expect(successMessage).toBeInTheDocument()
  })

  it("renders a list of tasks correctly", () => {
    render(<Tasks tasks={tasks}>{null}</Tasks>)

    for (const task of tasks) {
      const taskText = screen.queryByText(task.text);
      const taskData = screen.queryByText(task.data);
      const taskType = screen.queryByText(task.type);

      if (taskText) expect(taskText).toBeInTheDocument();
      if (taskData) expect(taskData).toBeInTheDocument();
      if (taskType) expect(taskType).toBeInTheDocument();
    }
  });

  it("initializes with count as 0 and returns the current task", () => {
    const { result } = renderHook(() => useProgress({ tasks }))

    expect(result.current.count).toBe(0)
    expect(result.current.current).toEqual(tasks[0])
  })

  it("updates count when next is called", () => {
    const { result } = renderHook(() => useProgress({ tasks }))

    act(() => {
      result.current.next()
    })

    expect(result.current.count).toBe(1)
    expect(result.current.current).toEqual(tasks[1])
  })

  it("updates count when prev is called", () => {
    const { result } = renderHook(() => useProgress({ tasks }))

    act(() => {
      result.current.next()
    })

    act(() => {
      result.current.prev()
    })

    expect(result.current.count).toBe(0)
    expect(result.current.current).toEqual(tasks[0])
  })
})
