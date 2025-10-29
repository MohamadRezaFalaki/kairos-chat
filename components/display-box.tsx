"use client"

import { useEffect, useState } from "react"
import { Typewriter } from "react-simple-typewriter"

interface DisplayBoxProps {
    backgroundColor: string
    text: string
}

export function DisplayBox({ backgroundColor, text }: DisplayBoxProps) {
    const [currentBgColor, setCurrentBgColor] = useState("white")
    const [key, setKey] = useState(0)

    useEffect(() => {
        setCurrentBgColor(backgroundColor)
    }, [backgroundColor])

    useEffect(() => {
        setKey(prev => prev + 1)
    }, [text])

    return (
        <div
            className="fixed bottom-6 right-6 w-64 h-32 rounded-lg flex items-center justify-center text-center p-4 transition-colors duration-1000 ease-in-out z-50"
            style={{ backgroundColor: currentBgColor }}
        >
            <p className="text-lg font-medium text-gray-800 break-words">
                <span key={key}>
                    <Typewriter
                        words={[text]}
                        loop={1}
                        cursor={false}
                        typeSpeed={2000 / Math.max(text.length, 1)}
                        deleteSpeed={Infinity}
                    />
                </span>
            </p>
        </div>
    )
}