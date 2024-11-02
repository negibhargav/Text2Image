import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import Container from './container';

export default function InputField(){
    const [load,setLoad] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const[responseHit,setResponseHit] = useState({});
    const [disabled,setDisabled] = useState(false);
    const [status,setStatus]  = useState(0);
    const [prompt,setPrompt] = useState('');

    const handleClick = async(e)=>{
        e.preventDefault();

        if (inputValue.trim() === '') return;

        setLoad(true);
        setDisabled(true);
        try {
            const response = await axios.post('http://localhost:3000/generate-image', {
                prompt: inputValue
            });
            const data = response.data;
            const status = response.status;
            setStatus(prev=>status);
            setResponseHit(prev=>data);
            setPrompt(prev=>inputValue);
;        } catch (err) {
            console.error(err);
        } finally {
            setLoad(false);
            setInputValue('');
            setDisabled(false);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (inputValue.trim() !== '') {
                handleClick(e);
            }
        }
    };

    return(
        <div className='decide'>
            <div className='container'>
                <form className='inputC' onSubmit={handleClick}>
                    <Textarea
                    className='text'
                    color="neutral"
                    minRows={3}
                    disabled={disabled}
                    placeholder="Type your query"
                    size="md"
                    variant="soft"
                    required

                    sx={{
                        borderBottom: '5px solid',
                        borderColor: 'neutral.outlinedBorder',
                        display:'flex',
                        borderRadius: 10,
                        '&:hover': {
                        borderColor: 'neutral.outlinedHoverBorder',
                        },
                        '&::before': {
                        border: '3px solid var(--Textarea-focusedHighlight)',
                        transform: 'scaleX(0)',
                        left: 0,
                        right: 0,
                        bottom: '-2px',
                        top: 'unset',
                        transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                        borderRadius: 0,
                        },
                        '&:focus-within::before': {
                        transform: 'scaleX(1)',
                        },
                        mb:2
                        
                    }}
                        value={inputValue} 
                        onChange={(e)=>setInputValue(e.target.value)} 
                        onKeyDown={handleKeyDown}
                    />
                    <Button
                    className='btn'
                    color="neutral"
                    loading={load}
                    size="lg"
                    variant="solid"
                    type='submit'
                    >Generate</Button>
                </form>

                
            </div>
            <Container response={responseHit} statusCode={status} prompt={prompt}/>
        </div>
    )
}