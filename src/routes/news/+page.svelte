<script lang="ts">
  import { Card, Spinner } from 'flowbite-svelte';
  import { fetchNews } from '../../services';

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }


</script>

<div class="dark:bg-gray-900 text-white h-screen">
  <div class="container mx-auto p-4">
    {#await fetchNews()}
      <div class="flex justify-center items-center h-screen"> <!-- Center spinner here -->
        <Spinner color="blue" size="12" />
      </div>    {:then articles}
      <h1 class="text-2xl font-bold mb-4 dark:text-white text-gray-700">Cryptocurrency News</h1>
      <div class="grid md:grid-cols-2 gap-4">
        {#each articles as article}
          <Card class="dark:bg-gray-800">
            {#if article.urlToImage}
              <img src={article.urlToImage} alt={article.title} class="w-full h-48 object-cover mb-4 rounded-t-lg">
            {/if}
            <h5 class="mb-2 text-xl font-bold tracking-tight dark:text-white">
              {article.title}
            </h5>
            <p class="mb-2 font-normal dark:text-gray-400">
              {article.description}
            </p>
            <p class="mb-2 text-sm dark:text-gray-500">
              {article.source.name} - {formatDate(article.publishedAt)}
            </p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
          </Card>
        {/each}
      </div>
    {:catch error}
      <p class="text-center text-red-500">{error.message}</p>
    {/await}
  </div>
</div>
