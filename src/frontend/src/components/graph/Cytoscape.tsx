import React, { useEffect, useState } from 'react';
import { Graph, GraphSettings } from '../../types/graph';
import { Layout } from '../../types/layout';
import { createCytoscape } from './cytoscape_core';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateExtent, updatePan, updateZoom, updateViewport } from '../../slices/graphLayout';
import { updateFeature } from '../../slices/graphSelection';
import cytoscape from 'cytoscape';

interface CytoscapeProps {
  graph: Graph;
  layout: Layout;
  onError: (error: unknown) => void;
  onSuccess: (newCy: cytoscape.Core) => void;
  pheno?: boolean;
}

const Cytoscape: React.FC<CytoscapeProps> = ({ graph, layout, onError, onSuccess, pheno }) => {
  const zoom = useAppSelector((state) => state.graphLayout.zoom);
  const pan = useAppSelector((state) => state.graphLayout.pan);
  const graphSettings = useAppSelector((state) => state.graphSettings);
  const selectedFeature = useAppSelector((state) => state.graphSelection.feature);
  const isolate = useAppSelector((state) => state.pheno.isolate);
  const [cy, setCy] = useState<cytoscape.Core | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cy) {
      cy.pan(pan);
    }
  }, [pan]);

  useEffect(() => {
    try {
      const settings: GraphSettings = pheno
        ? { ...graphSettings, drawPaths: false }
        : graphSettings;
      const cyto = createCytoscape(
        graph,
        settings,
        layout,
        zoom,
        pan,
        selectedFeature,
        pheno,
        isolate,
      );
      onSuccess(cyto);
      setCy(cyto);
    } catch (e) {
      onError(e);
    }
  }, [graphSettings, graph, isolate, pheno]);

  useEffect(() => {
    const dispatchExtent = (extent: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      w: number;
      h: number;
    }) => {
      dispatch(updateExtent({ xl: extent.x1, xr: extent.x2 }));
    };

    if (cy) {
      cy.on('unselect', () => dispatch(updateFeature(undefined)));
      cy.on('select', (e) => dispatch(updateFeature(e.target.data('feature'))));
      cy.on('pan', () => {
        dispatch(updateViewport(extentToRectangleRange(cy.extent())));
        dispatch(updatePan(cy.pan()));
        dispatchExtent(cy.extent());
      });
      cy.on('zoom', () => {
        dispatch(updateViewport(extentToRectangleRange(cy.extent())));
        dispatch(updateZoom(cy.zoom()));
        dispatchExtent(cy.extent());
      });
    }
  }, [cy, dispatch]);

  return (
    <div
      id='graph'
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

const extentToRectangleRange = (extent: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  w: number;
  h: number;
}) => {
  return {
    lu: { x: extent.x1, y: extent.y1 },
    rd: { x: extent.x2, y: extent.y2 },
  };
};

export default Cytoscape;
