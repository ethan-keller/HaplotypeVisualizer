import { GFA, GFAContainment, GFAHeader, GFALink, GFAPath, GFASegment } from './GFA';

class GfaParser {
  readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  parse(): GFA {
    const headers: GFAHeader[] = [];
    const segments: Record<string, GFASegment> = {};
    const links: Record<string, GFALink> = {};
    const containments: GFAContainment[] = [];
    const paths: GFAPath[] = [];

    let segmentIndex = 0;
    let linkIndex = 0;

    const fs = require('fs');
    const readline = require('readline');

    const rl = readline.createInterface({
      input: fs.createReadStream(this.filePath),
      output: process.stdout,
      terminal: false,
    });

    rl.on('line', (line: string) => {
        console.log(line);
    //   const [type, ...fields] = line.split('\t');
    //   if (type === 'H') {
    //     const { VN } = parseOptionalFields(fields);
    //     headers.push({
    //       type: 'header',
    //       index: headers.length,
    //       VN,
    //     });
    //   } else if (type === 'S') {
    //     const [name, sequence, ...optionalFields] = fields;
    //     const { LN, RC, FC, KC, SH, UR } = parseOptionalFields(optionalFields);
    //     segments[name] = {
    //       type: 'segment',
    //       index: segmentIndex++,
    //       name,
    //       sequence,
    //       length: sequence !== '*' ? sequence.length : LN,
    //       LN,
    //       RC,
    //       FC,
    //       KC,
    //       SH,
    //       UR,
    //       paths: [],
    //     };
    //   } else if (type === 'L') {
    //     const [from, fromOrient, to, toOrient, overlap, ...optionalFields] = fields;
    //     const { MQ, NM, RC, FC, KC, ID } = parseOptionalFields(optionalFields);
    //     links[`${from}${fromOrient}-${to}${toOrient}`] = {
    //       type: 'link',
    //       name: `${from}${fromOrient} \u2192 ${to}${toOrient}`,
    //       index: linkIndex++,
    //       from,
    //       fromOrient,
    //       to,
    //       toOrient,
    //       overlap,
    //       MQ,
    //       NM,
    //       RC,
    //       FC,
    //       KC,
    //       ID,
    //       paths: [],
    //     };
    //   } else if (type === 'C') {
    //     const [
    //       container,
    //       containerOrient,
    //       contained,
    //       containedOrient,
    //       pos,
    //       overlap,
    //       ...optionalFields
    //     ] = fields;
    //     const { RC, NM, ID } = parseOptionalFields(optionalFields);
    //     containments.push({
    //       type: 'containment',
    //       index: containments.length,
    //       container,
    //       containerOrient,
    //       contained,
    //       containedOrient,
    //       pos: parseInt(pos),
    //       overlap,
    //       RC,
    //       NM,
    //       ID,
    //     });
    //   } else if (type === 'P') {
    //     const [pathName, segmentNames, overlaps] = fields;
    //     paths.push({
    //       type: 'path',
    //       index: paths.length,
    //       pathName,
    //       segmentNames: segmentNames.split(','),
    //       overlaps: overlaps.split(','),
    //     });
    //   }
    });

    for (const path of paths) {
      for (let i = 0; i < path.segmentNames.length - 1; i++) {
        segments[`${path.segmentNames[i].slice(0, -1)}`]?.paths.push(path);
        links[`${path.segmentNames[i]}-${path.segmentNames[i + 1]}`].paths.push(path);
      }
      segments[`${path.segmentNames[path.segmentNames.length - 1].slice(0, -1)}`].paths.push(path);
    }
    return {
      headers,
      segments: Object.entries(segments).map((value) => value[1]),
      links: Object.entries(links).map((value) => value[1]),
      containments,
      paths,
    };
  }

  private parseOptionalFields(fields: string[]): Record<string, any> {
    const record: Record<string, number | string | number[]> = {}
    for (const field of fields) {
      const [tag, type, value] = field.split(":")
      if (type === "A" || type === "Z" || type === "H") {
        record[tag] = value
      } else if (type === "i") {
        record[tag] = parseInt(value)
      } else if (type === "f") {
        record[tag] = parseFloat(value)
      } else if (type === "J") {
        record[tag] = JSON.parse(value)
      } else if (type === "B") {
        const [numType, ...nums] = value.split(",")
        const numParser = numType !== "f" ? parseInt : parseFloat
        record[tag] = nums.map(num => numParser(num))
      }
    }
    return record
  }

  get getFilePath(): string {
    return this.filePath;
  }
}

export default GfaParser;
