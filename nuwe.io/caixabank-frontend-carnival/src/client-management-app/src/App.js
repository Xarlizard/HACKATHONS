import React, { useState, useCallback, useMemo, Suspense, lazy } from "react";
import {
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  Paper,
  CircularProgress,
} from "@mui/material";
import { FixedSizeList as VirtualList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

// Lazy load components
const AssetDetails = lazy(() => import("./components/AssetDetails"));
const FilterSection = lazy(() => import("./components/FilterSection"));

// Memoized Asset Row Component
const AssetRow = React.memo(({ data, index, style, onSelect }) => {
  const asset = data[index];
  return (
    <div style={style}>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          m: 1,
          cursor: "pointer",
          "&:hover": { bgcolor: "action.hover" },
        }}
        onClick={() => onSelect(asset)}
      >
        <Typography>
          {`ID: ${asset.id} | Name: ${asset.name} | Type: ${asset.type}`}
        </Typography>
        <Typography
          variant="body2"
          color={asset.dailyChange >= 0 ? "success.main" : "error.main"}
        >
          {`Value: $${asset.value.toFixed(
            2
          )} | Daily Change: ${asset.dailyChange.toFixed(2)}%`}
        </Typography>
      </Paper>
    </div>
  );
});
AssetRow.displayName = "AssetRow";

// Generate assets in chunks
const generateAssetsChunk = (start, count) => {
  const assetTypes = ["Stocks", "Crypto", "Funds"];
  return Array.from({ length: count }, (_, index) => ({
    id: start + index + 1,
    name: `Asset ${start + index + 1}`,
    type: assetTypes[Math.floor(Math.random() * assetTypes.length)],
    value: Math.floor(Math.random() * 10000) + 100,
    dailyChange: Math.random() * 10 - 5,
    history: Array.from({ length: 30 }, (_, day) => ({
      date: new Date(Date.now() - day * 24 * 60 * 60 * 1000).toISOString(),
      value: Math.floor(Math.random() * 10000) + 100,
    })),
  }));
};

const App = () => {
  const [assets, setAssets] = useState(() => generateAssetsChunk(0, 1000));
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [filter, setFilter] = useState("All");
  const [sortType, setSortType] = useState("Name");

  // Memoized filtered and sorted assets
  const processedAssets = useMemo(() => {
    const filtered =
      filter === "All"
        ? assets
        : assets.filter((asset) => asset.type === filter);

    return filtered.sort((a, b) => {
      switch (sortType) {
        case "Name":
          return a.name.localeCompare(b.name);
        case "Value":
          return b.value - a.value;
        case "Daily Change":
          return b.dailyChange - a.dailyChange;
        default:
          return 0;
      }
    });
  }, [assets, filter, sortType]);

  // Memoized handlers
  const handleAssetSelect = useCallback((asset) => {
    setSelectedAsset(asset);
  }, []);

  const handleFilterChange = useCallback((event) => {
    setFilter(event.target.value);
  }, []);

  const handleSortChange = useCallback((event) => {
    setSortType(event.target.value);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Investment Assets
        </Typography>

        <Suspense fallback={<CircularProgress />}>
          <FilterSection
            filter={filter}
            sortType={sortType}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </Suspense>

        <Box sx={{ height: 400, mt: 2 }}>
          <AutoSizer>
            {({ height, width }) => (
              <VirtualList
                height={height}
                width={width}
                itemCount={processedAssets.length}
                itemSize={100}
                itemData={processedAssets}
              >
                {({ data, index, style }) => (
                  <AssetRow
                    data={data}
                    index={index}
                    style={style}
                    onSelect={handleAssetSelect}
                  />
                )}
              </VirtualList>
            )}
          </AutoSizer>
        </Box>

        {selectedAsset && (
          <Suspense fallback={<CircularProgress />}>
            <AssetDetails asset={selectedAsset} />
          </Suspense>
        )}
      </Paper>
    </Container>
  );
};

export default App;
