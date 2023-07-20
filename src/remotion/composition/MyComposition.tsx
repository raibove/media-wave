import React, { useEffect, useState } from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { FrameResponse } from "../../utility/types";

interface MyCompositionProps {
    data: FrameResponse[]
}

interface frameTimeDetailProp {
    id:string,
    from: number,
    duration: number
}

export const MyComposition: React.FC<MyCompositionProps> = ({ data }) => {
    const frame = useCurrentFrame();
    const [timeDetails, setTimeDetails] = useState<frameTimeDetailProp[]>([]);
    // const timeDetails:frameTimeDetailProp[] = [];

    const getStartTime = (frameId: string)=>{
        return timeDetails.find((frameTimeDetail)=> frameTimeDetail.id === frameId)?.duration || 0
    }

    useEffect(()=>{
        const newTimeDetails : frameTimeDetailProp[]= []
        data.forEach((frameContent)=>{
            console.log(newTimeDetails)
            const frameTimeDetail: frameTimeDetailProp = {
                id: frameContent.id,
                duration: frameContent.duration,
                from: newTimeDetails.length!==0 ? newTimeDetails[newTimeDetails.length - 1].from : 0
            }

            newTimeDetails.push(frameTimeDetail);
        })
        // setTimeDetails(newTimeDetails);
        console.log(timeDetails)
    }, [data])

    const getCurrentScreenFrom = (frameContent: frameTimeDetailProp, currentIndex: number) => {
        // Calculate 'from' value for the first frame as 0.
        if (currentIndex === 0) {
          return 0;
        }
    
        // For subsequent frames, set 'from' based on the previous 'from' + previous frame's duration.
        const previousFrameDuration = data[currentIndex - 1].duration;
        return data[currentIndex - 1].from + previousFrameDuration;
      };

      data.forEach((frameContent, idx) => {
        frameContent.from = getCurrentScreenFrom(frameContent, idx);
      });
    
    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                fontSize: 100,
                backgroundColor: "white",
            }}
        >
            {data.map((frameContent, idx)=>(
                <Sequence durationInFrames={frameContent.duration} key={frameContent.id} from={frameContent.from}>
                <AbsoluteFill> 
                    {frameContent.text}
                </AbsoluteFill>
                </Sequence>
            ))}
            {/* The current frame is {frame}. */}
        </AbsoluteFill>
    );
};