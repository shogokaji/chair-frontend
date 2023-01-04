import { useState } from "react";
import { searchUsers } from "../../api/user";
import { CircularProgress, Divider } from "@mui/material";
import { Box } from "@mui/material";
import { SearchHeader } from "../atoms/layout/SearchHeader";
import { SearchUserResult } from "../organisms/SearchUserResult";
import { SearchUserAccordion } from "../organisms/SearchUserAccordion";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export const Users = () => {
  const [users, setUsers] = useState();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const onSubmit = (data) => {
    setLoading(true);
    handleSearchUsers(data);
  }

  const handleSearchUsers = async (data) => {
    const res = await searchUsers(data);
    try {
      if (res.status === 200) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
  }

  useEffect(() => {
    handleSearchUsers({ "department": currentUser.department })
  }, [])

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <SearchHeader>ユーザーを探す</SearchHeader>
      <SearchUserAccordion open={open} setOpen={setOpen} onSubmit={onSubmit} />

      <Divider variant="middle" />

      {loading ?
        <CircularProgress sx={{ position: "absolute", right: "50%", mt: 10 }} />
        :
        users && <SearchUserResult users={users} />
      }

    </Box >
  );
}
