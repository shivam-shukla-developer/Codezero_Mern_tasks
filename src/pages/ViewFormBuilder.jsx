import React from 'react'
import { Box, FormControl, FormControlLabel, Button, Typography, TextField, Radio, RadioGroup, FormLabel, Checkbox, FormGroup } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const choiceOptions = {
    "option1": "",
    "option2": "",
    "option3": "",
    "option4": "",
};


function ViewFormBuilder() {
    let { slug } = useParams();
    const form = (useSelector((state) => {
        const data = state.forms.forms.reduce((prev, curr) => {
            if (curr.slug === slug) prev = curr;
            return prev;
        }, {})
        return data;
    }));
    return (
        <>

            <Box
                noValidate
                autoComplete="off"
            >
                {Object.keys(form).length ?
                    <>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Form is for preview only. Submission is not supported."); }} method="POST">

                            <FormControl fullWidth>
                                <Typography variant="subtitle1" gutterBottom>
                                    {form.title}
                                </Typography>
                            </FormControl>
                            {form.answer_type === 'text' &&
                                <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                                    <TextField fullWidth id="answer" label="Answer" variant="outlined" value={''} />
                                </FormControl>
                            }

                            {form.answer_type === 'singleselect' && <>
                                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Select Your Option</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        {Object.keys(choiceOptions).map((item) =>
                                            <FormControlLabel value={item} control={<Radio />} label={form[item]} key={item} />
                                        )}
                                    </RadioGroup>
                                </FormControl>
                            </>}

                            {form.answer_type === 'multichoice' && <>
                                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                                    <FormGroup>
                                        {Object.keys(choiceOptions).map((item) =>
                                            <FormControlLabel value={item} control={<Checkbox />} label={form[item]} key={item} />
                                        )}
                                    </FormGroup>
                                </FormControl>
                            </>}

                            <Button variant="contained" type='submit'>Submit</Button>
                        </form>
                    </>
                    : null
                }
                {!Object.keys(form).length && <Typography>
                    The form you are looking for is not found.
                </Typography>}

            </Box>
        </>
    )
}

export default ViewFormBuilder