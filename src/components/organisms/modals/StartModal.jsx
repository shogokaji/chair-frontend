import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from "@mui/material";
import { useState } from 'react';

export const StartModal = (props) => {
  const { completeSetup, open } = props;

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    activeStep === 1 ?
      completeSetup()
      :
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle>ようこそChairへ！</DialogTitle>
      <Divider />
      <DialogContent>
        {activeStep === 0 &&
          <Typography fontSize="14px" height="145px">
            <u>ご利用の前に</u><br /><br />
            ・個人が特定される情報を含む投稿には十分ご注意ください。<br /><br />
            ・相手を傷つける内容の投稿は控え、マナーを守ってのご利用をお願いいたします。<br />
          </Typography>
        }
        {activeStep === 1 &&
          <Typography fontSize="14px" height="145px" sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            最初にプロフィールを設定してみましょう。<br /><br />
            プロフィールはいつでも変更できます。<br />
          </Typography>
        }
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <MobileStepper
          variant="dots"
          steps={2}
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 400, flexGrow: 1 }}
          nextButton={
            <Button size="small" onClick={handleNext}>
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </DialogActions>
    </Dialog>
  );
}
