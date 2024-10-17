export interface ReponseParsingInput {
    domain: string,
    response: string,
}

export interface ResponseParsingOutput {
    domain: string,
    reportURL: string,
    modelRating: string,
    modeldDWPInfo: Array<{
        patternName: string;
        patternContext : string;
    }>
    metaData: string;
}

