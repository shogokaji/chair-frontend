import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { followUser, unFollowUser } from "../../../api/relationship";
import { Button, Typography, } from "@mui/material";

export const FollowButton = (props) => {
 const { user, setUser } = props;
 const [isFollow, setIsFollow] = useState();
 const { currentUser, setCurrentUser } = useContext(AuthContext);

 //多重クリックを防ぐ
 const [loading, setLoading] = useState(false);

 const handleFollow = async () => {
  setLoading(true)
  const res = await followUser(user)
  try {
   if (res.status === 200) {
    setIsFollow(true);
    setCurrentUser(currentUser => ({ ...currentUser, follows: res.data.currentUser }))
    setUser(user => ({ ...user, followers: res.data.user }))
   }
  } catch (err) {
   console.log(err);
  }
  setLoading(false);
 }

 const handleUnFollow = async () => {
  setLoading(true)
  const res = await unFollowUser(user.id)
  try {
   if (res.status === 200) {
    setIsFollow(false);
    setCurrentUser(currentUser => ({ ...currentUser, follows: res.data.currentUser }))
    setUser(user => ({ ...user, followers: res.data.user }))
   }
  } catch (err) {
   console.log(err);
  }
  setLoading(false);
 }

 //currentUserがフォローしているかどうかを判定
 useEffect(() => {
  setIsFollow(currentUser.follows.some(followedUser => followedUser.id == user.id))
 }, [user]);

 return (
  <Button
   onClick={isFollow ? handleUnFollow : handleFollow}
   variant={isFollow ? "contained" : "outlined"}
   size="small"
   fullWidth
   disabled={loading}
   sx={{ py: { sm: 1 } }}
  >
   <Typography sx={{ fontSize: { xs: "10px", sm: "12px" } }}>
    {isFollow ? "フォロー中" : "フォロー"}
   </Typography>
  </Button>
 );
}
