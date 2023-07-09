import React from 'react'
import PersonalInfo from '@/app/components/PersonalInfo'
import TestHistory from '@/app/components/TestHistory'

export default function Personal() {
  return (
    <main className="grid grid-cols-12 px-28 w-full min-h-screen ">
      <PersonalInfo />
      <TestHistory />
    </main>
  )
}

