import React from 'react'
import { Formik } from 'formik';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Typography, Alert as MuiAlert, Snackbar, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addForm } from '../store/reducers/forms'

const choiceOptions = {
    "option1": "",
    "option2": "",
    "option3": "",
    "option4": "",
};

const initialValues = { title: '', answer_type: 'text', ...choiceOptions };
const answerTypes = {
    text: "Text",
    multichoice: "Multichoice Checkbox",
    singleselect: "Single Select Radio",
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddFormBuilder() {
    const dispatch = useDispatch();
    const [showalert, setShowMessage] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertType, setAlertType] = React.useState('success');
    const { forms } = useSelector((state) => state.forms);

    return (
        <>
            <Box
                noValidate
                autoComplete="off"
            >
                <Formik
                    initialValues={initialValues}
                    validate={values => {
                        const errors = {};
                        if (!values.title) {
                            errors.title = 'Title is Required';
                        }
                        if (values.answer_type === 'singleselect' || values.answer_type === 'multichoice') {        
                            const uniqueValues = [];
                            for (let item in choiceOptions) {
                                if (!values[item]) {
                                    errors[item] = 'This Field is Required';
                                } else {
                                    if (uniqueValues.includes(values[item])) {
                                        errors[item] = 'Duplicate value is not allowed.';
                                    }
                                    else uniqueValues.push(values[item])
                                }
                            }
                        } else {
                            for (let item in choiceOptions) {
                                delete errors[item];
                            }
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {

                        let slug = values.title.toLowerCase().replace(/ /g, '-')
                        .replace(/[^\w-]+/g, '').substring(0, 15);

                        for (let form of forms) {
                            if (form.slug === slug) slug+=`-` + Date.now();
                        }

                        dispatch(addForm({...values, slug, createdAt: Date.now()}))

                        setSubmitting(false);

                        setAlertMessage(`Form Created Successfully. Unique slug ${slug} generated.`);
                        setAlertType("success");
                        setShowMessage(true);
                        resetForm();
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} method="POST">

                            <FormControl fullWidth>
                                <TextField fullWidth id="title" onChange={handleChange} label="Title" variant="outlined" value={values.title} />
                                <Typography variant="p" gutterBottom color={"error"}>
                                    {errors.title && touched.title && errors.title}
                                </Typography>
                            </FormControl>

                            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                                <InputLabel id="answer_type">Answer Type</InputLabel>
                                <Select
                                    labelId="answer_type"
                                    id="demo-simple-select"
                                    name="answer_type"
                                    value={values.answer_type}
                                    label="Answer Type"
                                    onChange={handleChange}
                                >
                                    {Object.keys(answerTypes).map((item) => <MenuItem key={item} value={item}>{answerTypes[item]}</MenuItem>)}
                                </Select>
                                <Typography variant="p" gutterBottom color={"error"}>
                                    {errors.answer_type && touched.answer_type && errors.answer_type}
                                </Typography>
                            </FormControl>

                            {(values.answer_type === 'singleselect' || values.answer_type === 'multichoice') && <>

                                {Object.keys(choiceOptions).map((item, key) =>

                                    <FormControl key={item} fullWidth sx={{ mb: 2 }}>
                                        <TextField fullWidth id={item} name={item} onChange={handleChange} label={"Option " + (key + 1)} variant="outlined" value={values[item]} />
                                        <Typography variant="p" gutterBottom color={"error"}>
                                            {errors[item] && touched[item] && errors[item]}
                                        </Typography>
                                    </FormControl>

                                )}


                            </>}


                            <Button variant="contained" type="submit" disabled={isSubmitting}>Submit</Button>
                        </form>
                    )}
                </Formik>
            </Box>
            <Snackbar open={showalert} autoHideDuration={6000} onClose={() => { setShowMessage(false) }}>
                <Alert style={{ whiteSpace: 'pre-line' }} onClose={() => { setShowMessage(false) }} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddFormBuilder