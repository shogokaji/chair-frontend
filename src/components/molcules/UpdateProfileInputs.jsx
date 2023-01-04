import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Stack } from '@mui/system';
import { Box } from '@mui/material';
import { AgeInput, DepartmentInput, ProfileImageInput, SexInput, UserNameInput } from "./form/ProfileInput";
import { useState } from "react";
import { TextInput } from "./form/TextInput";

export const UpdateProfileInputs = () => {
 const { currentUser } = useContext(AuthContext);
 const { name, age, sex, department, disease, favorite, profile, image } = currentUser;
 const [preview, setPreview] = useState(image.url);
 const inputItems = [
  { role: "disease", maxLength: 25, label: "疾患名", defaultValue: disease },
  { role: "favorite", maxLength: 25, label: "好きなこと", defaultValue: favorite },
  { role: "profile", maxLength: 200, label: "プロフィール(200文字まで)", defaultValue: profile },
 ]

 return (
  <>
   <Stack spacing={2}>
    <Box sx={{ display: "flex", alignItems: "center" }} >
     <ProfileImageInput prevImage={currentUser.image.url} preview={preview} setPreview={setPreview} />
     <Box sx={{ ml: 2, flexGrow: 1, mt: { xs: 5, sm: 0 } }}>
      <UserNameInput value={name} />
      <Box sx={{ display: { xs: "none", sm: "block" }, mt: 2 }}>
       <DepartmentInput value={department} />
       <Box sx={{ mt: 2, alignItems: "end" }} >
        <SexInput value={sex} />
        <AgeInput value={age} />
       </Box>
      </Box>
     </Box>
    </Box>
   </Stack>
   <Stack spacing={3} sx={{ mt: 1 }}>
    <Box sx={{ display: { xs: "block", sm: "none" } }}><DepartmentInput value={department} /></Box>
    <Box sx={{ display: { xs: "flex", sm: "none" }, mt: 2, alignItems: "end" }} >
     <SexInput value={sex} />
     <AgeInput value={age} />
    </Box>
    {inputItems.map((item) => {
     const { role, label, defaultValue, maxLength } = item;
     return (
      <TextInput
       key={item.role}
       role={role}
       label={label}
       defaultValue={defaultValue}
       maxLength={maxLength}
      />
     )
    })
    }
   </Stack>
  </>
 );
}
