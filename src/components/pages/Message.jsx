import { Avatar, CircularProgress, Divider, IconButton, List, ListItem, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { showMessage } from "../../api/room"
import { AuthContext } from "../../providers/AuthProvider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { deleteMessage } from "../../api/message";
import { departmentList } from "../../data/data";
import moment from "moment";
import { useRef } from "react";
import { DeleteConfirmation } from "../organisms/modals/DeleteConfirmation";
import { MessageForm } from "../molcules/form/MessageForm";

export const Message = () => {
 const [messages, setMessages] = useState();
 const [roomData, setRoomData] = useState();
 const [open, setOpen] = useState(false);
 const [targetMessage, setTargetMessage] = useState();

 const [loading, setLoading] = useState(true);
 const { currentUser } = useContext(AuthContext);

 const params = useParams();
 const navigate = useNavigate();

 const handleGetMessages = async () => {
  if (!currentUser.isGest) {
   const res = await showMessage(params.id)
   try {
    setMessages(res.data.messages);
    setRoomData(res.data.data)
   } catch (err) {
    console.log(err);
   }
   bottomRef.current?.scrollIntoView();
   setLoading(false);
  } else return navigate(-1);
 }

 const handleClickMessage = (message) => {
  setOpen(true);
  setTargetMessage(message);
 }

 const handleClickAvatar = () => {
  navigate(`/${params.id}`)
 }

 const handleDeleteMessage = async () => {
  const res = await deleteMessage(targetMessage.id);
  try {
   if (res.status === 200) {
    setMessages(messages.filter(message => message.id !== targetMessage.id));
    setOpen(false);
    setTargetMessage();
   }
  } catch (err) {
   console.log(err);
  }
 }

 const bottomRef = useRef(null);

 useEffect(() => {
  handleGetMessages();
 }, [messages?.length]);

 if (!loading) {
  return (
   <Box>
    <Box>
     <Box sx={{ display: "flex", alignItems: "center", position: "absolute" }}>
      <IconButton
       display="flex"
       onClick={() => navigate(-1)}>
       <ArrowBackIcon color="primary" />
      </IconButton>
      <Typography color="black" variant="subtitle2">メッセージ</Typography>
     </Box>
     <Box sx={{ my: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Avatar
       alt="user"
       src={roomData?.otherUser.image.url}
       sx={{
        width: 40,
        height: 40,
        "&:hover": {
         cursor: "pointer",
         opacity: "80%",
         transition: "opacity 0.5s",
        }
       }}
       onClick={handleClickAvatar} />
      <Typography color="black" variant="subtitle2">{roomData.otherUser.name}</Typography>
      <Typography color="gray" variant="caption">{departmentList[roomData.otherUser.department]}</Typography>
     </Box>
    </Box>

    <Divider />
    <List
     sx={{
      overflowY: "auto",
      height: "65vh",
      display: "flex",
      flexDirection: "column",
     }}>
     {messages.map((message, index) => {
      const isOwn = message.userId === currentUser.id
      const date = moment(message.createdAt).format("MM月DD日 HH:mm");
      const end = messages.length - 1 == index
      return (
       <ListItem
        onClick={() => message.userId == currentUser.id && handleClickMessage(message)}
        key={message.id}
        sx={{
         display: "flex",
         flexDirection: "column",
         alignItems: isOwn ? "flex-end" : "flex-start"
        }}>
        <Typography
         textAlign={isOwn ? "right" : "left"}
         border={0}
         color={isOwn ? "#fff" : "#inherit"}
         bgcolor={isOwn ? "#29b6f6" : "#F5F5F5"}
         borderRadius={isOwn ? "30px 30px 0px 30px" : "30px 30px 30px 0px"}
         sx={{
          padding: "1rem",
          maxWidth: "70%",
          fontSize: "14px",
          whiteSpace: 'pre-line',
          wordBreak: "break-all"
         }}>
         {message.body}
        </Typography>

        <Typography
         textAlign={isOwn ? "right" : "left"}
         sx={{
          width: "70%",
          fontSize: "10px",
          color: "gray"
         }}>
         {date}
        </Typography>
        {end && <div ref={bottomRef} />}
       </ListItem>
      )
     })}

    </List>
    <MessageForm
     messages={messages}
     setMessages={setMessages}
     roomData={roomData}
    />
    <DeleteConfirmation
     open={open}
     setOpen={setOpen}
     action={handleDeleteMessage}
    >
     メッセージを削除します
    </DeleteConfirmation>
   </Box>
  )
 } else return <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
}
