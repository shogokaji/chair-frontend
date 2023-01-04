import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import { AuthHeader } from "../atoms/layout/AuthHeader";
export const NotFound = () => {
 return (
  <>
   <AuthHeader />
   <Box sx={{ pt: { xs: 12, sm: 30 }, px: 10 }}>
    <Typography variant="h1">404 Not Found</Typography>
    <Typography variant="p">お探しのページは一時的にアクセスができない状況にあるか、移動もしくは削除された可能性があります。</Typography>
    <Box>
     <Typography variant="p">また、URL、ファイル名にタイプミスがないか再度ご確認ください。</Typography>
    </Box>
    <Link to="/">トップへ戻る</Link>
   </Box>
  </>
 );
}
