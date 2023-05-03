import { useEffect, useRef, useState } from 'react';
import { Data, Edge, Network, Node, Options } from 'vis-network';

interface UseVisNetworkProps {
  options: Options;
  nodes: Node[];
  edges: Edge[];
}

const UseVisNetwork = ({ options, nodes, edges }: UseVisNetworkProps) => {
  const [network, addNetwork] = useState<Network | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const data: Data = { nodes, edges };

  useEffect(() => {
    if (nodes.length === 0 || edges.length === 0) {
      return;
    }
    if (ref.current) {
      const instance = new Network(ref.current, data, options);
      addNetwork(instance);
    }
    return () => network?.destroy();
  }, [edges, nodes, options]);

  return {
    network,
    ref,
  };
};

export default UseVisNetwork;
