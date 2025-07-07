'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SetupToken() {
  const [status, setStatus] = useState('認証処理中...')
  const router = useRouter()

  useEffect(() => {
    const setupAuthToken = async () => {
      try {
        setStatus('トークンを生成中...')

        // JWTトークンを生成
        const response = await fetch('/api/auth/token', {
          method: 'POST',
        })

        if (response.ok) {
          setStatus('認証完了')
          // ホームページにリダイレクト
          router.push('/')
        } else {
          setStatus('認証エラーが発生しました')
          console.error('Token generation failed')
        }
      } catch (error) {
        setStatus('認証エラーが発生しました')
        console.error('Auth setup error:', error)
      }
    }

    setupAuthToken()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
        <p>{status}</p>
      </div>
    </div>
  )
}
