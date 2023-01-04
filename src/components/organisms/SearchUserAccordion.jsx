
import { ageList, departmentList, searchMenuProps, sexList } from "../../data/data"
import { Accordion, AccordionDetails, AccordionSummary, TextField, Tooltip } from "@mui/material";
import { Box, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useForm } from "react-hook-form";
import { SearchSubtitle } from "../molcules/SearchSubtitle";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { SubmitButton } from "../atoms/button/SubmitButton";

const sortItems = [
 { title: "診療科", register: "department", lists: departmentList },
 { title: "　性別", register: "sex", lists: sexList },
 { title: "　年代", register: "age", lists: ageList },
]

export const SearchUserAccordion = (props) => {
 const { open, setOpen, onSubmit } = props;

 const { currentUser } = useContext(AuthContext);

 const {
  register,
  handleSubmit,
  formState: { isSubmitting }
 } = useForm();

 return (
  <Accordion defaultExpanded>
   <AccordionSummary sx={{ flexGrow: 1 }} onClick={() => setOpen(!open)}>
    <SearchSubtitle accordion={true} open={open}>絞り込み検索</SearchSubtitle>
   </AccordionSummary>
   <AccordionDetails component="form">
    <Box sx={{ display: { sm: "flex" }, justifyContent: "center", gap: 1 }}>
     {sortItems.map((item, index) =>
      <Box key={item.title} sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2, gap: 1 }}>
       <Typography variant="caption">{item.title}</Typography>
       <Select
        variant="outlined"
        inputlabelprops={{ style: { fontSize: "12px" } }}
        MenuProps={searchMenuProps}
        size="small"
        defaultValue={item.register == "department" ? currentUser.department : ""}
        displayEmpty
        onChange={() => handleSubmit(onSubmit)}
        {...register(item.register)}
        sx={{ height: "30px", width: { xs: "180px", sm: index == 0 ? "180px" : "90px" }, maxWidth: "200px" }}
       >
        <MenuItem value="" >
         <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
          全て
         </Typography>
        </MenuItem>
        {item.lists.map((content, index) => (
         <MenuItem key={content} value={index} >
          <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
           {content}
          </Typography>
         </MenuItem>
        ))}
       </Select>
      </Box>
     )
     }
    </Box>
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: { xs: "column", sm: "row" }, gap: 1, mt: 3 }}>
     <Tooltip title="指定のキーワードを名前、疾患、好きなもの、プロフィールに含むユーザー検索します。空欄の場合、全てのユーザーを取得します。">
      <TextField
       label="キーワード"
       InputProps={{
        style: { fontSize: "14px" },
       }}
       InputLabelProps={{
        style: { fontSize: "14px" },
       }}
       size="small"
       variant="outlined"
       {...register("keyWord")}
       sx={{ maxWidth: "500px", minWidth: "50%", width: { xs: "80%" } }}
      />
     </Tooltip>
     <Box sx={{ width: { xs: "200px", sm: "100px" } }} >
      <SubmitButton
       onClick={handleSubmit(onSubmit)}
       loading={isSubmitting}
       children={"検索"}
      />
     </Box>
    </Box>
   </AccordionDetails>
  </Accordion >
 )
}
