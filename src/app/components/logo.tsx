"use client"
import Image from 'next/image'

export default function Logo() {
    return(
        <div className="flex flex-col items-center justify-start pt-6 pb-4 px-4">
                <Image
                            src="/makasetPlace logo.jpg"
                            alt="A healthy plant"
                            width={120}
                            height={80}
                            className="rounded-lg shadow" />
              </div>
    )
}