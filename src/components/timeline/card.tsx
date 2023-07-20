import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Box, TextField } from "@mui/material";
import { FrameResponse } from '../../utility/types';

interface TimelineCardProps {
    frame: FrameResponse;
}

export const TimelineCard = ({ frame }: TimelineCardProps) => {
    return (
        <Card sx={{ display: 'flex', minWidth: 350, marginBottom: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <TextField
                    id="standard-multiline-static"
                    multiline
                    variant="filled"
                    value={frame.text}
                    sx={{ ml: 2, mr: 2, mt: 2 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        <SkipNextIcon />
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                        <SkipPreviousIcon />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    )
}