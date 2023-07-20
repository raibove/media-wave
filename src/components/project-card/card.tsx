import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IRequest } from "../../pages/projects/list";
import { Link } from "react-router-dom";
import { DeleteButton, EditButton, ShowButton } from "@refinedev/mui";
import MuiLink from "@mui/material/Link";

interface Props {
  project: IRequest;
}

export default function ProjectListCard({ project }: Props) {
  return (
    <Card elevation={3} sx={{ flex: 1, maxWidth: 350, minHeight: 150, minWidth: 250}}>
    <Stack justifyContent="space-between" height="100%">
      <Box p={2}>
        <MuiLink component={Link} to={`/projects/edit/${project.id}`} underline="hover">
          <Typography
            color="black"
            fontWeight="bold"
            variant="h6"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "1px",
              // You can add more custom styling properties as per your preference
            }}
          >
            {project.name}
          </Typography>
        </MuiLink>
      </Box>
      <Box display="flex" justifyContent="flex-end" pr={2} pb={2}>
        {/* Delete Icon */}
        <Tooltip title="Delete">
          <IconButton aria-label="delete" color="error">
            <DeleteButton
                hideText
                recordItemId={project.id}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Stack>
  </Card>
  );
}