<script lang="ts">
	import { goto } from '$app/navigation'
	import { navigating, page } from '$app/stores'
	import type { Todo } from './.type'

	export let todos: Todo[] = []

	const paging = {
		page: $page.url.searchParams.get('page') || '1',
		size: $page.url.searchParams.get('size') || '5'
	}

	function reload() {
		const params = new URLSearchParams(paging)
		goto('?' + params, { replaceState: true, keepfocus: true })
	}

	function paginate(inc: number) {
		if ($navigating) return
		paging.page = String(+paging.page + inc)
		reload()
	}
</script>

<main>
	<div style="display: flex; align-items: baseline; line-height: 0;">
		<h1>Todo</h1>
		<em>&MediumSpace;(shadow endpoint)</em>
	</div>
	<div>
		<button on:click={() => paginate(-1)} disabled={paging.page === '1'}>Prev</button>
		<button on:click={() => paginate(1)}>Next</button>
	</div>
	<ul>
		{#each todos as todo}
			<li>
				<label>
					<input type="checkbox" bind:checked={todo.completed} />
					<span>
						{todo.title}
					</span>
				</label>
			</li>
		{/each}
	</ul>
</main>
