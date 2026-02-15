import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Social Route',
        short_name: 'Social Route',
        description: 'Social Route | Premium Digital Marketing Agency',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon-192x192.png', // Replace with actual icon path
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png', // Replace with actual icon path
                sizes: '512x512',
                type: 'image/png',
            },
            // Add more icons as needed
        ],
    };
}
