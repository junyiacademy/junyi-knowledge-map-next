import React, { useEffect } from 'react';
import find from 'lodash/find';
import { Edge, IdType, Node, Options } from 'vis-network';
import UseVisNetwork from '@/hooks/useVisNetwork';

interface NodeClickEvent {
  nodes: Node[];
  edges: Edge[];
  event: MouseEvent;
  pointer: {
    DOM: { x: number; y: number };
    canvas: { x: number; y: number };
  };
  item: string | null;
}

interface CustomNode extends Node {
  name: string;
}

type CsvData = {
  nodes: CustomNode[];
  edges: Edge[];
};

const options: Options = {
  nodes: {
    color: {
      background: 'lightgray',
      hover: 'SILVER',
      highlight: 'SILVER',
    },
    borderWidth: 0,
  },
  edges: {
    arrows: 'to',
    arrowStrikethrough: false,
    smooth: false,
  },
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'UD',
      edgeMinimization: true,
      levelSeparation: 350,
      nodeSpacing: 350,
      blockShifting: true,
      parentCentralization: true,
      sortMethod: 'directed',
    },
  },
  physics: {
    enabled: false,
  },
  height: '1000px',
};

interface RoadMapProps {
  roadMapData: CsvData;
}

const RoadMap: React.FC<RoadMapProps> = ({ roadMapData }) => {
  const { ref, network } = UseVisNetwork({
    options,
    edges: roadMapData.edges,
    nodes: roadMapData.nodes,
  });

  const onNodeClick = (event: NodeClickEvent) => {
    const nodeId = event.nodes[0];
    if (nodeId) {
      const nodeData = find(roadMapData.nodes, { id: nodeId });
      console.log(nodeData);
    }
  };

  useEffect(() => {
    if (!network) {
      return;
    }
    network.on('click', onNodeClick);
    network.fit();
    network.focus(roadMapData.nodes[0].id as IdType, { scale: 1 });
    return () => network.off('click', onNodeClick);
  }, [network]);

  return (
    <>
      <div style={{ height: 700, width: '100%' }} ref={ref} />
    </>
  );
};

export default RoadMap;
