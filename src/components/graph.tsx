import {GFA, GFAFeature, GraphProps} from "../types"
import {useEffect, useMemo, useState} from "react"
import cytoscape, {EdgeSingular} from "cytoscape"
// @ts-ignore
import dagre from "./cytospace-dagre"
// @ts-ignore
import navigator from "./cytoscape-navigator"
import "./cytoscape.js-navigator.css"
import Layers, {ICanvasLayer} from "cytoscape-layers"

cytoscape.use(dagre);
cytoscape.use(Layers as any);
navigator(cytoscape);

function createCytoscape(drawPaths: boolean, drawLabels: boolean, gfa: GFA, minLength: number, maxLength: number, segmentWidth: number, linkWidth: number, pathColors: {color: string, enabled: boolean}[]) {
  return cytoscape({
    container: document.getElementById("graph"),
    autounselectify: false,
    layout: {
      name: "dagre",
      rankdir: "LR",
      align: "UL",
      nodesep: 35
    } as any,
    style: [
      {
        selector: "node",
        style: {
          shape: "rectangle",
          width: "data(width)",
          height: "data(height)",
          "background-fill": drawPaths ? "linear-gradient" : "solid",
          "background-gradient-stop-colors": drawPaths ? "data(stopColors)" : undefined,
          "background-gradient-stop-positions": drawPaths ? "data(stopPositions)" : undefined,
          label: drawLabels ? 'data(id)' : undefined
        } as any
      },
      {
        selector: "edge",
        style: {
          "target-arrow-shape": "triangle",
          "curve-style": "bezier",
          width: "data(width)"
        }
      },
      {
        selector: ":selected",
        style: {
          "background-color": "blue",
          "line-color": "blue",
          "target-arrow-color": "blue",
          "overlay-padding": "5px",
          "overlay-color": "rgb(0,100,0)",
          "overlay-opacity": 0.25
        }
      },
      {
        selector: ":active",
        style: {
          "overlay-padding": "5px",
          "overlay-color": "rgb(0,100,0)",
          "overlay-opacity": 0.25
        }
      }
    ],
    elements: {
      nodes: gfa.segments.map(value => ({
        data: {
          id: value.name,
          width: Math.sqrt((value.length - minLength) / Math.max(maxLength - minLength, 1)) * 100 + 100,
          // width: Math.sqrt(value.length),
          height: segmentWidth * (drawPaths ? Math.max(value.paths.length, 1) : 1),
          stopColors: value.paths.flatMap(path => [pathColors[path.index].color, pathColors[path.index].color]).join(" "),
          stopPositions: value.paths.flatMap((_path, index, array) => [index / array.length * 100, (index + 1) / array.length * 100]).join(" "),
          feature: value
        }
      })),
      edges: gfa.links.map(value => ({
        data: {
          source: value.from,
          target: value.to,
          width: linkWidth * (drawPaths ? Math.max(value.paths.length, 1) : 1),
          stopColors: value.paths.flatMap(path => [pathColors[path.index].color, pathColors[path.index].color]),
          stopPositions: value.paths.flatMap((_path, index, array) => [index / array.length, (index + 1) / array.length]),
          feature: value
        }
      }))
    },
    minZoom: 0.1,
    maxZoom: 4
  });
}

function setEventListeners(cy: cytoscape.Core, props: GraphProps, onFeatureClick: ((feature: GFAFeature | undefined) => void)) {
  cy.on("zoom", e => props.setZoom(e.cy.zoom()));
  cy.on("unselect", _ => onFeatureClick(undefined))
  cy.on("select", e => onFeatureClick(e.target.data("feature")))
}

function renderPaths(layers: any) {
  layers.renderPerEdge(layers.append("canvas"), (ctx: CanvasRenderingContext2D, edge: EdgeSingular, path: Path2D) => {
    if (edge.scratch("gradient_cache_key") !== path) {
      const length = Math.sqrt((edge.sourceEndpoint().y - edge.targetEndpoint().y) ** 2 + (edge.targetEndpoint().x - edge.sourceEndpoint().x) ** 2);
      if (length > 0) {
        const [x1, y1] = [edge.midpoint().x - edge.width() / 2 / length * (edge.sourceEndpoint().y - edge.targetEndpoint().y), edge.midpoint().y - edge.width() / 2 / length * (edge.targetEndpoint().x - edge.sourceEndpoint().x)];
        const [x2, y2] = [edge.midpoint().x + edge.width() / 2 / length * (edge.sourceEndpoint().y - edge.targetEndpoint().y), edge.midpoint().y + edge.width() / 2 / length * (edge.targetEndpoint().x - edge.sourceEndpoint().x)];
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        const stopColors: string[] = edge.data("stopColors");
        const stopPositions = edge.data("stopPositions");
        stopColors.forEach((color, index) => {
          //console.log("color: " + color + "\n index: " + index + "\n\n")
          gradient.addColorStop(stopPositions[index], color)
        })
        edge.scratch("gradient_cache_key", path);
        edge.scratch("gradient_cache_value", gradient);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = edge.width();
        ctx.stroke(path);
      }
    } else {
      ctx.strokeStyle = edge.scratch("gradient_cache_value");
      ctx.lineWidth = edge.width();
      ctx.stroke(path);
    }
  });
}

export function Graph(props: GraphProps) {
  const {
    gfa,
    settings: {
      segmentWidth,
      linkWidth
    },
    drawPaths,
    drawLabels,
    redraw,
    onFeatureClick,
    pathColors
  } = props;

  // min and max segment length
  const [minLength, maxLength] = useMemo(() => gfa.segments.reduce(([minLength, maxLength], currentValue) => [Math.min(minLength, currentValue.length), Math.max(maxLength, currentValue.length)], [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]), [gfa]);
  // cytoscape state
  const [cy, setCy] = useState<cytoscape.Core>();
  // layer state
  const [layer, setLayer] = useState<ICanvasLayer>();
  // navigator state
  const [navigator, setNavigator] = useState<any>();


  useEffect(() => {
    // create cytoscape graph
    const cy = createCytoscape(drawPaths, drawLabels, gfa, minLength, maxLength, segmentWidth, linkWidth, pathColors)

    // @ts-ignore
    setNavigator(cy.navigator({
      parent: document.getElementsByClassName("body")[0]
    }));

    props.setZoom(cy.zoom());

    // if drawPaths is true render the paths
    if (drawPaths) {
      // @ts-ignore
      const layers = cy.layers();
      renderPaths(layers)
      setLayer(layers);
    }
    // add event listeners on zoom, selection etc. behaviour
    setEventListeners(cy, props, onFeatureClick)
    setCy(cy);
  }, [gfa, segmentWidth, linkWidth, drawPaths, drawLabels, redraw, minLength, maxLength]);

  useEffect(() => {
    if (cy) {
      cy.zoom(props.zoom)
    }
  }, [cy, props.zoom]);

  useEffect(() => {
    if (cy) {
      cy.nodes().forEach(ele => {
        ele.data({
          stopColors: ele.data("feature").paths.flatMap((path: any) => pathColors[path.index].enabled ? [pathColors[path.index].color, pathColors[path.index].color] : ["gray", "gray"]).join(" ")
        });
      });
      cy.edges().forEach(ele => {
        ele.data({
          stopColors: ele.data("feature").paths.flatMap((path: any) => pathColors[path.index].enabled ? [pathColors[path.index].color, pathColors[path.index].color] : ["gray", "gray"])
        });
        ele.removeScratch("gradient_cache_key");
      });
      layer?.update();
      navigator.$thumbnail.setAttribute("src", cy.png({
        full: true,
        scale: Math.min(navigator.panelWidth / navigator.boundingBox.w, navigator.panelHeight / navigator.boundingBox.h),
        maxWidth: navigator.panelWidth,
        maxHeight: navigator.panelHeight
      }));
    }
  }, [pathColors]);


  return (
    <div
      id={"graph"}
      style={{
        width: "100%",
        height: "100%"
      }}
    />
  );
}
