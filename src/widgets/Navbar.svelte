<script lang="ts">
  import { page } from '$app/stores';
  import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, DarkMode } from 'flowbite-svelte';

  export let darkMode: boolean;

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/news', label: 'News' },
  ];

  // Use $page directly to access the current path reactively
  $: currentPath = $page.url.pathname;
  
  function toggleDarkMode() {
    darkMode = !darkMode;
  }
</script>

<Navbar let:hidden let:toggle class="py-3 {darkMode ? '' : 'border-b border-gray-200'}">
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
    {#each navItems as item}
      <NavLi href={item.path}>
        <a href={item.path} class="{currentPath === item.path ? 'text-blue-700 dark:text-blue-500 font-semibold' : ''}">
          {item.label}
        </a>
      </NavLi>
    {/each}
  </NavUl>
  <div class="flex items-center md:order-2">
    <DarkMode on:change={toggleDarkMode} />
  </div>
</Navbar>
