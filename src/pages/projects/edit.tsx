import { Edit } from "@refinedev/mui";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useCreate, useDelete, useList, useUpdate } from "@refinedev/core";

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { TimelineCard } from "../../components/timeline/card";
import { FrameResponse, IRequest } from "../../utility/types";
import { Player } from "@remotion/player";
import { MyComposition } from "../../remotion/composition/MyComposition";

export const ProjectEdit: React.FC<IResourceComponentsProps> = () => {
    const createFrame = useCreate();
    const updateFrame = useUpdate();
    const deleteFrame = useDelete();

    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        formState: { errors },
    } = useForm();

    const projectsData = queryResult?.data?.data;

    const { data } = useList<FrameResponse>({
        resource: "frames",
        filters: [
            {
                field: "project_id",
                operator: "eq",
                value: projectsData?.id,
            }
        ],
        sorters: [
            {
                field: "frame_order",
                order: "asc",
            },
        ],
    });

    const framesData = data?.data as FrameResponse[]

    const getDefaultFrameValue = () => {
        const newFrame = {
            text: 'default',
            font_size: 10,
            alignment: 'center',
            project_id: projectsData?.id,
            frame_order: framesData.length + 1,
            duration: 5,
        }
        return newFrame;
    }

    const handleAddNewFrame = () => {
        createFrame.mutate({
            resource: "frames",
            values: getDefaultFrameValue()
        });
    }

    const handleUpdateFrame = (frameId: string, key: string, value: any) => {
        const newFrameValue = { ...framesData.find((frame) => frame.id === frameId) };
        (newFrameValue as any)[key] = value;

        updateFrame.mutate({
            resource: "frames",
            values: {
                ...newFrameValue
            },
            id: frameId
        });
    }

    const handleDeleteFrame = (frameId: string) => {
        deleteFrame.mutate({
            resource: "frames",
            id: frameId,
        });
    }

    const getVideoDutation = (): number => {
        let duration = 5;
        if (framesData) {
            framesData.forEach((frame) => {
                duration += frame.duration;
            })
        }
        return duration;
    }
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
                            {framesData && framesData.map((frame) => (
                                <TimelineItem key={frame.id}>
                                    <TimelineOppositeContent color="textSecondary" minWidth={40}>
                                        {frame.duration}s
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <TimelineCard frame={frame} handleUpdateFrame={handleUpdateFrame} handleDeleteFrame={handleDeleteFrame} />
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                            <Button onClick={handleAddNewFrame}>Add new frame</Button>
                        </Timeline>
                    </Grid>
                    <Grid item xs={8} justifyContent='center' display='flex' mt={10}>
                        <Box>
                            <Player
                                component={MyComposition}
                                durationInFrames={getVideoDutation()}
                                compositionWidth={620}
                                compositionHeight={280}
                                fps={30}
                                controls
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Edit>
    );
};