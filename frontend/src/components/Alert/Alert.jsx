import React from 'react'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar'
import { useDispatch, useSelector } from "react-redux";
import {hideAlert} from '../../features/modalSlice'

const Alerts = () => {

    const {
        modal: {  visible, msg, type  },
	} = useSelector(state => state);

    const dispatch = useDispatch();


    console.log("from alert")

  return (
    <Snackbar
      open={visible}
      autoHideDuration={4000}
      onClose={() => dispatch(hideAlert())}
    >
      <Alert severity={type} variant="filled">
       {msg}
      </Alert>
    </Snackbar>
  )
}

export default Alerts