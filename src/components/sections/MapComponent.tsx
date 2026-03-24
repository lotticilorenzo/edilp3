'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { zone } from '@/data/zone'
import Link from 'next/link'

// Custom marker icon using green-mid color SVG 
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4A7C3F" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

// Fix for internal resize issue on first render sometimes
function MapResizer() {
  const map = useMap()
  useEffect(() => {
    map.invalidateSize()
  }, [map])
  return null
}

export default function MapComponent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-full h-full bg-surface animate-pulse" />

  return (
    <MapContainer 
      center={[44.8015, 10.3279]} // Parma center
      zoom={12} 
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapResizer />
      {zone.map(z => (
        <Marker key={z.id} position={[z.lat, z.lng]} icon={customIcon}>
          <Popup className="custom-popup">
            <div className="flex flex-col gap-2 min-w-[200px] p-1">
              <h3 className="font-playfair font-bold text-lg text-green">{z.nome}</h3>
              <p className="font-inter text-sm text-text-secondary leading-relaxed">
                {z.descrizione}
              </p>
              <Link 
                href={`/dove-costruiamo`}
                className="mt-2 text-sm font-medium text-accent hover:text-accent-dark transition-colors inline-block"
              >
                Scopri la zona &rarr;
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
