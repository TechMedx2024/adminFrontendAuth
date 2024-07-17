import React from 'react'
import StoreProvider from './StoreProvider'

export const metadata = {
    title: "MedX Pharmacy"
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            {children}
        </html>
    )
}
