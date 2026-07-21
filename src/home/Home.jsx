
import Container from '@mui/material/Container';
import {logo} from "../assets/content"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Divider from '@mui/material/Divider';
import "./main.css";
import {Bepc} from "./Bepc-2026";
import Card from "./Card";
export default function Home()
{
   
  const filters =  [...Bepc].sort((a, b) => {
        return  b.Moyg - a.Moyg 
  });
 const [number , setNumber ] = useState("")
 const [ListEtudient , setListEtudient] = useState(filters)
 const [numberEtudient , setNumberEtudient ]= useState(20);
  const filterNumber = (eli) => {
const test = Bepc.filter((el)=>{
 
  return String(el.Numer).startsWith(eli);
  })
  setNumberEtudient(test.length)
  setListEtudient(test)
  }
  function filterChange(el){
   setNumber(el);
   
   if(el.trim().length===0)
    {
      console.log("oui")
      setListEtudient(filters)
     setNumberEtudient(20)
    }else{
      filterNumber(el)
    }
  }
const lists = ListEtudient.slice(0, 20).map((item, index) => (
  <div key={index}>
   <Card  name={item.NOM} moyenn = {item.Moyg.toFixed(2)}  decision={item.Decision} index={index+1}/>
   <Divider sx={{width:"98%" , color:"white",height:"5px"}} />
</div>
));

    return (
        <>
       
      <Container maxWidth="sm" sx={{backgroundColor:"#123",minHeight:"100vh"}}>
        <header className='flex justify-between items-center  w-full'>
            <div className=''>
    <img src={logo} alt="" className='w-44' />
 </div>
 <h1 className='text-white text-center text-xl sm:text-4xl'>Resultat Councours </h1>
 
        </header>
         <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 , margin:"auto" , marginTop:"40px",marginBottom:"40px"}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Par Matricule"
        value={number}
        onChange={(e)=>{filterChange(e.target.value)}}
        type='number'
        
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={filterNumber}>
        <SearchIcon />
      </IconButton>   
    </Paper>
    <main className='main'>
      <div className='flex items-center gap-2 mb-4 mt-2'>
<FormatListNumberedIcon sx={{fontSize:"32px"}}/>
        <h1 className=' font-bold'>{numberEtudient === 20 ? "List du 20 primer etudient un mauritanie[D or C ..]":`elle existe ${numberEtudient} qui on cette Id`}</h1>
</div>
        {lists}
    </main>
       
      </Container>
        </>
    )
}