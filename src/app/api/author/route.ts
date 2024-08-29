import { authorService } from "@/app/services/authorService";
import { z } from "zod";

// Define the schema for query parameters
const ParamsSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().optional()
});

// GET function to fetch authors
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const params = ParamsSchema.parse({
        id: searchParams.get('id'),
    });

    if (params.id) {
        const author = await authorService.getAuthorById(params.id);
        if (author) {
            return new Response(JSON.stringify(author), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Author not found' }), { status: 404 });
        }
    } else {
        const authors = await authorService.getAllAuthors();
        return new Response(JSON.stringify(authors), { status: 200 });
    }
}

// POST function to create a new author
export async function POST(request: Request) {
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
}