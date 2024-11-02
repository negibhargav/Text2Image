import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState , useEffect } from 'react';


export default function Container({prompt,response, statusCode}){
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (statusCode === 200 && response) {
            const { TimeTaken, image_path } = response;
            setImageSrc(`${image_path}?t=${new Date().getTime()}`);
        }
    }, [response, statusCode]); 
    if(statusCode==200){
        const {TimeTaken,image_path,message}= response;
    
    return(
        <>
            <Card sx={{ maxWidth: 700 }}>
      <CardMedia
        sx={{ height: 350 }}
        image={imageSrc}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {prompt}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Model takes around {TimeTaken} seconds to complete your query
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Download</Button>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
        </>
    )
}else{
    return(
        <>
        </>
    )
}
}