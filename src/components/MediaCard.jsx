import {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import EventHeader from './EventHeader';

export default function MediaCard({data}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log('MediaCard data: ', data);

  function getCardMediaImg(){
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    let img = "";
    if (width < 500) {
      //recomendation
      img = data.images.filter((img) => {
        return img.url.includes("RECOMENDATION")
      })
    }
    else{
      //artist page
      img = data.images.filter((img) => {
        return img.url.includes("ARTIST_PAGE")
      })
    }
    return img[0].url
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


  return (
    <Card sx={{ maxWidth: 302 }} id={data.id} >
      <CardMedia
        component="img"
        height="140"
        image= {getCardMediaImg()}
        alt="event image"
      />
      <CardContent>
      <Typography sx={{ fontSize: 14, margin: 0}} color="text.secondary">
            {data.venue}
          </Typography>
        <EventHeader event={data} styleProp={{mainTitle: 'h5', subtitle: 'h7'}} />
        <Typography variant="body2" >

        </Typography>

      </CardContent>
      
      <CardActions>
        {/* <Button size="small" onClick={(e) => {console.log(e)}}>Share</Button>
        <Button size="small" onClick={(e) => {console.log(e)}}>Learn More</Button> */}
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* <Typography paragraph> </Typography>*/}
          
        </CardContent>
      </Collapse>
    </Card>
  );
}
