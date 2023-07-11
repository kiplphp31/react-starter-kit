import { useState } from "react";
import { Form } from "react-bootstrap";


export interface QuestionProps {
    questionnaireList: any[];
    currentQuestionnaireId: number;
    selectedValue: string;
    handelSubmit: (reqData: any, next_question_txn_id: any) => void;
}

export default function Question(props: QuestionProps) {
    const { questionnaireList, currentQuestionnaireId, selectedValue, handelSubmit } = props;
    const currentQuestionnaire = questionnaireList.find(q => q.question_txn_id === currentQuestionnaireId);
    const questionText = currentQuestionnaire.question_txt;
    const questionOptions = currentQuestionnaire.options;
    const questionOptionsGroups = questionOptions.reduce((groups: any, option: any) => {
        const group = (groups[option.option] || []);
        if (option.resp_type === 'Text Box' && option.answer_text) {
            const answer_between = option.answer_text.split('-').map((a: any) => Number(a.trim()));
            option.answer_min = answer_between[0];
            option.answer_max = answer_between[1] || null;
        }
        group.push(option);
        groups[option.option] = {
            option: option.option,
            options_group: group,
            resp_type: option.resp_type,
            resp_id: option.resp_id,
            next_question_txn_id: option.next_question_txn_id
        };
        return groups;
    }, {});

    const handelRadioChange = (e: any, option: any) => {
        console.log(e.target.value);
        console.log(option);
        handelSubmit({
            decision_detail_txn_id: -1,
            decision_summary_txn_id: -1,
            question_resp: {
                question_txn_id: currentQuestionnaireId,
                resp_id: e.target.value,
                answer_text: option.answer_text
            }
        }, option.next_question_txn_id);
    }

    const [textInputs, setTextInputs] = useState<any[]>([]);

    const handelTextBoxChange = (e: any, option: any) => {
        console.log(e.target.value);
        console.log(option);
        const resp = option.options_group.filter()
        setTextInputs([...textInputs, {
            question_txn_id: currentQuestionnaireId,
            resp_id: option.resp_id,
            answer_text: e.target.value
        }]);
    }

    return (
        <>
            <h3>{questionText}</h3>
            {
                Object.keys(questionOptionsGroups).map((option: any) => {
                    if (option.resp_type === 'Radio Button') {
                        return (<>
                            <Form.Check
                                type="radio"
                                label={option.option}
                                checked={selectedValue === option.resp_id}
                                value={option.resp_id}
                                onChange={(e) => handelRadioChange(e, option)}
                            />
                        </>)

                    } else if (option.resp_type === 'Text Box') {
                        return (
                            <>
                                <Form.Group className="mb-3" controlId={option.resp_id}>
                                    <Form.Label>{option.option}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={"Enter " + option.option}

                                    />
                                </Form.Group>
                            </>
                        )
                    }
                })
            }
        </>
    )

}