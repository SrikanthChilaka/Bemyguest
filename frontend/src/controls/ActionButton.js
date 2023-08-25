import {Button,makeStyles} from "@material-ui/core";

const useStyles = makeStyles( theme => ({
   root : {
      minWidth: 0,
      padding: theme.spacing(0.5)
   },
   close: {
      backgroundColor: theme.palette.error.light,
      '& .MuiButton-label' : {
         color : theme.palette.error.main
      },
      borderRadius: "0"
   },
   headerTopRight:{
      position: 'absolute',
      top: 0,
      right: 0,
   },
   primary: {
      backgroundColor: theme.palette.primary.light,
      '& .MuiButton-label' : {
         color : theme.palette.primary.secondary
      },
   }
}));

export default function ActionButton(props){

   const { color,position, children, onClick } = props;
   const classes = useStyles();
   return <Button onClick = {onClick} className = {`${classes.root} ${classes[color]} ${classes[position]}`} >
            {children}
          </Button>
}