import React, { useState } from "react";
import { CreateButton, List } from "@refinedev/mui";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { Box, Typography, Stack, CircularProgress } from "@mui/material";
import ProjectListCard from "../../components/project-card/card";
import { IUser } from "../../components/header";
import { useGetIdentity } from "@refinedev/core";
import { RequestCreate } from "./create";

export interface IRequest {
    id: string;
    name: string;
    created_at: string;
    user_id: string;
}

export const ProjectList: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity<IUser>();

  
  const { data } = useList<IRequest>({
    resource: "projects",
    queryOptions: {
      enabled: !!user,
    },
    filters: [
      {
        field: "user_id",
        operator: "eq",
        value: user?.id,
      },
    ],
  });

  const requests = data?.data;

  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
    <List>
      {requests ? (
        requests.length > 0 ? (
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
            {requests.map((req) => (
              <ProjectListCard key={req.id} project={req} />
            ))}
          </Box>
        ) : (
          <Box
            padding={2}
            bgcolor="action.hover"
            borderRadius={2}
            minHeight={200}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Stack gap={4} alignItems="center">
              <Typography color="palette.text.primary">
                No Project. You can start creating one by clicking the
                "Create" button.
              </Typography>
              <CreateButton onClick={handleModalOpen}/>
            </Stack>
          </Box>
        )
      ) : (
        <Box
          padding={2}
          bgcolor="action.hover"
          borderRadius={2}
          minHeight={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      )}
    </List>
    <RequestCreate isModalOpen={isModalOpen} handleModalClose={handleModalClose} />
    </>
  );
};

  