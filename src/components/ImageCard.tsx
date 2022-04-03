import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ERROR_IMAGE = 'data:image/png;base64,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'

export interface ImgMediaCardProps {
    name: string;
    type: string;
    size: number;
    link: string;
}

export default function ImgMediaCard({
    name, type, size, link
}: ImgMediaCardProps) {
    const [initImage, setInitImage] = React.useState(link)

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                // alt="green iguana"
                height="140"
                image={initImage || ERROR_IMAGE}
                onClick={()=>{
                    setInitImage(ERROR_IMAGE)
                }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span>{type}</span> - <span>{size}k</span>
                    <br />
                    <span>{link}</span>
                </Typography>
            </CardContent>
        </Card>
    );
}
