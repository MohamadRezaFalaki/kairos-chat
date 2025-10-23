import {OllamaEmbeddings} from '@langchain/ollama';
import {RecursiveCharacterTextSplitter} from '@langchain/textsplitters';
import {db} from '@/db';
import {documents, documentChunks} from "@/db/schema"
import {sql} from 'drizzle-orm';

// ============================================
// INITIALIZE OLLAMA EMBEDDINGS
// ============================================
const embeddings = new OllamaEmbeddings({
    model: 'nomic-embed-text',
    baseUrl: 'http://localhost:11434',
});

// ============================================
// TEXT SPLITTER (Chunk documents)
// ============================================
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 50,
    separators: ['\n\n', '\n', '. ', ' ', ''],
});

// ============================================
// FUNCTION: Upload & Process Document
// ============================================
export async function uploadDocument(
    title: string,
    content: string,
    source?: string,
    metadata?: Record<string, any>
) {
    try {
        console.log('📄 Processing document:', title);

        // 1. Save document to database
        const [doc] = await db
            .insert(documents)
            .values({
                title,
                content,
                source,
                metadata: metadata ? JSON.stringify(metadata) : null,
            })
            .returning();

        console.log('✅ Document saved with ID:', doc.id);

        // 2. Split document into chunks
        const chunks = await textSplitter.splitText(content);
        console.log('✂️  Split into', chunks.length, 'chunks');

        // 3. Generate embeddings for each chunk
        console.log('🔢 Generating embeddings...');
        const chunkEmbeddings = await embeddings.embedDocuments(chunks);

        // 4. Save chunks with embeddings to database
        for (let i = 0; i < chunks.length; i++) {
            await db.insert(documentChunks).values({
                documentId: doc.id,
                chunkIndex: i,
                content: chunks[i],
                embedding: chunkEmbeddings[i],
                metadata: null,
            });
        }

        console.log('✅ Document processing complete!');
        return doc;
    } catch (error) {
        console.error('❌ Error processing document:', error);
        throw error;
    }
}

// ============================================
// FUNCTION: Search Similar Chunks
// ============================================
export async function searchSimilarChunks(
    query: string,
    topK: number = 5
): Promise<Array<{ content: string; similarity: number }>> {
    try {
        // 1. Generate embedding for query
        const queryEmbedding = await embeddings.embedQuery(query);

        // 2. Format vector as string for PostgreSQL
        const vectorString = `[${queryEmbedding.join(',')}]`;

        // 3. Search using pgvector's cosine distance operator (<=>)
        const results = await db.execute(sql`
            SELECT
                content,
                1 - (embedding <=> ${vectorString}::vector) as similarity
            FROM document_chunks
            WHERE embedding IS NOT NULL
            ORDER BY embedding <=> ${vectorString}::vector
            LIMIT ${topK}
        `);

        // Return results
        return results.map((row: any) => ({
            content: row.content,
            similarity: parseFloat(row.similarity),
        }));
    } catch (error) {
        console.error('❌ Error searching chunks:', error);
        return [];
    }
}