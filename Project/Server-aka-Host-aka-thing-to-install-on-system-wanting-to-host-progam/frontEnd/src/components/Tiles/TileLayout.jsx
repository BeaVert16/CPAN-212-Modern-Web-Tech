import { Responsive, WidthProvider } from 'react-grid-layout';
import './TileLayout.css';
import DoubleSideBar from '../Chart/DoubleSideBar';

const ResponsiveGridLayout = WidthProvider(Responsive);

const TileLayout = ({ onTileLoad, networkUsageData }) => {
  const layout = [
    { i: 'cpu', x: 0, y: 0, w: 6, h: 4, minW: 3, minH: 4 },
    { i: 'gpu', x: 6, y: 0, w: 6, h: 4, minW: 3, minH: 4 },
    { i: 'memory', x: 0, y: 4, w: 6, h: 4, minW: 3, minH: 4 },
    { i: 'network', x: 6, y: 4, w: 6, h: 4, minW: 3, minH: 4 },
  ];

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 }}
      rowHeight={30}
      isResizable={true}
      isDraggable={true}
      width={1200}
    >
      <div key="cpu" className="grid-item" onLoad={() => onTileLoad('cpu')}>CPU Tile</div>
      <div key="gpu" className="grid-item" onLoad={() => onTileLoad('gpu')}>GPU Tile</div>
      <div key="memory" className="grid-item" onLoad={() => onTileLoad('memory')}>Memory Tile</div>
      <div key="network" className="grid-item">
        <DoubleSideBar data={networkUsageData?.default_device || []} />
      </div>
    </ResponsiveGridLayout>
  );
};

export default TileLayout;