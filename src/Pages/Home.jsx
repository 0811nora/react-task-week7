import bannerImg from '../assets/img/banner-3.png';
import MenuBtn from '../components/MenuBtn';
import PageTransition from "../components/PageTransition";
import { userCheck } from '../api/Api';
import { useEffect } from 'react';



function Home(){

    useEffect(() => {
        const checkUserState = async () =>{
            await userCheck();
        }
        checkUserState();
    })

    return (<>
        <PageTransition>
            
            <main className="home_main">
                <div className="bg-primary">
                    <div className="container pb-5">
                        <div className="banner position-relative "style={{height:"750px"}}>
                            <h1 className="position-absolute top-0 start-50 translate-middle-x z-1 text-center fw-bolder py-3 w-100"   >
                                <span className="text-white" style={{fontSize:"100px"}}>此刻</span>
                                <span style={{fontSize:"180px"}}>來點甜</span>
                                <span className='text-white' style={{fontSize:"100px"}}>?</span>
                            </h1>
                            <div className='position-absolute bottom-0 start-50 translate-middle-x pb-5'style={{
                                maxWidth:"800px",
                                width:"100%"}}>
                                <img src={bannerImg} alt="" className='w-100 h-100'/>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="my-5 " >
                    <div className='position-relative 'style={{height:"750px"}}>
                        <div className='bg-primary position-absolute top-0 start-0 ' 
                            style={{width:"40%",height:"750px",zIndex:"-1"}}>
                        </div>

                        <div className='container'>
                            <h2 className='text-white fw-bolder d-inline-block mt-5 bg-dark px-5 shadow' 
                                style={{fontSize:"180px"}}>NOW</h2>
                            
                            <div className='my-5'>
                                <MenuBtn/>
                            </div>
                            
                            <div className='text-end '>
                                <h2 className='ms-auto bg-primary d-inline-block text-white fw-bolder mt-3 py-3 px-5 shadow position-relative' style={{fontSize:"150px"}}>微甜時刻
                                    <span className='text-dark position-absolute' style={{fontSize:"150px", top:"20px", left:"40px"}}>
                                        微甜時刻
                                    </span>
                                </h2>
                            </div>
                            
                        </div>
                    </div>


                    
                    
                </div>
            </main>
        </PageTransition>
    </>)
}

export default Home;