import createImage from "../../images/createSample.png";
import profileImage from "../../images/profileSample.png";
import diaryImage from "../../images/diarySample.png";
import { CardMedia } from "@mui/material";

export const SignInCard = () => {
 return (
  <>
   <CardMedia
    component="img"
    src={createImage}
    alt="relation image"
    sx={{
     width: "300px",
     height: "320px",
     position: "absolute",
     top: 100,
     left: 0,
     borderRadius: 3,
     transition: ".2s ease",
     "&:hover": {
      transform: "scale(1.1)"
     }
    }}
   />
   <CardMedia
    component="img"
    src={diaryImage}
    alt="relation image"
    sx={{
     width: "380px",
     height: "380px",
     position: "absolute",
     right: 15,
     top: 200,
     borderRadius: 3,
     zIndex: 200,
     transition: ".2s ease",
     "&:hover": {
      transform: "scale(1.1)"
     }
    }}
   />
   <CardMedia
    component="img"
    src={profileImage}
    alt="relation image"
    sx={{
     width: "300px",
     height: "300px",
     position: "absolute",
     left: 20,
     bottom: 50,
     borderRadius: 3,
     zIndex: 1000,
     transition: ".2s ease",
     "&:hover": {
      transform: "scale(1.1)"
     }
    }}
   />
  </>
 )
}
