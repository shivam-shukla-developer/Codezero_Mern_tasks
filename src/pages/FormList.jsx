import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { removeForm } from '../store/reducers/forms'
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
export default function FormList() {

  const { forms } = useSelector((state) => state.forms);
  const dispatch = useDispatch();
  const dateFormatter = React.useCallback((timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }, []);
  
  const deleteForm = React.useCallback((slug) => {
      dispatch(removeForm({slug}))
  }, [dispatch]);


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Form Name</TableCell>
            <TableCell align="left">Form URL</TableCell>
            <TableCell align="left">Created At</TableCell>
            <TableCell align="left">Preview</TableCell>
            <TableCell align="left">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forms.map((row) => (
            <TableRow
              key={row.slug}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="left">{row.slug}</TableCell>
              <TableCell align="left">{dateFormatter(row.createdAt)}</TableCell>
              <TableCell align="left">
                <IconButton aria-label="preview" component={Link} to={`/form/${row.slug}`}>
                  <PreviewIcon />
                </IconButton>
              </TableCell>
              <TableCell align="left">
                <IconButton aria-label="remove" onClick={() => {deleteForm(row.slug)}} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}