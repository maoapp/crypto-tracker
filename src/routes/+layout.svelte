<script>
	import '../app.css';
	import Navbar from '../widgets/Navbar.svelte';

	let darkMode = false;
</script>

<div class="flex flex-col h-screen">
  <Navbar bind:darkMode />
  <main class="flex-grow">
    <slot></slot>
  </main>
</div>