/**
 * 🕉️ Pexels Type Definitions
 * "दृश्यं सर्वं जगत्" - "All the world is a sight"
 */

declare module 'pexels' {
  export interface PexelsVideo {
    id: number;
    width: number;
    height: number;
    duration: number;
    video_files: Array<{
      id: number;
      quality: string;
      file_type: string;
      width: number;
      height: number;
      link: string;
    }>;
    video_pictures: Array<{
      id: number;
      picture: string;
      nr: number;
    }>;
  }

  export interface PexelsVideosResponse {
    page: number;
    per_page: number;
    videos: PexelsVideo[];
    total_results: number;
    next_page?: string;
  }

  export interface PexelsClient {
    videos: {
      search(options: {
        query: string;
        per_page?: number;
        page?: number;
        orientation?: 'landscape' | 'portrait' | 'square';
        size?: 'large' | 'medium' | 'small';
        locale?: string;
        quality?: 'high' | 'medium' | 'low';
      }): Promise<PexelsVideosResponse>;
    };
  }

  export function createClient(apiKey: string): PexelsClient;
}
