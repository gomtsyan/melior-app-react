// TODO: Remove the data source from this constants
export const dataTotalCrawledEndpoint = "/sharepoint/data/total_crawled";
export const dataTotalIndexableEndpoint = "/sharepoint/data/total_indexable";
export const dataItemsLocationEndpoint = "/sharepoint/data/items_location";
export const dataItemsTypeEndpoint = "/sharepoint/data/items_type";

export const indexTotalIndexedEndpoint = "/sharepoint/index/total_indexed";
export const indexWhyNotIndexedEndpoint = "/sharepoint/index/why_not_indexed";
export const indexItemsTypeCoverageEndpoint = "/sharepoint/index/items_type_coverage";
export const indexItemsLocationEndpoint = "/sharepoint/index/items_location";
export const indexItemsLanguageEndpoint = "/sharepoint/index/items_language";
export const feedbackTotalEndpoint = "/feedback/app/total";
export const feedbackTotalSearchEndpoint = "/feedback/search/total";
export const feedbackAverageEndpoint = "/feedback/app/average";
export const feedbackSearchAverageEndpoint = "/feedback/search/average";
export const feedbackProgressEndpoint = "/feedback/app/ratings_percentage";
export const feedbackProgressSearchEndpoint = "/feedback/search/ratings_percentage";
export const feedbackRatingEndpoint = "/feedback/app/avg_ratings_over_time";
export const feedbackVolumeOverTimeEndpoint = "/feedback/volume_feedback_over_time";
export const feedbackRatioOverTimeEndpoint = "/feedback/ratio_feedback_over_time";

export const APIBaseURI = typeof window !== 'undefined' && typeof window.ENV !== 'undefined' ? window.ENV.MELIOR_SERVER_URL : process.env.REACT_APP_API_BASE_URI;
