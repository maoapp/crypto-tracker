<script lang="ts">
  import {
    Card,
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    Spinner
  } from 'flowbite-svelte';
  import { fetchAssets } from '../services';
  import { formatChange, formatPrice } from '../utils';

</script>

<div class="dark:bg-gray-900 text-white h-screen">
  <div class="container mx-auto p-4">
    {#await fetchAssets()}
    <div class="flex justify-center items-center h-screen"> <!-- Center spinner here -->
      <Spinner color="blue" size="12" />
    </div>
    {:then assets}
      <div class="grid md:grid-cols-2 gap-4 mb-6">
        {#each assets.slice(0, 2) as asset}
          <Card class="dark:bg-gray-800">
            <h5 class="mb-2 text-2xl font-bold tracking-tight dark:text-gray-200">
              {asset.name}
            </h5>
            <p class="font-normal dark:text-gray-400">
              {formatPrice(asset.priceUsd)}
              <span class="{parseFloat(asset.changePercent24Hr) >= 0 ? 'text-green-500' : 'text-red-500'}">
                {formatChange(asset.changePercent24Hr)}
              </span>
            </p>
          </Card>
        {/each}
      </div>
      <Card class="dark:bg-gray-800 w-full">
        <h5 class="mb-2 text-xl font-bold tracking-tight dark:text-gray-200">
          Market Overview
        </h5>
        <Table hoverable={true} class="bg-gray-800 text-gray-400 w-full table-auto">
          <TableHead>
            <TableHeadCell class="px-2 text-left">Name</TableHeadCell>
            <TableHeadCell class="px-2 text-left">Price</TableHeadCell>
            <TableHeadCell class="px-2 text-right">24h Change</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each assets as asset}
              <TableBodyRow>
                <TableBodyCell class="px-2">{asset.name}</TableBodyCell>
                <TableBodyCell class="px-2">{formatPrice(asset.priceUsd)}</TableBodyCell>
                <TableBodyCell class="{parseFloat(asset.changePercent24Hr) >= 0 ? 'dark:text-green-500 text-green-500' : 'dark:text-red-500 text-red-500'} px-2 text-right">
                  {formatChange(asset.changePercent24Hr)}
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </Card>
    {:catch error}
      <p class="text-center text-red-500">{error.message}</p>
    {/await}
  </div>
</div>
