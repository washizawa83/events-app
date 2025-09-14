'use client'

import { useRouter } from 'next/navigation'
import { ElementRef, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: React.ReactNode
}

export const EventDetailModal = ({ children }: Props) => {
  const router = useRouter()
  const dialogRef = useRef<ElementRef<'dialog'>>(null)
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const root = document.getElementById('modal-root')
    setModalRoot(root)

    if (!dialogRef.current?.open && root) {
      dialogRef.current?.showModal()
    }
  }, [])

  function onDismiss() {
    router.back()
  }

  if (!modalRoot) {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/60" onClick={onDismiss}>
      <dialog
        ref={dialogRef}
        className="fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 overflow-hidden rounded-lg border bg-valiantDark p-0 shadow-lg duration-200"
        onClose={onDismiss}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onDismiss}
          className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-sm bg-gray-800/80 text-white opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
        >
          ✕<span className="sr-only">Close</span>
        </button>
        {children}
      </dialog>
    </div>,
    modalRoot,
  )
}
