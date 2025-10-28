import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // URLs to fetch
    const urls = {
      memberDistributionInTeams:
        'https://lifesupport.orbitntnu.com/api/trpc/statistics.getMemberDistributionInTeams',
      studies:
        'https://lifesupport.orbitntnu.com/api/trpc/statistics.getStudies',
      studyLevelDistribution:
        'https://lifesupport.orbitntnu.com/api/trpc/programs.publicGetStudyLevelDistribution',
      programStatistics:
        'https://lifesupport.orbitntnu.com/api/trpc/programs.getProgramStatistics',
    }

    // Fetch all in parallel
    const [memberResp, studiesResp, studyLevelResp, programStatsResp] =
      await Promise.all([
        fetch(urls.memberDistributionInTeams),
        fetch(urls.studies),
        fetch(urls.studyLevelDistribution),
        fetch(urls.programStatistics),
      ])

    // Check for any failed fetch
    if (!memberResp.ok) throw new Error('Failed fetching member distribution')
    if (!studiesResp.ok) throw new Error('Failed fetching studies')
    if (!studyLevelResp.ok)
      throw new Error('Failed fetching study level distribution')
    if (!programStatsResp.ok) throw new Error('Failed fetching program stats')

    // Parse JSON
    const [memberData, studiesData, studyLevelData, programStatsData] =
      await Promise.all([
        memberResp.json(),
        studiesResp.json(),
        studyLevelResp.json(),
        programStatsResp.json(),
      ])

    // Extract nested .result.data.json
    const data = {
      memberDistributionInTeams: memberData.result?.data?.json ?? [],
      studies: studiesData.result?.data?.json ?? [],
      studyLevelDistribution: studyLevelData.result?.data?.json ?? [],
      programStatistics: programStatsData.result?.data?.json ?? [],
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
