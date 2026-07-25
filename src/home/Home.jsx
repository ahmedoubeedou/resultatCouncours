
import Container from '@mui/material/Container';
import {logo} from "../assets/content"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect , useContext } from 'react';
import { Link } from "react-router-dom";
import {anneSelection} from "../context/Anne"
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Divider from '@mui/material/Divider';
import "./main.css";
// import {Bepc} from "./Bepc-2026";
import Card from "./Card";

export default function Home()
{
  const {filters,modifie} = useContext (anneSelection);
  console.log(filters)
  // console.log(anneSelection)
 const [number , setNumber ] = useState("")
 const [open , setOpen ] = useState(false)
 const [nom , setNom ] = useState("")
 const [anneSelectione , setAnneSelectione] = useState(filters)
 const [ListEtudient , setListEtudient] = useState(filters)
 const [numberEtudient , setNumberEtudient ]= useState(20);
 const [annee , setAnee ] = useState("2026");
  const filterNumber = (eli) => {
const test = anneSelectione.filter((el)=>{
 if(eli.target.type === "number")
 {

 return String(el.Num_Bac).startsWith(eli.target.value);
 }else{
   return String(el.Nom_FR).startsWith(eli.target.value);
 }
 
  })
  setListEtudient(test)
  setNumberEtudient(test.length)
  
  }
  function filterChange(el){
   
    if(el.target.type === "number")
   setNumber(el.target.value);
  else
    setNom(el.target.value)
   
   if(el.target.value.trim().length===0)
    {
     setNumberEtudient(20)
     setListEtudient(filters)
    }else{
      filterNumber(el)
    }
  }
  const chngeanee = (e)=>{
    modifie(e)
    setNumber("")
    setNom("")
    setOpen(false)
    setAnee(e)
     
  }
useEffect(()=>{
  setListEtudient(filters)
  setAnneSelectione(filters)
},[annee])
  const archives = ["2026","2025","2024","Brever2026"].map((e)=>{
    return <p key={e} className="text-white text-[13px] text-center" onClick={()=>{chngeanee(e)}}>{e}</p>
  })
  function openArchive()
  {
    setOpen((e)=>!e)
  }
const lists = ListEtudient.slice(0, 20).map((item, index) => (
  <Link  key={index} to={`/Detail/${item.Num_Bac}`} state={annee}>
  <div >
   
   <Card  name={item.Nom_FR} moyenn = {item.Moy_Bac.toFixed(2)}  decision={item.Decision} index={index+1}/>
   <Divider sx={{width:"98%" , color:"white",height:"5px"}} />

</div>
  </Link>

));

    return (
        <>
       
      <Container maxWidth="sm" sx={{backgroundColor:"#123",minHeight:"100vh",overflow:"hidden"}}>
        <header className='flex justify-between items-center  w-full'>
            <div className='logo-response'>
    <img src={logo} alt="" className='w-44' />
 </div>
 <div className="flex flex-col gap-3">
   <p className='text-white text-center arch m-1 ' onClick={openArchive}>Archive</p>
   <div className={`rounded-xl p-2 list-lien ${open?"block":"hidden"} arch`}>
    {archives}
    </div>
 </div>

 <h1 className='text-white titre text-center text-xl sm:text-xl'>نتائج مسابقة البكالوريا {annee}</h1>
 
        </header>
       <Paper
  component="form"
  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500, margin: "auto", marginTop: "40px", marginBottom: "40px", gap: 6, background: "#123", color: "white" }}
  className='serche'
>
  <div className='flex  m-auto flex-col items-center gap-2'>
    <label>البحث برقم المترشح</label>
    <div className='flex bg-white'>
      <InputBase
        sx={{ ml: 1, flex: 1, color: "black", backgroundColor: "white",padding:"1px 10px" }}
       placeholder="رقم المترشح"
        value={number}
        className='InputBase'
        onChange={filterChange}
        type='number'
        disabled={nom.length > 0}
      />
      <IconButton type="button" sx={{ p: '10px', color: "black" }} aria-label="بحث" >
        <SearchIcon />
      </IconButton>
    </div>
  </div>

  <div className='flex  m-auto flex-col items-center gap-2' >
    <label>البحث باسم المترشح</label>
    <div className='flex bg-white'>
      <InputBase
        sx={{ ml: 1, flex: 1, color: "black", backgroundColor: "white",padding:"1px 10px" }}
      placeholder="اسم المترشح"
        value={nom}
        onChange={filterChange}
        type='text'
        className='InputBase'
        disabled={number.length > 0}
      />
      <IconButton type="button" sx={{ p: '10px', color: "black" }} aria-label="بحث" >
        <SearchIcon />
      </IconButton>
    </div>
  </div>
</Paper>
    <main className='main'>
      <div className='flex h1 items-center gap-2 mb-4 mt-2'>
<FormatListNumberedIcon sx={{fontSize:"32px"}}/>
        <h1 className=' font-bold '>{numberEtudient === 20 ? "أفضل 20 نتيجة على المستوى الوطني":`يوجد ${numberEtudient} طالب لديه هذا الرقم `}</h1>
</div>
        {lists}
    </main>
       
      </Container>
        </>
    )
}