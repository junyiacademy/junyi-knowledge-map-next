import React, { useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'next';
import find from 'lodash/find';
import { Edge, IdType, Node, Options } from 'vis-network';
import useFetchData from '@/components/hooks/useFetchData';
import UseVisNetwork from '@/components/hooks/useVisNetwork';
import Layout from '../components/layer/Layout';

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

const Home: NextPageWithLayout = () => {
  const { data: queryData, isSuccess } = useFetchData();
  const [csvData, setCsvData] = useState<CsvData>({ edges: [], nodes: [] });
  const { ref, network } = UseVisNetwork({
    options,
    edges: csvData.edges,
    nodes: csvData.nodes,
  });
  useEffect(() => {
    if (isSuccess && queryData) {
      const rows = queryData.split('\n');
      const uniqueSet = new Set();
      const csvArray: CsvData = { nodes: [], edges: [] };
      for (let i = 1; i < rows.length; i++) {
        const rowData = rows[i].replace(/\r/g, '').split(',');
        csvArray.edges.push({ from: rowData[2], to: rowData[5] });
        if (!uniqueSet.has(rowData[2])) {
          uniqueSet.add(rowData[2]);
          csvArray.nodes.push({
            id: rowData[2],
            label: `${rowData[0]}-${rowData[1]}`,
            name: `${rowData[2]}-${rowData[0]}-${rowData[1]}`,
          });
        }
        if (!uniqueSet.has(rowData[5])) {
          uniqueSet.add(rowData[5]);
          csvArray.nodes.push({
            id: rowData[5],
            label: `${rowData[3]}-${rowData[4]}`,
            name: `${rowData[5]}-${rowData[3]}-${rowData[4]}`,
          });
        }
      }
      setCsvData(csvArray);
    }
  }, [queryData]);

  const onNodeClick = (event: NodeClickEvent) => {
    const nodeId = event.nodes[0];
    if (nodeId) {
      const nodeData = find(csvData.nodes, { id: nodeId });
      console.log(nodeData);
    }
  };

  useEffect(() => {
    if (!network) {
      return;
    }
    network.on('click', onNodeClick);
    network.fit();
    network.focus(csvData.nodes[0].id as IdType, { scale: 1 });
    return () => network.off('click', onNodeClick);
  }, [network]);

  return (
    <>
      <div style={{ height: 700, width: '100%' }} ref={ref} />
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Home;
