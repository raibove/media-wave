import { Edit, EditButtonProps } from "@refinedev/mui";
import { Box, Button, Grid, TextField, useScrollTrigger } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useCreate, useGetIdentity, useList } from "@refinedev/core";
import { IUser } from "../../components/header";
import { IRequest } from "./list";
import { useEffect, useState } from "react";

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { TimelineCard } from "../../components/timeline/card";
import { useUpdate } from "@refinedev/core";

const useFrameData = (projectsData: any) => {
    console.log('c 1')
    const [framesData, setFramesData] = useState<IRequest[]>([]);
    console.log(projectsData.id);
    const { data } = useList<IRequest>({
        resource: "frames",
        filters: [
            {
                field: "project_id",
                operator: "eq",
                value: projectsData.id,
            }
        ],
    });

    useEffect(() => {
        if (data?.data) {
            setFramesData(data.data);
        }
    }, [data]);
    console.log(framesData)
    return framesData;
};

export const ProjectEdit: React.FC<IResourceComponentsProps> = () => {
    // const [framesData, setFramesData] = useState<IRequest[] | null>(null);

    const createFrame = useCreate();

    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const projectsData = queryResult?.data?.data;
    const framesData = useFrameData(projectsData);

    // const frameUseForm= useForm({
    //     refineCoreProps: {
    //         resource: "frames",
    //     }
    // });

    // const frames = frameUseForm.refineCore.queryResult;
    // const framesData = frames?.data?.data;



    // const getFrameData = ()=>{
    //     const { data } = useList<IRequest>({
    //         resource: "frames",
    //         filters: [
    //           {
    //             field: "project_id",
    //             operator: "eq",
    //             value: projectsData?.id,
    //           }
    //         ],
    //       });

    //       if(data?.data)
    //       setFramesData(data.data);
    // }

    useEffect(() => {
        console.log(projectsData)
    }, [projectsData])

    // useEffect(()=>{
    //     console.log(framesData)
    // }, [framesData])

    const handleAddNewFrame = () => {
        createFrame.mutate({
            resource: "frames",
            values: {
                text: 'default',
                font_size: 10,
                alignment: 'center',
                project_id: projectsData?.id
            }
        });
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
                            {framesData.map((frame) => (
                                <TimelineItem>
                                    <TimelineOppositeContent color="textSecondary">
                                        09:30 am
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <TimelineCard frame={frame}/>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                            {/* <TimelineItem>
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
                            </TimelineItem> */}
                            <Button onClick={handleAddNewFrame}>Add new frame</Button>
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