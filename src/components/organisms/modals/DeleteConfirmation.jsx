import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Divider, Typography } from "@mui/material";

export const DeleteConfirmation = (props) => {
  const { open, setOpen, action, children } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
      sx={{
        py: 5,
        my: 5
      }}
    >
      <DialogTitle id="alert-dialog-title" variant='subtitle2'>
        本当によろしいですか？
      </DialogTitle>
      <Divider variant='middle' />
      <DialogContent>
        <DialogContentText id="alert-dialog-description" variant='caption'>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}><Typography variant='caption'>キャンセル</Typography></Button>
        <Button onClick={action} autoFocus><Typography variant='caption'>削除</Typography></Button>
      </DialogActions>
    </Dialog>
  )
}
