import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { drawerWidth, } from "../../data/data";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, List, ListItemButton, ListItemText, Tooltip } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { DiaryForm } from '../organisms/modals/DiaryForm';
import { NavigationList } from './NavigationList';
import { Contact } from '../organisms/modals/Contact';
import { SuccessAlert } from './alert/SuccessAlert';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

export const DrawerList = (props) => {
  const { handleSignOut, onClose } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickCreateDiary = () => {
    setIsOpenForm(true);
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const onClickMenuItem = (action) => {
    if (action == "search") {
      setIsOpenSearch(!isOpenSearch);
    } else if (action == "contact") {
      setOpenContact(true);
      onClose();
    } else {
      navigate(action);
      onClose();
    }
  }

  return (
    <List>
      <NavigationList onClick={onClickMenuItem} isOpenSearch={isOpenSearch} />
      <Button
        size="small"
        variant="outlined"
        startIcon={<ModeEditIcon />}
        onClick={handleClickCreateDiary}
        sx={{
          width: 180,
          p: 2,
          mx: 3,
          mt: 5,
          borderRadius: 25,
        }}>
        <Typography>日記作成</Typography>
      </Button>

      <List sx={{ mt: 2, width: drawerWidth, textAlign: "center" }}>
        {!currentUser.isGest &&
          <ListItemButton
            sx={{ textAlign: "center", width: "80%", mx: "auto" }}
            onClick={() => onClickMenuItem("contact")}
          >
            <ListItemText
              secondary="お問い合わせ"
              secondaryTypographyProps={{
                fontSize: "12px",
              }} />
          </ListItemButton>
        }
        <ListItemButton
          sx={{ textAlign: "center", width: "80%", mx: "auto" }}
          onClick={() => onClickMenuItem("/about")}
        >
          <ListItemText
            secondary="Chairについて"
            secondaryTypographyProps={{
              fontSize: "12px",
            }} />
        </ListItemButton>
        <Tooltip title="ログアウト" placement="right-start">
          <Button onClick={handleSignOut} sx={{ mt: 2 }}><Logout /></Button>
        </Tooltip>
      </List>
      <DiaryForm isOpen={isOpenForm} setIsOpen={setIsOpenForm} role={"作成"} />
      <Dialog open={openAlert} onClose={handleCloseAlert}>
        <DialogContent>
          <SuccessAlert onClose={handleCloseAlert}>
            お問合せを送信しました。
          </SuccessAlert>
        </DialogContent>
      </Dialog>
      <Contact open={openContact} setOpen={setOpenContact} setOpenAlert={setOpenAlert} />
    </List >
  );
}
