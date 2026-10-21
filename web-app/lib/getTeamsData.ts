import fs from "fs";

export async function getTeamsData() {
  try {
    const res = await fetch(
      "https://lifesupport.orbitntnu.com/api/trpc/teams.getPublicTeamPageInfo",
      { next: { revalidate: false } },
    );

    if (!res.ok) {
      console.error("Upstream error:", res.status);
      return null;
    }

    const data = await res.json();
    const teams = data.result?.data?.json ?? [];
    return JSON.parse(JSON.stringify(teams));
  } catch (err) {
    console.error("Failed to fetch teams:", err);
    return null;
  }
}

const outputFilePath: string = './app/staticData/publicTeamPageInfo.json';

export function getStaticTeamsData() {

  try{
    const json_data = JSON.parse(fs.readFileSync(outputFilePath, "utf-8"));
    return json_data;
  } catch (err) {
    console.error("Failed to fetch teams:", err);
    return null;
  }

}


function write_to_file(
  json_data: string
) {
  fs.writeFile(outputFilePath, JSON.stringify(json_data, null, 4), 'utf8', () => {
    console.log(`Data written to ${outputFilePath} as JSON.`);
  });
}