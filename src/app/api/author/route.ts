import { authorService } from "@/app/services/authorService";
import { z } from "zod";

const ParamsSchema = z.object({
    id: z.coerce.number().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    name: z.string().optional(),
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
            const authors = await authorService.searchAuthorByName(params.name);
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
            firstName: body.firstName,
            lastName: body.lastName
        });
        console.log(params.firstName);
        console.log(params.lastName);

        if (!params.firstName || !params.lastName) {
            return new Response(JSON.stringify({ error: 'Both first and last name are required' }), { status: 400 });
        }

        // Check if the author already exists
        const existingAuthor = await authorService.getAuthorByName(params.firstName, params.lastName);
        console.log(existingAuthor);
        if (existingAuthor) {
            console.log("Author already exists");
            return new Response(JSON.stringify({ error: 'Author already exists' }), { status: 409 });
        }

        const newAuthor = await authorService.createAuthor(params.firstName, params.lastName);
        return new Response(JSON.stringify(newAuthor), { status: 201 });
    } catch (error) {
        console.error('Error creating author:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}