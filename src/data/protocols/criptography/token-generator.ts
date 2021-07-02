export interface TokenGenerator {
    async generate (id: string): Promise<string>
}
