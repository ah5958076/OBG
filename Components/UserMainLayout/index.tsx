import React from 'react'
import UserNavBar from '@/Components/UserNavbar';
import UserLeftNav from '@/Components/UserLeftNav';
import UserRightNav from '@/Components/UserRightNav';






function index({auth, children}:any) {
    
    return (
        <>

            <UserNavBar auth={auth?true:false} />

            <div className="container">

                <UserLeftNav/>      

                <div className='main_body'>

                    {children}

                </div>

                <UserRightNav/>      

            </div>
          
        </>   
    )
}

export default index