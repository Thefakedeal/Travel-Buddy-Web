import React from 'react'
import {Layout, Menu, Typography} from 'antd'
export default function Footer() {
    return (
        <Layout.Footer className="p-0">
            <Menu  mode="horizontal"
            selectable={false}
            className="d-flex justify-content-center"
            theme="dark"
            >
                <Typography.Text className="text-white">
                    All Rights Reserved.
                </Typography.Text>
            </Menu>
        </Layout.Footer>
    )
}
