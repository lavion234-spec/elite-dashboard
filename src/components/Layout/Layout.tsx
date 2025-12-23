import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import CommandPalette from '../CommandPalette'
import { useState, useEffect } from 'react'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <div className="min-h-screen transition-colors relative overflow-hidden">
        {/* Background Gradient Glow */}
        <div className="fixed inset-0 bg-gradient-glow pointer-events-none" />
        
        <Sidebar isOpen={sidebarOpen} />
        
        <div className={`transition-all duration-300 relative z-10 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <Header 
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            onCommandPalette={() => setCommandPaletteOpen(true)}
          />
          
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <CommandPalette 
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  )
}

