import { Question } from "@/types"

type answerQuestionProps = {
    question: Question,
}

export default function AnswerQuestion(props: answerQuestionProps) {
    const {question} = props;

    return (
        <div>
            <p>{question.text}</p>
            {question.type == "text" && (
                <form>
                    <input/>
                </form>
            )}
            {question.type == "emoji" && (
                <form>
                    {Array.from({length: 10}, (_, index) =>(
                        <label>
                            <input type="radio" name="ytelse" value={`${index + 1}`}/>
                            {index + 1}
                        </label>
                    ))}
                </form>
            )}
            {question.type == "radio" && (
                <form>
                    <label>
                        <input type="radio" name="ytelse" value="worseThenNormal"/>
                        &#128542;
                    </label>
                    <label>
                        <input type="radio" name="ytelse" value="normal"/>
                        &#128528;
                    </label>
                    <label>
                        <input type="radio" name="ytelse" value="betterThenNormal"/>
                        &#128513;
                    </label>
                </form>
            )}
        </div>
    );
}