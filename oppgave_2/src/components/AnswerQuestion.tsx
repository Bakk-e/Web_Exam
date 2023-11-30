import { Question } from "@/types"

type answerQuestionProps = {
    question: Question,
}

export default function AnswerQuestion(props: answerQuestionProps) {
    const {question} = props;

    return (
        <div className="new-report-page-question">
            <p className="new-report-page-question-text">{question.text}</p>
            {question.type == "text" && (
                <form>
                    <input  className="new-report-page-question-input"/>
                </form>
            )}
            {question.type == "emoji" && (
                <form className="new-report-page-question-radio-form">
                    {Array.from({length: 10}, (_, index) =>(
                        <label className="new-report-page-question-radio">
                            <input className="new-report-page-question-radio-input" type="radio" name="ytelse" value={`${index + 1}`}/>
                            {index + 1}
                        </label>
                    ))}
                </form>
            )}
            {question.type == "radio" && (
                <form className="new-report-page-question-emoji-form">
                    <label className="new-report-page-question-emoji">
                        <input type="radio" name="ytelse" value="worseThenNormal"/>
                        &#128542;
                    </label>
                    <label className="new-report-page-question-emoji">
                        <input type="radio" name="ytelse" value="normal"/>
                        &#128528;
                    </label>
                    <label className="new-report-page-question-emoji">
                        <input type="radio" name="ytelse" value="betterThenNormal"/>
                        &#128513;
                    </label>
                </form>
            )}
        </div>
    );
}