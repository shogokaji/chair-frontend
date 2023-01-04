import { Avatar, CircularProgress, IconButton, List, ListItemButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { indexMessages } from "../../api/room";
import { departmentList } from "../../data/data";
import { MainHeader } from "../atoms/layout/MainHeader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export const MessagesIndex = () => {
   const [rooms, setRooms] = useState();
   const [loading, setLoading] = useState(true);
   const { currentUser } = useContext(AuthContext);

   const handleGetRooms = async () => {
      currentUser.isGest && navigate(-1);
      const res = await indexMessages();
      try {
         setRooms(res.data.rooms);
      } catch (err) {
         console.log(err);
      }
      setLoading(false)
   }

   const navigate = useNavigate();

   const handleBack = () => {
      navigate(-1);
   }
   const handleClickUser = async (userId) => {
      navigate(`/message/${userId}`)
   }
   useEffect(() => {
      handleGetRooms();
   }, []);

   if (!loading) {
      return (
         <Box>
            <MainHeader>
               <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={handleBack}>
                     <ArrowBackIcon />
                  </IconButton>
                  メッセージ一覧
               </Box>
            </MainHeader>
            <List>
               {
                  rooms.length == 0 ?
                     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography sx={{ textAlign: "center", mt: 3 }}>メッセージはまだありません。<br /></Typography>
                        <Typography variant="caption" sx={{ textAlign: "center", mt: 3, color: "gray", mx: 2 }}>他のユーザープロフィールから<br />メッセージを送ることができます。</Typography>
                     </Box>
                     :
                     rooms.map((item) => {
                        const { lastMessage, otherUser } = item;
                        if (!!otherUser) {
                           return (
                              <Box key={otherUser.id}>
                                 <ListItemButton sx={{ display: "flex", justifyContent: "space-between", position: "relative" }} onClick={() => handleClickUser(otherUser.id)}>
                                    <Box display="flex" alignItems="center" sx={{ flexGrow: 1, mr: 1 }}>
                                       <Avatar
                                          alt="user"
                                          src={otherUser.image.url}
                                          sx={{ width: { xs: 30, sm: 50 }, height: { xs: 30, sm: 50 }, mx: 1 }} />
                                       <Box sx={{ flexGrow: 1 }}>
                                          <Typography variant="caption">{otherUser.name}</Typography>
                                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                             <Typography fontSize="10px" color="gray" >
                                                {departmentList[otherUser.department]}
                                             </Typography>
                                             <Box sx={{ display: "flex" }}>
                                                <Typography sx={{ fontSize: { xs: "10px", sm: "12px" }, color: "gray", maxWidth: { xs: "180px", sm: "300px" } }} noWrap>
                                                   {lastMessage.body}
                                                </Typography>
                                             </Box>
                                          </Box>
                                       </Box>
                                    </Box>
                                    <Box sx={{ position: "absolute", top: 5, right: 15, display: "flex" }}>
                                       {lastMessage.userId == otherUser.id ?
                                          lastMessage.read ?
                                             <>
                                                <FiberManualRecordIcon sx={{ color: "#00FF00", fontSize: "16px" }} />
                                                <Typography fontSize="10px" color="gray">未読</Typography>
                                             </>
                                             :
                                             <Typography fontSize="10px" color="gray">既読</Typography>
                                          :
                                          <></>
                                       }
                                    </Box>
                                 </ListItemButton>
                              </Box>
                           )
                        } else return <></>
                     })}
            </List>
         </Box>
      );
   } else return <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
}
