import { Edit } from "@refinedev/mui";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useGetIdentity, useList } from "@refinedev/core";
import { IUser } from "../../components/header";
import { IRequest } from "./list";
import { useEffect } from "react";

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { TimelineCard } from "../../components/timeline/card";

export const ProjectEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const projectsData = queryResult?.data?.data;

    // const { data } = useList<IRequest>({
    //   resource: "frames",
    //   filters: [
    //     {
    //       field: "project_id",
    //       operator: "eq",
    //       value: projectsData?.id,
    //     }
    //   ],
    // });

    // const frames = data?.data;

    useEffect(() => {
        console.log(projectsData)
    }, [projectsData])
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >

                <TextField
                    {...register("name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.name}
                    helperText={(errors as any)?.name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Name"
                    name="name"
                />
                <Grid container spacing={3}>
                    <Grid item xs={4}>

                        <Timeline
                            sx={{
                                [`& .${timelineContentClasses.root}`]: {
                                    flex: 0.2,
                                },
                            }}
                        >
                            <TimelineItem>
                                <TimelineOppositeContent color="textSecondary">
                                    09:30 am
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>  
                                    <TimelineCard />
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineOppositeContent color="textSecondary">
                                    10:00 am
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <TimelineCard/>
                                </TimelineContent>
                            </TimelineItem>
                            <Button>Add new frame</Button>
                        </Timeline>
                    </Grid>
                    <Grid item xs={8}>
                        <Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Edit>
    );
};