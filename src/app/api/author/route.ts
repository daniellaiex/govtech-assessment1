import { authorService } from "@/app/services/authorService";
import { z } from "zod";

const ParamsSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().optional()
});

// GET function to fetch authors
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const name = searchParams.get('name');
        const params = ParamsSchema.parse({
            name: name !== null ? name : undefined,
        });

        if (params.name) {
            const authors = await authorService.getAuthorByName(params.name);
            return new Response(JSON.stringify(authors), { status: 200 });
        } else {
            const authors = await authorService.getAllAuthors();
            return new Response(JSON.stringify(authors), { status: 200 });
        }
    } catch (error) {
        console.error('Error fetching authors:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

// POST function to create a new author
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const params = ParamsSchema.parse({
            name: body.name,
        });

        if (params.name) {
            const newAuthor = await authorService.createAuthor(params.name);
            return new Response(JSON.stringify(newAuthor), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Name is required' }), { status: 400 });
        }
    } catch (error) {
        console.error('Error creating author:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}