import React, { useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'next';
import { Edge, Node } from 'vis-network';
import { Box, CircularProgress, MenuItem } from '@mui/material';
import useFetchData from '@/hooks/useFetchData';
import { dataFilePathList, fileNameList } from '@/utils/road-map/const';
import Layout from '@/components/layer/Layout';
import RoadMap from '@/components/road-map';
import Select from '@/components/ui/select/Select';

interface CustomNode extends Node {
  name: string;
}

type NodeData = {
  nodes: CustomNode[];
  edges: Edge[];
};

const Home: NextPageWithLayout = () => {
  const [selectedClass, setSelectedClass] = useState<string>(
    Object.keys(dataFilePathList)[0]
  );
  const {
    data: csvData,
    isSuccess,
    isLoading,
  } = useFetchData(dataFilePathList[selectedClass]);
  const [nodeData, setNodeData] = useState<NodeData>({ edges: [], nodes: [] });

  useEffect(() => {
    if (!isLoading && isSuccess && csvData) {
      const csvDataList = csvData.split('\n');
      const uniqueNodeSet = new Set();
      const nodeList: NodeData = { nodes: [], edges: [] };
      for (let i = 1; i < csvDataList.length; i++) {
        const rowData = csvDataList[i].replace(/\r/g, '').split(',');

        // If the current node exists, add it to the node list and show on the road map
        if (!rowData[2]) {
          continue;
        }
        // Add the current node to the node list if it does not exist
        if (!uniqueNodeSet.has(rowData[2])) {
          uniqueNodeSet.add(rowData[2]);
          nodeList.nodes.push({
            id: rowData[2],
            label: `${rowData[0]} - ${rowData[1]}`,
            name: `${rowData[2]} - ${rowData[0]}-${rowData[1]}`,
          });
        }

        // If the previous node exists, add it to the node list and show on the road map
        if (!rowData[5]) {
          continue;
        }
        // Add the previous node to the node list if it does not exist
        if (!uniqueNodeSet.has(rowData[5])) {
          uniqueNodeSet.add(rowData[5]);
          nodeList.nodes.push({
            id: rowData[5],
            label: `${rowData[3]} - ${rowData[4]}`,
            name: `${rowData[5]} - ${rowData[3]}-${rowData[4]}`,
          });
        }

        // Add the edge between the current node and the previous node
        nodeList.edges.push({ from: rowData[2], to: rowData[5] });
      }
      setNodeData(nodeList);
    }
  }, [csvData]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClass(event.target.value);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Select
        value={selectedClass}
        helperText="選擇班級"
        SelectProps={{
          onChange: handleSelectChange,
        }}
        paperMaxHeight={330}
      >
        <MenuItem value="none" disabled>
          請選擇班級
        </MenuItem>
        {fileNameList.map((fileName) => (
          <MenuItem key={fileName.id} value={fileName.id}>
            {fileName.name}
          </MenuItem>
        ))}
      </Select>
      {isLoading ? (
        <Box>
          <CircularProgress
            sx={{
              marginTop: '50px',
            }}
          />
        </Box>
      ) : (
        <RoadMap roadMapData={nodeData} />
      )}
    </Box>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Home;
