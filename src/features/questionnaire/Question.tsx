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
        group.push(option);
        groups[option.option] = {
            option: option.option,
            options_group: group,
            resp_type: option.resp_type,
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
                            <></>
                        )
                    }
                })
            }
        </>
    )

}