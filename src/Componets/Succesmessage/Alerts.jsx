import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts() {

    const [msg,setMsg]=React.useState(true)
    const [Error,setError]=React.useState(true)
    React.useEffect(()=>{
        const time=setTimeout(() => {
            setMsg(false)
            setError(false)
        }, 3000);
    })
  return (
    <>
      {msg && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">success .</Alert>
        
        </Stack>
      )}
     
    </>
  );
}
