import React from 'react'
import {Layout} from 'antd'
import Navbar from '../Navbar'
import Footer from '../Footer'
export default function HomeLayout({children}) {
    return (
       <Layout style={layout} >
         <Navbar />
         <Layout.Content style={{ flex: 1, display:"flex", flexDirection:"column"}}>{children}</Layout.Content>
         <Footer/>
       </Layout>
    )
}

const layout = 
    {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    }