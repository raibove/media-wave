import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Box, TextField } from "@mui/material";
import { FrameResponse } from '../../utility/types';
import { debounce } from 'lodash';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface TimelineCardProps {
    frame: FrameResponse;
    handleUpdateFrame: (frameId: string, key: string, value: any)=> void;
    handleDeleteFrame: (frameId: string)=> void;
}

export const TimelineCard = ({ frame, handleUpdateFrame, handleDeleteFrame }: TimelineCardProps) => {
    const [text, setText] = useState(frame.text);
    const debouncedHandleUpdateFrame = debounce(handleUpdateFrame, 1000);

    return (
        <Card sx={{ display: 'flex', minWidth: 350, marginBottom: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <TextField
                    id="standard-multiline-static"
                    multiline
                    variant="filled"
                    value={text}
                    sx={{ ml: 2, mr: 2, mt: 2 }}
                    onChange={(e) => {setText(e.target.value); debouncedHandleUpdateFrame(frame.id, 'text', e.target.value)}}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, justifyContent: 'space-around' }}>
                    <IconButton aria-label="previous">
                        <SkipNextIcon />
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                        <DeleteIcon color='error' onClick={()=>handleDeleteFrame(frame.id)}/>
                    </IconButton>
                </Box>
            </Box>
        </Card>
    )
}