import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Header } from "../atoms/layout/Header";
import { SideBar } from "../organisms/SideBar";
import { Box, Paper } from "@mui/material";
import { DiaryForm } from "../organisms/modals/DiaryForm";
import { SuccessAlert } from "../molcules/alert/SuccessAlert";
import { AlertContext } from "../../providers/AlertProvider";
import { ErrorAlert } from "../molcules/alert/ErrorAlert";
import { useLocation } from "react-router-dom";

export const HomeLayout = ({ children }) => {
      const { currentUser } = useContext(AuthContext);
      const [isFirstLogin, setIsFirstLogin] = useState(false);
      const [isOpen, setIsOpen] = useState(false);
      const { alertMessage, isOpenSuccess, isOpenError, setIsOpenSuccess } = useContext(AlertContext);

      const location = useLocation().pathname

      const handleAlert = () => {
            setIsOpenSuccess(false);
      }

      useEffect(() => {
            //  !currentUser.isSetup && setIsFirstLogin(true) 
            handleAlert()
      }, [location]);

      return (
            <Box sx={{
                  height: "100vh", display: "flex", flexDirection: "column", width: "100%",
                  bgcolor: "#FFFAF0"
            }}>
                  <Header />
                  <Box sx={{ pt: { xs: 5, sm: 6.5 }, mx: { sm: 2, lg: 12 }, mt: 1, }}>
                        <SideBar
                              setIsOpen={setIsOpen} />
                        <Paper sx={{
                              mt: 1,
                              ml: { md: 40 },
                              flexGrow: 1,
                              borderRight: { md: "0.5px solid silver" },
                              height: { xs: "92vh", sm: "90vh" },
                              overflowY: "scroll",
                              position: "relative",
                              bgcolor: " #fafafa",
                        }}>
                              {children}
                        </Paper>
                        {isOpenSuccess && <SuccessAlert>{alertMessage}</SuccessAlert>}
                        {isOpenError && <ErrorAlert>{alertMessage}</ErrorAlert>}
                        <DiaryForm isOpen={isOpen} setIsOpen={setIsOpen} role={"作成"} />
                  </Box>
            </Box >
      );
}
