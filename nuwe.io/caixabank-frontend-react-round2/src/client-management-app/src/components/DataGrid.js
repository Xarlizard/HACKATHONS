import React, { memo, useMemo } from 'react';
import { FixedSizeList } from 'react-window';

// Memoized row component
const Row = memo(({ data, index, style }) => {
  const item = data[index];
  return (
    <div style={style} className="grid-row">
      <div>{item.name}</div>
      <div>{item.type}</div>
      <div>${item.value.toFixed(2)}</div>
      <div>{item.change}%</div>
    </div>
  );
});

const DataGrid = ({ data, sortConfig, filterConfig }) => {
  // Memoized data processing
  const processedData = useMemo(() => {
    let result = [...data];
    
    // Apply filters
    if (filterConfig) {
      result = result.filter(item => 
        item.type === filterConfig.type || filterConfig.type === 'All'
      );
    }
    
    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return result;
  }, [data, sortConfig, filterConfig]);

  return (
    <div className="data-grid">
      <div className="grid-header">
        <div>Name</div>
        <div>Type</div>
        <div>Value</div>
        <div>Change</div>
      </div>
      <FixedSizeList
        height={400}
        width="100%"
        itemCount={processedData.length}
        itemSize={50}
        itemData={processedData}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default memo(DataGrid); 