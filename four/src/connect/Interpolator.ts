import { CellInfo } from "thebe-core/dist/store/cells";
import JSON5 from "json5";

enum VariableMapKind {
  "param" = "param",
  "output" = "output",
}

export interface VariableMapInfo {
  name: string;
  kind: VariableMapKind;
  initial?: string | number | boolean;
  metadata?: Record<string, any>;
}

const REGEX_PARAM = "(.*)#\\s*@param(.*)";
const REGEX_ASSIGNMENT = "(.*)=(.*[^;])[;]*";
const REGEX_OUTPUT = "(.*)#\\s*@output(.*)";

export type VariableMap = Record<string, VariableMapInfo>;
export type ValueMap = Record<string, string | number | boolean>;

function parseLine(source: string, kind: VariableMapKind, REGEX_KIND: string) {
  return source.split("\n").reduce((mapping, line) => {
    const match = line.match(REGEX_KIND);
    if (match) {
      const [_, assignment, maybeMetadata] = match;
      let metadata;
      try {
        metadata = JSON5.parse(maybeMetadata);
      } catch (err) {}

      const assignmentMatch = assignment.match(REGEX_ASSIGNMENT);
      if (assignmentMatch) {
        let [_, name, value] = assignmentMatch;
        name = name.trimStart().trimEnd();
        value = value.trimStart().trimEnd().replace(";", "");
        const maybeNumber = parseFloat(value);
        let maybeBoolean;
        if (value.toLowerCase() === "true") maybeBoolean = true;
        else if (value.toLowerCase() === "false") maybeBoolean = false;

        let initial;
        if (!isNaN(maybeNumber)) initial = maybeNumber;
        else if (maybeBoolean !== undefined) initial = maybeBoolean;
        else initial = value;

        const item: VariableMapInfo = {
          name,
          kind,
          initial,
        };
        if (metadata) item.metadata = metadata;
        return { ...mapping, [name]: item };
      }
    }
    return mapping;
  }, {});
}

class Interpolator {
  mapping?: VariableMap;

  static parseSource(source: string) {
    const params = parseLine(source, VariableMapKind.param, REGEX_PARAM);
    const outputs = parseLine(source, VariableMapKind.output, REGEX_OUTPUT);
    return { ...params, ...outputs };
  }

  reset() {
    this.mapping = undefined;
  }

  parseCells(cells: CellInfo[]) {
    this.mapping = cells.reduce(
      (mapping, cellInfo) => ({
        ...mapping,
        ...Interpolator.parseSource(cellInfo.source),
      }),
      {}
    );
  }

  static interpolateParams(
    source: string,
    mapping: VariableMap,
    values: ValueMap
  ) {
    const result = source
      .split("\n")
      .reduce((interpolated: string, line: string) => {
        if (line.length === 0) return interpolated;
        const match = line.match(REGEX_PARAM);
        if (match) {
          const [_, assignment] = match;
          const assignmentMatch = assignment.match(REGEX_ASSIGNMENT);
          if (assignmentMatch) {
            let [_, name] = assignmentMatch;
            name = name.trimStart().trimEnd();

            // TODO could do checking here against metadata, e.g. enforce bounds
            const value = values[name] ?? mapping[name].initial ?? undefined;
            if (value) {
              const newAssignment = `${name}=${value} # @param`;
              console.debug(
                "Interpolator:interpolateParams ",
                `${line} => ${newAssignment}`
              );
              return interpolated.length === 0
                ? `${newAssignment}`
                : `${interpolated}\n${newAssignment}`;
            }
          }
        }
        return interpolated.length === 0 ? line : `${interpolated}\n${line}`;
      }, "");
    return result;
  }

  createPreprocessor(values: ValueMap) {
    return (s: string) => {
      return Interpolator.interpolateParams(s, this.mapping ?? {}, values);
    };
  }
}

export default Interpolator;
