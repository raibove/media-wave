import React, { useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Modal, // Import the Modal component from Material-UI
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useGetIdentity } from "@refinedev/core";
import { IUser } from "../../components/header";
import { FieldValues } from "react-hook-form";

interface RequestProp {
    isModalOpen: boolean;
    handleModalClose: ()=> void;
}

export const RequestCreate : React.FC<RequestProp> = ({isModalOpen, handleModalClose}) => {
  const { data: user } = useGetIdentity<IUser>();

  const {
    refineCore: {  onFinish },
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();



  const handleCreateRequest = async (values: FieldValues) => {
    try {
      await onFinish({ ...values, user_id: user!.id });
      handleModalClose();
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    setValue("name", "");
  }, [setValue]);

  return (
    <>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create Project
          </Typography>
          <form onSubmit={handleSubmit(handleCreateRequest)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("name", {
                    required: "This field is required",
                  })}
                  error={!!(errors as any)?.name}
                  helperText={(errors as any)?.name?.message}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label="Name"
                  name="name"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  Create Project
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};
