export interface IRequest {
    id: string;
    name: string;
    created_at: string;
    user_id: string;
}

export interface FrameResponse {
    from: any;
    id: string;
    created_at: string;
    alignment:string;
    background_color:string;
    background_type: string;
    font_family:string;
    font_size:number;
    project_id: number;
    text: string;
    text_color: string;
    frame_order: number;
    duration: number;
}