import LoadingButton from "@mui/lab/LoadingButton";

export const SubmitButton = (props) => {
 const { loading, onClick, children } = props;
 return (
  <LoadingButton
   type="submit"
   variant="contained"
   onClick={onClick}
   loading={loading}
   fullWidth
  >
   {children}
  </LoadingButton>
 )
}
