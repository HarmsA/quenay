import React, { useState } from 'react';
import './AddQuestion.css';

const AddQuestion = () => {
    const [question, setQuestion] = useState('');
    const [questionTypes, setQuestionTypes] = useState(['Open Ended', 'Multiple Choice', 'Multiple Answer', 'True/False']);
    const [questionType, setQuestionType] = useState('');

    const openEndedQuestion = () => {
        return (
            <div>
                <label className='openEnded'>Question:</label>
                <textarea className='openEnded' type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>
        );
    };  
    
    const multipleChoiceQuestion = () => {
        return (
            <div>
                <label className='multipleChoice'>Question:</label>
                <textarea className='multipleChoice' type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
  
            </div>
        );
    };

    const multipleAnswerQuestion = () => {
        return (
            <div>
                <label className='multipleAnswer'>Question:</label>
                <input className='multipleAnswer' type="textarea" value={question} onChange={(e) => setQuestion(e.target.value)} />
                {/* <label className='multipleAnswer'>Option 1:</label>
                <input className='multipleAnswer' type="text" />
                <label className='multipleAnswer'>Option 2:</label>
                <input className='multipleAnswer' type="text" />
                <label className='multipleAnswer'>Option 3:</label>
                <input className='multipleAnswer' type="text" />
                <label className='multipleAnswer'>Option 4:</label>
                <input className='multipleAnswer' type="text" /> */}
            </div>
        );
    };

    const trueFalseQuestion = () => {   
        return (
            <div>
                <label className='trueFalse'>Question:</label>
                <textarea className='trueFalse' type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>
        );
    };

    const handleQuestionType = (e) => { 
        setQuestionType(e.target.value);

    }
    return (
        <div>
            <h2>Add Question</h2>
            {questionTypes.map((type, index) => {
                return (
                    <div key={index}>
                        <input type="radio" id={type} name="questionType" value={type} onChange={handleQuestionType} />
                        <label htmlFor={type}>{type}</label>
                    </div>
                );
            })}
            {questionType === 'Open Ended' ? openEndedQuestion() : null}
            {questionType === 'Multiple Choice' ? multipleChoiceQuestion() : null}
            {questionType === 'Multiple Answer' ? multipleAnswerQuestion() : null}
            {questionType === 'True/False' ? trueFalseQuestion() : null}
        </div>
    );
};

export default AddQuestion;