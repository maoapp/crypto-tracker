<script lang="ts">
  import { DarkMode, Card, Table, TableHead, TableHeadCell, TableBody, TableBodyCell, TableBodyRow, Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  
  let darkMode = false;

  interface Asset {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    priceUsd: string;
    changePercent24Hr: string;
  }

  async function fetchAssets(): Promise<Asset[]> {
    const response = await fetch('https://api.coincap.io/v2/assets?limit=10');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.data;
  }

  function formatPrice(price: string): string {
    return parseFloat(price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  function formatChange(change: string): string {
    const changeNum = parseFloat(change);
    return changeNum.toFixed(2) + '%';
  }

  let assetsPromise = fetchAssets();
</script>

<div class:dark={darkMode}>
  <Navbar 
    let:hidden 
    let:toggle 
    class="py-3 {darkMode ? '' : 'border-b border-gray-200'}"
  >
    <NavBrand href="/">
      <svg class="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        CryptoTracker
      </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden} class="order-1 md:order-none">
      <NavLi href="/" active={true}>Dashboard</NavLi>
      <NavLi href="/portfolio">Portfolio</NavLi>
      <NavLi href="/news">News</NavLi>
      <NavLi href="/settings">Settings</NavLi>
    </NavUl>
    <div class="flex items-center md:order-2">
      <DarkMode bind:darkMode />
    </div>
  </Navbar>

  <div class="container mx-auto p-4">
    {#await assetsPromise}
      <p class="text-center dark:text-white">Loading...</p>
    {:then assets}
      <div class="grid md:grid-cols-2 gap-4 mb-6">
        {#each assets.slice(0, 2) as asset}
          <Card>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {asset.name}
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              {formatPrice(asset.priceUsd)}
              <span class="{parseFloat(asset.changePercent24Hr) >= 0 ? 'text-green-500' : 'text-red-500'}">
                {formatChange(asset.changePercent24Hr)}
              </span>
            </p>
          </Card>
        {/each}
      </div>

      <Card>
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Market Overview
        </h5>
        <Table hoverable={true}>
          <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>24h Change</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each assets as asset}
              <TableBodyRow>
                <TableBodyCell>{asset.name}</TableBodyCell>
                <TableBodyCell>{formatPrice(asset.priceUsd)}</TableBodyCell>
                <TableBodyCell class="{parseFloat(asset.changePercent24Hr) >= 0 ? 'text-green-500' : 'text-red-500'}">
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
