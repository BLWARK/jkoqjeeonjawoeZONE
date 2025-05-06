import React  from "react";
import Headline from "@/components/page-components/headline/Headline";
import PilihanEditor from "@/components/page-components/pilihan-editor/topEditorChoice/PilihanEditor"
import LatestNews from "@/components/page-components/latestNews/LatestNews";
import PopularNews from "@/components/page-components/popularNews/PopularNews";
import Xyzonetv from "@/components/page-components/xyzonetv/Xyzonetv";
import Hiburan from "@/components/page-components/hiburan/Hiburan";
import Teknologi from "@/components/page-components/teknologi/Teknologi"
import Sport from "@/components/page-components/sport/Sport"
import Lifestyle from "@/components/page-components/gayaHidup/GayaHidup"
import Subscribe from "@/components/page-components/subscribe-sect/Subscribe"
// import Link from "next/link";

// import Image from "next/image";

const HomePage = () => {
  // const [showAd, setShowAd] = useState(true);

  return (
    <div className="w-full h-full  text-black ">
      <section className="headline 2xl:px-0 px-3"><Headline/></section>
      <section className="pilihan-editor 2xl:px-0 px-3"><PilihanEditor/></section>
      <section className="pppular-news 2xl:px-0"><PopularNews/></section>
      <section className="latest-news 2xl:px-0 px-3"><LatestNews platformId={1}/></section>
      
      <section className="teknologi 2xl:px-0 xl:px-0 lg:px-0  px-0"><Teknologi/></section>
      <section className="gaya-hidup 2xl:px-0 px-3"><Hiburan/></section>
      <section className="sport 2xl:px-0 px-3"><Sport/></section>
      
      <section className="gaya-hidup 2xl:px-0 px-3"><Lifestyle/></section>
      <section className="XYZONETV 2xl:px-0 px-0"><Xyzonetv/></section>
      
      
      
      <section className="subscribe 2xl:px-0 xl:px-0 lg:px-0 px-0"><Subscribe/></section>
     
    </div>
  );
};

export default HomePage;
