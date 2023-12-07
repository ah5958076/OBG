import React from 'react'

function Dashboard() {
    return (
        <>
            
            
            <nav className="right-nav">
                
                <div className="public-private">
                    <a className="active" href="#" onClick={()=>{"toggleChats('chats', 'public-chats'); this.parentElement.children[0].classList.add('active'); this.parentElement.children[1].classList.remove('active')"}}>Private</a>
                    <a href="#" onClick={()=>{"toggleChats('public-chats', 'chats'); this.parentElement.children[0].classList.remove('active'); this.parentElement.children[1].classList.add('active')"}}>Public</a>

                </div>

                <div className="top">
                    
                    <span>
                        <i className="fa-solid fa-angle-right"></i>
                    </span>
                    <div className="search">
                        <i className="fa-solid fa-magnifying-glass" style={{"color": "#707070"}}></i>
                        <input  type="text" placeholder="search"/>
                    </div>
                    <img src="./images/Mask Group 281@2x.png" alt=""/>
                </div>
                
                <div className="chats" id="chats">
                    <a href="#" onClick={()=>{"open_chat(event)"}}>
                        <span><img src="./images/Ellipse 5@2x.png" alt=""/></span>
                        <p>Random</p>
                    </a>
                    <a href="#" onClick={()=>{"open_chat(event)"}}>
                        <span><img src="./images/Delta Babes.png" alt=""/></span>
                        <p>Random</p>
                    </a>
                    <a href="#" onClick={()=>{"open_chat(event)"}}>
                        <span><img src="./images/Dr pickachu (1).png" alt=""/></span>
                        <p>Random</p>
                    </a>
                    <a href="#" onClick={()=>{"open_chat(event)"}}>
                        <span><img src="./images/Gamer Girl (1).png" alt=""/></span>
                        <p>Random</p>
                    </a>
                    <a href="#" onClick={()=>{"open_chat(event)"}}>
                        <span><img src="./images/Dr pickachu (1).png" alt=""/></span>
                        <p>Random</p>
                    </a>
                </div>
                

                <div className="public-chats" id="public-chats">
                    <div className="main-public-chats">
                        
                    <div className="group-message">
                        <span  className="border"><img src="./images/Ellipse 5.png" alt=""/></span>
                        <div className="name-time">
                            <a  href="#" id="green" >Nymo  <span id="small-gray-time">Yesterday at 1:20 PM</span></a>
                            <p>Hyy! New Message</p>
                        </div>
                    </div>
                    <div className="group-message">
                        <span  className="border" ><img src="./images/Ellipse 5.png" alt=""/></span>
                        <div className="name-time">
                            <a  href="#" id="orange">Dynamo <span id="small-gray-time">Yesterday at 1:20 PM</span></a>
                            <p>Hyy! New Message</p>
                        </div>
                    </div>
                    <div className="group-message">
                        <span  className="border"><img src="./images/Ellipse 5.png" alt=""/></span>
                        <div className="name-time">
                            <a  href="#" id="red">Gamer  <span id="small-gray-time">Yesterday at 1:20 PM</span></a>
                            <p>Hyy! New Message</p>
                        </div>
                    </div>

                    <div className="divider">Today</div>                             

                    <div className="group-message">
                        <span  className="border" ><img src="./images/Ellipse 5.png" alt=""/></span>
                        <div className="name-time">
                            <a  href="#" id="orange">Dynamo <span id="small-gray-time">Yesterday at 1:20 PM</span></a>
                            <p>Hyy! New Message</p>
                        </div>
                    </div>
                    <div className="group-message">
                        <span  className="border"><img src="./images/Ellipse 5.png" alt=""/></span>
                        <div className="name-time">
                            <a  href="#" id="red">Gamer<span id="small-gray-time">Yesterday at 1:20 PM</span></a>
                            <p>Hyy! New Message</p>
                        </div>
                    </div>
                    </div>

                    <div className="right-eye-chat">
                        
                    <button className="eye-button" id="eye-button"  onClick={()=>{"hideShow()"}}><i className="fa-solid fa-eye-slash"></i></button>
                    <div className="eye-chats" id="eye-chats" >
                        <a href="#" ><img src="./images/Dr pickachu (1).png" alt=""/></a>
                        <a href="#"><img src="./images/Gamer Girl (1).png" alt=""/></a>
                        <a href="#"><img src="./images/Ellipse 5.png" alt=""/></a>
                        <a href="#"><img src="./images/Dynamo large.png" alt=""/></a>
                    </div>
                    </div> 
                </div>

            </nav>


            {/* <div className="container">

                <div className="tournaments">
                    <span style={{"fontWeight": "bold"}}>Games</span> 
                    <div className="tournament-buttons">
                        <a href="#" id="active1">All</a>
                        <a href="./Tournaments.html">Tournaments</a>
                        <a href="#">Ladders Standings</a>
                    </div>       
                </div>
            

                <div className="cards">
                    <div className="card-line">
                    <!--  -->
                    <div className="card">
                        <img src="./images/Unchartter.png" width="160x" height="160px" alt="">
                        <span>UNCHARTED</span>
                    </div>
                    
                    <div className="card">
                        <img src="./images/Counter Strike.png" width="160x" height="160px" alt="">
                        <span>STRIKE</span>
                    </div>
                    
                    <div className="card">
                        <img src="./images/Dota2.png" width="160x" height="160px" alt="">
                        <span>DOTA2</span>
                    </div>
                    
                    <div className="card">
                        <img src="./images/Fifa.png" width="160x" height="160px" alt="">
                        <span>FIFA</span>
                    </div>
                    
                    <div className="card">
                        <img src="./images/For Honor.png" width="160x" height="160px" alt="">
                        <span>HONOR</span>
                    </div>
                    
                        <div className="card">
                        <img src="./images/Dota2.png" width="160x" height="160px" alt="">
                        <span>DOTA2</span>
                    </div>
                    
                    <div className="card">
                        <img src="./images/Forza Horizon.png" width="160x" height="160px" alt="">
                        <span>HONOR</span>
                    </div>
                    
                        <div className="card">
                        <img src="./images/Fifa.png" width="160x" height="160px" alt="">
                        <span>FIFA</span>
                    </div>
                    
                    <div className="card">
                        <img src="./images/Forza Horizon.png" width="160x" height="160px" alt="">
                        <span>HONOR</span>
                    </div>
                    
                        <div className="card">
                        <img src="./images/Unchartter.png" width="160x" height="160px" alt="">
                        <span>UNCHARTED</span>
                    </div>
                    

                        <div className="card">
                        <img src="./images/Counter Strike.png" width="160x" height="160px" alt="">
                        <span>STRIKE</span>
                    </div>
                    

                        <div className="card">
                        <img src="./images/Dota2.png" width="160x" height="160px" alt="">
                        <span>DOTA2</span>
                    </div>
                    <!--  -->
                    <div className="card">
                        <img src="./images/For Honor.png" width="160x" height="160px" alt="">
                        <span>HONOR</span>
                    </div>
                    <!--  -->
                            <!--  -->
                            <div className="card">
                            <img src="./images/Unchartter.png" width="160x" height="160px" alt="">
                            <span>UNCHARTED</span>
                        </div>
                        <!--  -->
                    <!--  -->
                    <div className="card">
                        <img src="./images/For Honor.png" width="160x" height="160px" alt="">
                        <span>HONOR</span>
                    </div>
                    <!--  -->
                        <!--  -->
                        <div className="card">
                        <img src="./images/Fifa.png" width="160x" height="160px" alt="">
                        <span>FIFA</span>
                    </div>
                    <!--  -->
                    <div className="card">
                        <img src="./images/For Honor.png" width="160x" height="160px" alt="">
                        <span>HONOR</span>
                    </div>
                    <!--  -->
                        <!--  -->
                        <div className="card">
                        <img src="./images/Counter Strike.png" width="160x" height="160px" alt="">
                        <span>STRIKE</span>
                    </div>
                    <!--  -->
                    
                    
                    </div>
                    <!-- Line -->
                </div>
        
            </div> */}



            {/* <div className="dialogs">
                <div className="dialog" id="withdraw-amount">
                    <form action="#" method="post">
                        <div className="main">
                            <p>Withdraw Amount</p>
                            <img src="./images/paypal.png" alt="">
                            <input type="text" placeholder="Full Name*">
                            <input type="text" placeholder="Email*">
                            <input type="text" placeholder="Address*">
                            <input type="text" placeholder="Enter Amount*">

                            <div className="confirm-btns">
                                <button className="active" type="submit">WITHDRAW</button>
                            </div>
                        </div>
                    </form>
                </div>
                    

                <div className="dialog" id="add-credits">
                    <form action="#" method="post">
                        <div className="main">
                            <p>Add Credits</p>
                            <img src="./images/paypal.png" alt="">
                            <input type="text" placeholder="Enter Amount*">

                            <div className="confirm-btns">
                                <button className="active" type="submit">ADD</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div> */}

        
        </>
    )
}

export default Dashboard;   