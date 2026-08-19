export class StringScanner {
    /**
     * @param {string} input
     */
    constructor(input: string);
    get input(): string;
    get currentCharacter(): string;
    /**
     * @return {number}
     */
    get cursor(): number;
    /**
     * If cursor is at the end of the string
     */
    get done(): boolean;
    /**
     * Returns the next character, or '' if done without advancing the cursor.
     *
     * @param {number} [distance=1]
     * @return {string} 1 or multiple characters depending on distance.
     */
    peek(distance?: number | undefined): string;
    /**
     * Returns the next character[s], or '' if done. Advances the cursor.
     *
     * @param {number} [distance=1]
     * @return {string} characters or ''
     */
    pop(distance?: number | undefined): string;
    /**
     * Returns the string match for `regex` starting
     * from the current cursor. Advances cursor if a
     * match is found. Returns `undefined` otherwise.
     *
     * @param {RegExp} regex
     * @return {string|undefined}
     * @throws {Error} given regex global flag not set
     */
    scan(regex: RegExp): string | undefined;
    #private;
}
