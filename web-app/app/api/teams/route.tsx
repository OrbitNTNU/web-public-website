import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      'https://lifesupport.orbitntnu.com/api/trpc/teams.getPublicTeamPageInfo',
      { next: { revalidate: 60 } } // cache for 60s (optional)
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    const teamsData = data.result?.data?.json ?? []

    return NextResponse.json({ teams: teamsData })
  } catch (error) {
    console.error('Error fetching teams:', error)
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    )
  }
}
