import React, { useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'next';
import { Edge, Node } from 'vis-network';
import { Box } from '@mui/material';
import useFetchData from '@/hooks/useFetchData';
import Layout from '@/components/layer/Layout';
import RoadMap from '@/components/road-map';

interface CustomNode extends Node {
  name: string;
}

type CsvData = {
  nodes: CustomNode[];
  edges: Edge[];
};

const Home: NextPageWithLayout = () => {
  const { data: queryData, isSuccess } = useFetchData();
  const [csvData, setCsvData] = useState<CsvData>({ edges: [], nodes: [] });

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

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <RoadMap roadMapData={csvData} />
    </Box>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Home;
