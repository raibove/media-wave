import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Box, Button, Grid, TextField } from "@mui/material";

export const TimelineCard = () => {
    return (
        <Card sx={{ display: 'flex', minWidth: 350, marginBottom:5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {/* <CardContent> */}
                    <TextField
                        id="standard-multiline-static"
                        multiline
                        defaultValue="Default Value"
                        variant="filled"
                        sx={{ml:2, mr:2, mt: 2}}
                    />
                {/* </CardContent> */}
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