import Container from '@mui/material/Container';
import { Bac } from "./archive/bac";
import { useState, useEffect } from "react";
import "./main.css";
import { useLocation } from 'react-router-dom';
// import {Bac} from "./archive/bac";
import {Bac2} from "./archive/bac2";
import {Bepc} from "./archive/Bepc-2026";
import {session} from "./archive/bacsession";
import { useParams } from "react-router-dom";
const FIELDS = [
  { key: "wilaya", label: "الولاية" },
  { key: "med", label: "المديرية" },
  { key: "cent", label: "المركز" },
  { key: "etab", label: "المؤسسة" },
  { key: "ser", label: "الشعبة" },
  { key: "date", label: "تاريخ الميلاد" },
];

export default function Detaile() {
    const location = useLocation();
    const annee = location.state ;
  const {idEtudient} = useParams();

  const [etudient, setEtudient] = useState({
    nom: "", mat: "", ser: "", date: "", wilaya: "",
    med: "", cent: "", etab: "", disc: "", moy: ""
  });

  function frk() {
    let filter = [];
    switch(annee)
{
case "2025":{
   filter = Bac.filter((el) => el.Num_Bac === Number(idEtudient));
  break;
}

case "2024":{
   filter = Bac2.filter((el) => el.Num_Bac === Number(idEtudient));
  break;
}
case "Berver2026":{
   filter = Bepc.filter((el) => el.Num_Bac === Number(idEtudient));
  break;
}
default:{
  // console.log(annee)
   filter = session.filter((el) => el.Num_Bac === Number(idEtudient));
}
}
    
    if (!filter.length) return;
    setEtudient({
      nom: filter[0].Nom_FR,
      mat: filter[0].Num_Bac,
      ser: filter[0]?.SERIE?.length > 0? filter[0].SERIE:"",
      date: filter[0].date,
      wilaya: filter[0].Wilaya_FR,
      med: filter[0].Lieun_FR,
      cent: filter[0].center,
      etab: filter[0].Etablissement_FR,
      disc: filter[0].Decision,
      moy: filter[0].Moy_Bac,
    });
  }


  useEffect(() => {
    frk();
  }, []);

  const success = `${etudient?.disc?.[0]?.toLowerCase()}${etudient?.disc?.[1]?.toLowerCase()}`;

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        overFlow:"hidden !important",
        backgroundColor: "#F6F4EE",
      }}
    >
      <div
        style={{
          width: "100%",
          background: "#FFFFFF",
          borderRadius: 20,
          border: "1px solid #E6E1D3",
          boxShadow: "0 1px 3px rgba(20,20,20,0.06)",
          overflow: "hidden !important",
          fontFamily: "'Cairo', sans-serif",
        }}
      >
        
        <div style={{ background: "#123", padding: "28px 32px", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#C9A227" }} />
          <p style={{ color: "#DDEEE6", fontSize: 19, letterSpacing: 1, margin: 0, textAlign: "center" }}>
            نتيجة شهادة البكالوريا
          </p>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 600, textAlign: "center", margin: "6px 0 0" }}>
            {etudient.nom || "—"}
          </h1>
          <p style={{ color: "#BFE3D3", fontSize: 13, textAlign: "center", margin: "4px 0 0" }}>
            رقم التسجيل : {etudient.mat}
          </p>
        </div>
        <div
          style={{
            padding: "24px 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px 24px",
          }}
        >
          {FIELDS.map((f) => (
            <div key={f.key}>
              <p style={{ margin: 0, fontSize: 11, color: "#8A8577", letterSpacing: 0.5 }}>{f.label}</p>
              <p style={{ margin: "2px 0 0", fontSize: 15, fontWeight: 500, color: "#1F2937" }}>
                {etudient[f.key] || "—"}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px dashed #E6E1D3",
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#FBFAF6",
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: 11, color: "#8A8577" }}>المعدل</p>
            <p style={{ margin: "2px 0 0", fontSize: 28, fontWeight: 700, color: "#1F2937" }}>{etudient.moy}</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: "50%",
              border: `3px solid ${success === "ad" ? "#0B6E4F" : "#B3261E"}`,
              color: success  === "ad" ? "#0B6E4F" : "#B3261E",
              fontWeight: 700,
              fontSize: 16,
              textAlign: "center",
              transform: "rotate(-8deg)",
            }}
          >
            {success === "ad" ? "🎉 ناجح" : success === "se" ? "الدورة التكميلية":"راسب"}
          </div>
        </div>
      </div>
    </Container>
  );
}