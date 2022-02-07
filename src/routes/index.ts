import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ url }) => {
	const page = url.searchParams.get('page') || '1'
	const _limit = url.searchParams.get('size') || '5'
	const _start = String((+page - 1) * +_limit)
	const params = new URLSearchParams({ _start, _limit })
	const response = await fetch(`https://jsonplaceholder.typicode.com/todos?` + params)
	const todos = await response.json()
	return { body: { todos } }
}
