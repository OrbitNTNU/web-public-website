import path from "path";
import fs from "fs";
import * as d3 from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryObject } from "topojson-specification";
const worldDataPath = path.join(process.cwd(), "public", "110m.json");

const worldDataJson = JSON.parse(fs.readFileSync(worldDataPath, "utf8"));

const worldData = worldDataJson as unknown as Topology;
const land = feature(worldData, worldData.objects.land as GeometryObject);

function generatePoints(pointCount: number) {
  const pts: { x: number; y: number; z: number }[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < pointCount; i++) {
    const y = 1 - (i / (pointCount - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    const lat = (-Math.asin(y) * 180) / Math.PI;
    const lon = (Math.atan2(z, x) * 180) / Math.PI;

    const isLand = d3.geoContains(land, [lon, lat]);

    if (isLand) {
      pts.push({ x, y, z });
    }
  }

  return pts;
}

const POINT_COUNT = 5000;

const points = generatePoints(POINT_COUNT);

fs.writeFileSync("public/globe-points.json", JSON.stringify(points));

